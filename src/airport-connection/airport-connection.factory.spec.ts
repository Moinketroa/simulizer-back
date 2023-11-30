import { AirportConnectionFactory } from './airport-connection.factory';
import { Test, TestingModule } from '@nestjs/testing';
import { AirportEntity } from '../dao/airport/entity/airport.entity';
import { AirportConnectionEntity } from '../dao/airport-connection/entity/airport-connection.entity';
import { DeepPartial } from 'typeorm';

describe('AirportConnectionFactory', () => {
    let airportConnectionFactory: AirportConnectionFactory;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [AirportConnectionFactory],
        }).compile();

        airportConnectionFactory = app.get<AirportConnectionFactory>(
            AirportConnectionFactory
        );
    });

    describe('root', () => {
        it('should exist', () => {
            expect(airportConnectionFactory).toBeTruthy();
        });

        describe('initGraph', () => {
            it('should init structs with the first airport', () => {
                // GIVEN
                const airports: Partial<AirportEntity>[] = [
                    { id: 'A' },
                    { id: 'B' },
                    { id: 'C' },
                ];
                const visited: Set<string> = new Set();
                const toVisit: Partial<AirportEntity>[] = [...airports];

                // WHEN
                airportConnectionFactory['initGraph'](
                    airports as AirportEntity[],
                    toVisit as AirportEntity[],
                    visited
                );

                // THEN
                expect(visited.size).toEqual(1);
                expect(visited.has('A')).toBe(true);

                expect(toVisit.length).toEqual(2);
                expect(toVisit.find(e => e.id === 'A')).toBeFalsy();
                expect(toVisit.find(e => e.id === 'B')).toBeTruthy();
                expect(toVisit.find(e => e.id === 'C')).toBeTruthy();
            });
        });

        describe('addMinimalEdge', () => {
            let visited: Set<string>;
            let toVisit: Partial<AirportEntity>[];
            let edges: AirportConnectionEntity[];

            beforeEach(() => {
                visited = new Set();
                visited.add('A');

                toVisit = [{ id: 'B' }, { id: 'C' }];

                edges = [];
            });

            it('should add correctly the minimal edge', () => {
                // GIVEN
                const minimalEdge: DeepPartial<AirportConnectionEntity> = {
                    firstAirport: { id: 'A' },
                    secondAirport: { id: 'B' },
                };

                // WHEN
                airportConnectionFactory['addMinimalEdge'](
                    visited,
                    toVisit as AirportEntity[],
                    edges,
                    minimalEdge as AirportConnectionEntity
                );

                // THEN
                expect(visited.size).toEqual(2);
                expect(visited.has('A')).toBe(true);
                expect(visited.has('B')).toBe(true);

                expect(toVisit.length).toEqual(1);
                expect(toVisit.find(e => e.id === 'A')).toBeFalsy();
                expect(toVisit.find(e => e.id === 'B')).toBeFalsy();
                expect(toVisit.find(e => e.id === 'C')).toBeTruthy();

                expect(edges.length).toEqual(1);
                expect(
                    edges.includes(minimalEdge as AirportConnectionEntity)
                ).toBe(true);
            });

            it('should not add anything if the edge is null', () => {
                // GIVEN
                const minimalEdge = null;

                // WHEN
                airportConnectionFactory['addMinimalEdge'](
                    visited,
                    toVisit as AirportEntity[],
                    edges,
                    minimalEdge
                );

                // THEN
                expect(visited.size).toEqual(1);
                expect(visited.has('A')).toBe(true);

                expect(toVisit.length).toEqual(2);
                expect(toVisit.find(e => e.id === 'A')).toBeFalsy();
                expect(toVisit.find(e => e.id === 'B')).toBeTruthy();
                expect(toVisit.find(e => e.id === 'C')).toBeTruthy();

                expect(edges.length).toEqual(0);
            });
        });

        describe('primMinimalSpanningTree', () => {
            // The expected graph should resemble this one :
            //
            //    --------( B )
            //   /
            // ( A )------( C )
            //   \
            //    --------( D )
            it('should correctly create a MST', () => {
                // GIVEN
                const airports: Partial<AirportEntity>[] = [
                    { id: 'A' },
                    { id: 'B' },
                    { id: 'C' },
                    { id: 'D' },
                ];

                jest.spyOn(
                    airportConnectionFactory as any,
                    'calculateDistance'
                ).mockImplementation(simpleCaseGraph);

                // WHEN
                const connections =
                    airportConnectionFactory.primMinimalSpanningTree(
                        airports as AirportEntity[]
                    );

                // THEN
                expect(connections.length).toBe(3);
                expect(connections[0].firstAirport.id).toBe('A');
                expect(connections[0].secondAirport.id).toBe('B');
                expect(connections[1].firstAirport.id).toBe('A');
                expect(connections[1].secondAirport.id).toBe('C');
                expect(connections[2].firstAirport.id).toBe('A');
                expect(connections[2].secondAirport.id).toBe('D');
            });

            // The expected graph should resemble this one :
            //
            //    --------( B )      ---( E )
            //   /                  /
            // ( A )------( C )---------( F )
            //   \
            //    --------( D )---------( G )
            it('should correctly create a complex MST', () => {
                // GIVEN
                const airports: Partial<AirportEntity>[] = [
                    { id: 'A' },
                    { id: 'B' },
                    { id: 'C' },
                    { id: 'D' },
                    { id: 'E' },
                    { id: 'F' },
                    { id: 'G' },
                ];

                jest.spyOn(
                    airportConnectionFactory as any,
                    'calculateDistance'
                ).mockImplementation(complexCaseGraph);

                // WHEN
                const connections =
                    airportConnectionFactory.primMinimalSpanningTree(
                        airports as AirportEntity[]
                    );

                // THEN
                expect(connections.length).toBe(6);
                expect(connections[0].firstAirport.id).toBe('A');
                expect(connections[0].secondAirport.id).toBe('B');
                expect(connections[1].firstAirport.id).toBe('A');
                expect(connections[1].secondAirport.id).toBe('C');
                expect(connections[2].firstAirport.id).toBe('A');
                expect(connections[2].secondAirport.id).toBe('D');
                expect(connections[3].firstAirport.id).toBe('C');
                expect(connections[3].secondAirport.id).toBe('E');
                expect(connections[4].firstAirport.id).toBe('C');
                expect(connections[4].secondAirport.id).toBe('F');
                expect(connections[5].firstAirport.id).toBe('D');
                expect(connections[5].secondAirport.id).toBe('G');
            });
        });
    });

    function simpleCaseGraph(
        firstAirport: AirportEntity,
        secondAirport: AirportEntity
    ): number {
        if (firstAirport.id === 'A' || secondAirport.id === 'A') {
            return 1;
        } else {
            return 100;
        }
    }

    function complexCaseGraph(
        firstAirport: AirportEntity,
        secondAirport: AirportEntity
    ): number {
        const rootNode = 'A';
        const rootClosestNeighbors = ['B', 'C', 'D'];

        const secondRootNode = 'C';
        const secondRootClosestNeighbors = ['E', 'F'];

        const thirdRootNode = 'D';
        const thirdRootClosestNeighbors = ['G'];

        if (
            isConnectionBetween(
                firstAirport,
                secondAirport,
                rootNode,
                rootClosestNeighbors
            )
        ) {
            return 1;
        } else if (
            isConnectionBetween(
                firstAirport,
                secondAirport,
                secondRootNode,
                secondRootClosestNeighbors
            )
        ) {
            return 2;
        } else if (
            isConnectionBetween(
                firstAirport,
                secondAirport,
                thirdRootNode,
                thirdRootClosestNeighbors
            )
        ) {
            return 3;
        } else {
            return 100;
        }
    }

    function isConnectionBetween(
        firstAirport: AirportEntity,
        secondAirport: AirportEntity,
        node: string,
        expectedNodes: string[]
    ): boolean {
        return (
            (firstAirport.id === node || secondAirport.id === node) &&
            (expectedNodes.includes(firstAirport.id) ||
                expectedNodes.includes(secondAirport.id))
        );
    }
});
