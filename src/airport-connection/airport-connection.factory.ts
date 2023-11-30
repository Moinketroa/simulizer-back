import { Injectable } from '@nestjs/common';
import { AirportConnectionEntity } from '../dao/airport-connection/entity/airport-connection.entity';
import { pull, pullAllBy, random } from 'lodash';
import { AirportEntity } from '../dao/airport/entity/airport.entity';
import { getDistance } from 'geolib';

@Injectable()
export class AirportConnectionFactory {
    primMinimalSpanningTree(
        airports: AirportEntity[]
    ): AirportConnectionEntity[] {
        const visited: Set<string> = new Set();
        const toVisit: AirportEntity[] = [...airports];
        const edges: AirportConnectionEntity[] = [];

        this.initGraph(airports, toVisit, visited);

        // While all the airports aren't visited, search a new minimal edge
        while (visited.size < airports.length) {
            let minDistance = Number.MAX_VALUE;
            let minimalEdge: AirportConnectionEntity | null = null;

            // Search a new connection between a visited airport and an airport to visit
            // We do not search a new connection between two already visited airports as it will create a circular graph
            for (const visitedNode of visited) {
                for (const adjacentNode of toVisit) {
                    const distance = this.calculateDistance(
                        this.getAirportById(airports, visitedNode),
                        adjacentNode
                    );

                    if (distance < minDistance) {
                        minDistance = distance;
                        minimalEdge = this.createRandomConnection(
                            this.getAirportById(airports, visitedNode),
                            adjacentNode
                        );
                    }
                }
            }

            this.addMinimalEdge(visited, toVisit, edges, minimalEdge);
        }

        return edges;
    }

    private initGraph(
        airports: AirportEntity[],
        toVisit: AirportEntity[],
        visited: Set<string>
    ): void {
        const startAirport = airports[0];
        const startNodeId = startAirport.id;
        visited.add(startNodeId);
        pull(toVisit, startAirport);
    }

    private addMinimalEdge(
        visited: Set<string>,
        toVisit: AirportEntity[],
        edges: AirportConnectionEntity[],
        minimalEdge?: AirportConnectionEntity
    ) {
        if (!!minimalEdge) {
            visited.add(minimalEdge.secondAirport.id);
            pullAllBy(toVisit, [minimalEdge.secondAirport], 'id');
            edges.push(minimalEdge);
        }
    }

    private getAirportById(
        airports: AirportEntity[],
        id: string
    ): AirportEntity {
        return airports.find(airport => airport.id === id)!;
    }

    private calculateDistance(
        source: AirportEntity,
        destination: AirportEntity
    ): number {
        return getDistance(source, destination);
    }

    private createRandomConnection(
        firstAirport: AirportEntity,
        secondAirport: AirportEntity
    ): AirportConnectionEntity {
        return <AirportConnectionEntity>{
            firstAirport: firstAirport,
            secondAirport: secondAirport,
            capacity: random(10, 25, false),
            speed: random(70, 100, true),
            frequency: random(1, 2, true),
            loadingTime: random(1000, 5000, false),
            unloadingTime: random(1000, 5000, false),
        };
    }
}
