import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { PageDto } from '../util/dto/page.dto';
import { PageOptionsDto } from '../util/dto/page-options.dto';
import { Order } from '../util/enum/order.enum';
import { PageMetaDto } from '../util/dto/page-meta.dto';
import { TravelerController } from './traveler.controller';
import { TravelerDto } from './dto/traveler.dto';
import { TravelerService } from './traveler.service';

describe('TravelerController', () => {
    let travelerController: TravelerController;
    let travelerService: DeepMocked<TravelerService>;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [TravelerController],
        })
            .useMocker(createMock)
            .compile();

        travelerController = app.get<TravelerController>(TravelerController);
        travelerService = app.get(TravelerService);
    });

    describe('root', () => {
        it('should exist', () => {
            expect(travelerController).toBeTruthy();
        });

        describe('GET Travelers', () => {
            it('should correctly call the service', async () => {
                const travelerDto = <TravelerDto>{
                    id: 'ID',
                    firstName: 'John',
                    lastName: 'Doe',
                    createdBy: 'Computer',
                    departureAirport: { idEnt: 'ID1' },
                    destinationAirport: { idEnt: 'ID2' },
                };
                const pageOptionDto = <PageOptionsDto>{
                    order: Order.ASC,
                    page: 1,
                    take: 1,
                };
                const pageDto = new PageDto<TravelerDto>(
                    [travelerDto],
                    new PageMetaDto({
                        pageOptionsDto: pageOptionDto,
                        itemCount: 1,
                    })
                );
                travelerService.getTravelers.mockResolvedValue(pageDto);

                const getTravelerResult =
                    await travelerController.getTravelers(pageOptionDto);

                expect(getTravelerResult.data).toEqual([travelerDto]);
            });
        });
    });
});
