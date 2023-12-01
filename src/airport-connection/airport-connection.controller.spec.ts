import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { PageDto } from '../util/dto/page.dto';
import { PageOptionsDto } from '../util/dto/page-options.dto';
import { Order } from '../util/enum/order.enum';
import { PageMetaDto } from '../util/dto/page-meta.dto';
import { AirportConnectionDto } from './dto/airport-connection.dto';
import { AirportConnectionService } from './airport-connection.service';
import { AirportConnectionController } from './airport-connection.controller';

describe('AirportConnectionController', () => {
    let airportConnectionController: AirportConnectionController;
    let airportConnectionService: DeepMocked<AirportConnectionService>;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AirportConnectionController],
        })
            .useMocker(createMock)
            .compile();

        airportConnectionController = app.get<AirportConnectionController>(
            AirportConnectionController
        );
        airportConnectionService = app.get(AirportConnectionService);
    });

    describe('root', () => {
        it('should exist', () => {
            expect(airportConnectionController).toBeTruthy();
        });

        describe('GET Airport Connections', () => {
            it('should correctly call the service', async () => {
                const airportConnectionDto = <AirportConnectionDto>{
                    id: 'ID',
                    airports: [{}, {}],
                    capacity: 20,
                    speed: 100,
                    frequency: 1,
                    loadingTime: 10,
                    unloadingTime: 15,
                };
                const pageOptionDto = <PageOptionsDto>{
                    order: Order.ASC,
                    page: 1,
                    take: 1,
                };
                const pageDto = new PageDto<AirportConnectionDto>(
                    [airportConnectionDto],
                    new PageMetaDto({
                        pageOptionsDto: pageOptionDto,
                        itemCount: 1,
                    })
                );
                airportConnectionService.getAirportConnections.mockResolvedValue(
                    pageDto
                );

                const getAirportsResult =
                    await airportConnectionController.getAirportConnections(
                        pageOptionDto
                    );

                expect(getAirportsResult.data).toEqual([airportConnectionDto]);
            });
        });
    });
});
