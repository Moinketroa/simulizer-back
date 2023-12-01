import { AirportConnectionService } from './airport-connection.service';
import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { AirportConnectionRepository } from '../dao/airport-connection/airport-connection.repository';
import { AirportConnectionFactory } from './airport-connection.factory';
import { PageOptionsDto } from '../util/dto/page-options.dto';
import { Order } from '../util/enum/order.enum';
import { AirportConnectionDto } from './dto/airport-connection.dto';
import { AirportConnectionEntity } from '../dao/airport-connection/entity/airport-connection.entity';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { AirportConnectionMapper } from './mapper/airport-connection.mapper';
import { AirportEntity } from '../dao/airport/entity/airport.entity';

describe('AirportConnectionService', () => {
    let airportConnectionService: AirportConnectionService;
    let airportConnectionRepository: DeepMocked<AirportConnectionRepository>;
    let airportConnectionFactory: DeepMocked<AirportConnectionFactory>;
    let airportConnectionMapper: DeepMocked<AirportConnectionMapper>;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [AirportConnectionService],
        })
            .useMocker(createMock)
            .compile();

        airportConnectionService = app.get<AirportConnectionService>(
            AirportConnectionService
        );
        airportConnectionRepository = app.get(AirportConnectionRepository);
        airportConnectionFactory = app.get(AirportConnectionFactory);
        airportConnectionMapper = app.get(AirportConnectionMapper);
    });

    describe('root', () => {
        it('should exist', () => {
            expect(airportConnectionService).toBeTruthy();
        });

        describe('onModuleInit', () => {
            let repositorySaveSpy;
            let factoryPrimMinimalSpanningTreeSpy;

            beforeEach(() => {
                repositorySaveSpy = jest.spyOn(
                    airportConnectionRepository,
                    'save'
                );
                factoryPrimMinimalSpanningTreeSpy = jest.spyOn(
                    airportConnectionFactory,
                    'primMinimalSpanningTree'
                );
            });

            it('should not push to repository if the repository isnt empty', async () => {
                airportConnectionRepository.isEmpty.mockResolvedValue(false);

                await airportConnectionService.onModuleInit();

                expect(repositorySaveSpy).toBeCalledTimes(0);
                expect(factoryPrimMinimalSpanningTreeSpy).toBeCalledTimes(0);
            });

            it('should push to repository if the repository is empty', async () => {
                airportConnectionRepository.isEmpty.mockResolvedValue(true);

                await airportConnectionService.onModuleInit();

                expect(repositorySaveSpy).toBeCalledTimes(1);
                expect(factoryPrimMinimalSpanningTreeSpy).toBeCalledTimes(1);
            });
        });

        describe('getAirportConnections', () => {
            it('should create the page correctly', async () => {
                const pageOptionsDto = <PageOptionsDto>{
                    order: Order.ASC,
                    page: 1,
                    take: 1,
                };
                const firstAirportEntity = <Partial<AirportEntity>>{
                    id: 'ID1',
                };
                const secondAirportEntity = <Partial<AirportEntity>>{
                    id: 'ID2',
                };
                const airportConnection = <Partial<AirportConnectionEntity>>{
                    id: 'ID',
                    firstAirport: firstAirportEntity,
                    secondAirport: secondAirportEntity,
                    capacity: 20,
                    speed: 100,
                    frequency: 1,
                    loadingTime: 10,
                    unloadingTime: 15,
                };
                const airportConnectionDto = <AirportConnectionDto>{
                    id: 'ID',
                    airports: [{}, {}],
                    capacity: 20,
                    speed: 100,
                    frequency: 1,
                    loadingTime: 10,
                    unloadingTime: 15,
                };

                const partialQueryBuilder =
                    createMock<SelectQueryBuilder<AirportConnectionEntity>>();
                partialQueryBuilder.getCount.mockResolvedValue(1);
                partialQueryBuilder.getRawAndEntities.mockResolvedValue({
                    entities: [airportConnection] as AirportConnectionEntity[],
                    raw: [],
                });
                partialQueryBuilder.leftJoinAndSelect.mockReturnValue(
                    partialQueryBuilder
                );

                airportConnectionRepository.createQueryBuilder.mockReturnValue(
                    partialQueryBuilder
                );

                airportConnectionMapper.toDto.mockReturnValue(
                    airportConnectionDto
                );

                const getAirportConnectionsResult =
                    await airportConnectionService.getAirportConnections(
                        pageOptionsDto
                    );

                expect(airportConnectionMapper.toDto).toBeCalledTimes(1);
                expect(getAirportConnectionsResult.data).toEqual([
                    airportConnectionDto,
                ]);
            });
        });
    });
});
