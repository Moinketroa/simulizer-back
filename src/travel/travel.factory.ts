import { Injectable } from '@nestjs/common';
import { TravelerEntity } from '../dao/traveler/entity/traveler.entity';
import { TravelEntity } from '../dao/travel/entity/travel.entity';
import { TravelStepEntity } from '../dao/travel/entity/travel-step.entity';
import { AirportConnectionRepository } from '../dao/airport-connection/airport-connection.repository';
import { AirportEntity } from '../dao/airport/entity/airport.entity';
import { getDistance } from 'geolib';
import { AirportConnectionEntity } from '../dao/airport-connection/entity/airport-connection.entity';
import { TravelStepDirection } from '../dao/travel/entity/travel-step-direction.enum';

class AStarNode {
    constructor(
        public airport: AirportEntity,
        public pathCost: number,
        public heuristic: number,
        public connectionUsed: AirportConnectionEntity | null = null,
        public parent: AStarNode | null = null
    ) {}

    get finalScore(): number {
        return this.heuristic + this.pathCost;
    }
}

class AStarPathSegment {
    constructor(
        public airport: AirportEntity,
        public connection: AirportConnectionEntity
    ) {}
}

@Injectable()
export class TravelFactory {
    constructor(
        private readonly _airportConnectionRepository: AirportConnectionRepository
    ) {}

    async createTravel(traveler: TravelerEntity): Promise<TravelEntity> {
        const departureAirport = traveler.departureAirport;
        const destinationAirport = traveler.destinationAirport;

        const path = await this.getAStarPath(
            departureAirport,
            destinationAirport
        );

        if (path.length === 0) {
            throw new Error('No path found');
        }

        return <TravelEntity>{
            traveler: traveler,
            steps: this.reconstructSteps(path),
        };
    }

    private async getAStarPath(
        departureAirport: AirportEntity,
        destinationAirport: AirportEntity
    ): Promise<AStarPathSegment[]> {
        const airportsToVisit: AStarNode[] = [
            new AStarNode(
                departureAirport,
                0,
                this.calculateHeuristic(departureAirport, destinationAirport)
            ),
        ];
        const airportsVisited: AStarNode[] = [];

        return this.findLowestScorePath(
            airportsToVisit,
            airportsVisited,
            destinationAirport
        );
    }

    private async findLowestScorePath(
        airportsToVisit: AStarNode[],
        airportsVisited: AStarNode[],
        destinationAirport: AirportEntity
    ) {
        while (airportsToVisit.length > 0) {
            const currentAirportNode =
                this.findLowestScoreNode(airportsToVisit);

            if (currentAirportNode.airport.id === destinationAirport.id) {
                return this.reconstructPath(currentAirportNode);
            }

            this.markAirportAsVisited(
                airportsToVisit,
                airportsVisited,
                currentAirportNode
            );

            const currentAirportConnections =
                await this._airportConnectionRepository.getAirportConnections(
                    currentAirportNode.airport.id
                );

            for (const currentAirportConnection of currentAirportConnections) {
                this.evaluateNeighbor(
                    airportsToVisit,
                    airportsVisited,
                    destinationAirport,
                    currentAirportConnection,
                    currentAirportNode
                );
            }
        }

        return [];
    }

    private evaluateNeighbor(
        airportsToVisit: AStarNode[],
        airportsVisited: AStarNode[],
        destinationAirport: AirportEntity,
        currentAirportConnection: AirportConnectionEntity,
        currentAirportNode: AStarNode
    ) {
        const nextAirport = this.getNextAirport(
            currentAirportConnection,
            currentAirportNode.airport
        );

        if (this.isAirportAlreadyVisited(airportsVisited, nextAirport)) {
            return;
        }

        const nextPathCost =
            currentAirportNode.pathCost +
            this.calculateCost(currentAirportConnection);
        const nextHeuristic = this.calculateHeuristic(
            nextAirport,
            destinationAirport
        );
        const nextAirportNode = new AStarNode(
            nextAirport,
            nextPathCost,
            nextHeuristic,
            currentAirportConnection,
            currentAirportNode
        );

        if (
            this.isNextAirportWorthVisiting(
                airportsToVisit,
                nextAirportNode,
                currentAirportNode
            )
        ) {
            airportsToVisit.push(nextAirportNode);
        }
    }

    private calculateHeuristic(
        source: AirportEntity,
        destination: AirportEntity
    ): number {
        return getDistance(source, destination);
    }

    private calculateCost(connection: AirportConnectionEntity): number {
        return (
            (connection.loadingTime +
                connection.unloadingTime +
                getDistance(connection.firstAirport, connection.secondAirport) /
                    connection.speed) /
            connection.frequency
        );
    }

    private getNextAirport(
        connection: AirportConnectionEntity,
        sourceAirport: AirportEntity
    ): AirportEntity {
        return connection.firstAirport.id === sourceAirport.id
            ? connection.secondAirport
            : connection.firstAirport;
    }

    private findLowestScoreNode(airportsToVisit: AStarNode[]): AStarNode {
        return airportsToVisit.reduce(
            (minNode, node) =>
                node.finalScore < minNode.finalScore ? node : minNode,
            airportsToVisit[0]
        );
    }

    private markAirportAsVisited(
        airportsToVisit: AStarNode[],
        airportsVisited: AStarNode[],
        currentNode: AStarNode
    ): void {
        airportsToVisit.splice(airportsToVisit.indexOf(currentNode), 1);
        airportsVisited.push(currentNode);
    }

    private isAirportAlreadyVisited(
        airportsVisited: AStarNode[],
        airport: AirportEntity
    ): boolean {
        return airportsVisited.some(
            airportVisited => airportVisited.airport.id === airport.id
        );
    }

    private isNextAirportWorthVisiting(
        airportsToVisit: AStarNode[],
        nextAirportNode: AStarNode,
        currentAirportNode: AStarNode
    ) {
        return (
            this.isNextAirportNotMarkedToVisit(
                airportsToVisit,
                nextAirportNode
            ) ||
            this.isNextAirportNodeCheaperThanCurrent(
                nextAirportNode,
                currentAirportNode
            )
        );
    }

    private isNextAirportNotMarkedToVisit(
        airportsToVisit: AStarNode[],
        nextAirportNode: AStarNode
    ) {
        return !airportsToVisit.some(
            node => node.airport.id === nextAirportNode.airport.id
        );
    }

    private isNextAirportNodeCheaperThanCurrent(
        nextAirportNode: AStarNode,
        currentAirportNode: AStarNode
    ) {
        return nextAirportNode.pathCost < currentAirportNode.pathCost;
    }

    private reconstructPath(node: AStarNode): AStarPathSegment[] {
        const path: AStarPathSegment[] = [
            new AStarPathSegment(node.airport, node.connectionUsed),
        ];

        while (node.parent !== null) {
            node = node.parent;
            path.unshift(
                new AStarPathSegment(node.airport, node.connectionUsed)
            );
        }

        return path;
    }

    private reconstructSteps(path: AStarPathSegment[]) {
        return path
            .filter(pathSegment => !!pathSegment.connection)
            .map((pathSegment, index) => {
                const nextAirport = pathSegment.airport;
                const connection = pathSegment.connection;
                const direction =
                    nextAirport.id === connection.firstAirport.id
                        ? TravelStepDirection.FROM_SECOND_TO_FIRST
                        : TravelStepDirection.FROM_FIRST_TO_SECOND;

                return <TravelStepEntity>{
                    airportConnection: connection,
                    direction: direction,
                    stepOrder: index,
                };
            });
    }
}
