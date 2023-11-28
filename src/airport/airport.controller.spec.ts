import { Test, TestingModule } from '@nestjs/testing';
import { AirportController } from './airport.controller';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { AirportService } from './airport.service';
import { PageDto } from '../util/dto/page.dto';
import { AirportDto } from './dto/airport.dto';
import { PageOptionsDto } from '../util/dto/page-options.dto';
import { Order } from '../util/enum/order.enum';
import { PageMetaDto } from '../util/dto/page-meta.dto';

describe('AirportController', () => {
    let airportController: AirportController;
    let airportService: DeepMocked<AirportService>;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AirportController],
        })
            .useMocker(createMock)
            .compile();

        airportController = app.get<AirportController>(AirportController);
        airportService = app.get(AirportService);
    });

    describe('root', () => {
        it('should exist', () => {
            expect(airportController).toBeTruthy();
        });

        describe('GET Airports', () => {
            it('should correctly call the service', async () => {
                const airportDto = <AirportDto>{
                    idEnt: 'ID',
                    name: 'Name',
                    type: 'Type',
                    latitude: 420.69,
                    longitude: 1664.86,
                    municipality: 'Townville',
                    iataCode: 'COD',
                };
                const pageOptionDto = <PageOptionsDto>{
                    order: Order.ASC,
                    page: 1,
                    take: 1,
                };
                const pageDto = new PageDto<AirportDto>(
                    [airportDto],
                    new PageMetaDto({
                        pageOptionsDto: pageOptionDto,
                        itemCount: 1,
                    })
                );
                airportService.getAirports.mockResolvedValue(pageDto);

                const getAirportsResult =
                    await airportController.getAirports(pageOptionDto);

                expect(getAirportsResult.data).toEqual([airportDto]);
            });
        });
    });
});
