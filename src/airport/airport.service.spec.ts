import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { AirportService } from './airport.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AirportRepository } from '../dao/airport/airport.repository';
import { PageOptionsDto } from '../util/dto/page-options.dto';
import { Order } from '../util/enum/order.enum';
import { AirportDto } from './dto/airport.dto';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { AirportEntity } from '../dao/airport/entity/airport.entity';
import { AirportMapper } from './mapper/airport.mapper';

describe('AirportService', () => {
    let airportService: AirportService;
    let airportRepository: DeepMocked<AirportRepository>;
    let airportMapper: DeepMocked<AirportMapper>;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [AirportService],
        })
            .useMocker(createMock)
            .compile();

        airportService = app.get<AirportService>(AirportService);
        airportRepository = app.get(AirportRepository);
        airportMapper = app.get(AirportMapper);
    });

    describe('root', () => {
        it('should exist', () => {
            expect(airportService).toBeTruthy();
        });

        describe('getAirports', () => {
            it('should create the page correctly', async () => {
                const pageOptionsDto = <PageOptionsDto>{
                    order: Order.ASC,
                    page: 1,
                    take: 1,
                };
                const airportEntity = <AirportEntity>{
                    id: 'ID',
                    name: 'Name',
                    type: 'Type',
                    latitude: 420.69,
                    longitude: 1664.86,
                    municipality: 'Townville',
                    iataCode: 'COD',
                };
                const airportDto = <AirportDto>{
                    idEnt: 'ID',
                    name: 'Name',
                    type: 'Type',
                    latitude: 420.69,
                    longitude: 1664.86,
                    municipality: 'Townville',
                    iataCode: 'COD',
                };

                const partialQueryBuilder =
                    createMock<SelectQueryBuilder<AirportEntity>>();
                partialQueryBuilder.getCount.mockResolvedValue(1);
                partialQueryBuilder.getRawAndEntities.mockResolvedValue({
                    entities: [airportEntity],
                    raw: [],
                });

                airportRepository.createQueryBuilder.mockReturnValue(
                    partialQueryBuilder
                );

                airportMapper.toDto.mockReturnValue(airportDto);

                const getAirportsResult =
                    await airportService.getAirports(pageOptionsDto);

                expect(airportMapper.toDto).toBeCalledTimes(1);
                expect(airportMapper.toDto).toBeCalledWith(airportEntity);
                expect(getAirportsResult.data).toEqual([airportDto]);
            });

            it('should create empty page correctly', async () => {
                const pageOptionsDto = <PageOptionsDto>{
                    order: Order.ASC,
                    page: 1,
                    take: 1,
                };

                const partialQueryBuilder =
                    createMock<SelectQueryBuilder<AirportEntity>>();
                partialQueryBuilder.getCount.mockResolvedValue(0);
                partialQueryBuilder.getRawAndEntities.mockResolvedValue({
                    entities: [],
                    raw: [],
                });

                airportRepository.createQueryBuilder.mockReturnValue(
                    partialQueryBuilder
                );

                const getAirportsResult =
                    await airportService.getAirports(pageOptionsDto);

                expect(airportMapper.toDto).toBeCalledTimes(0);
                expect(getAirportsResult.data).toEqual([]);
            });
        });
    });
});
