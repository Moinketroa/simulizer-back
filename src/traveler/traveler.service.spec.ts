import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { TravelerService } from './traveler.service';
import { TravelerRepository } from '../dao/traveler/traveler.repository';
import { TravelerFactory } from './traveler.factory';

describe('TravelerService', () => {
    let travelerService: TravelerService;
    let travelerRepository: DeepMocked<TravelerRepository>;
    let travelerFactory: DeepMocked<TravelerFactory>;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [TravelerService],
        })
            .useMocker(createMock)
            .compile();

        travelerService = app.get<TravelerService>(TravelerService);
        travelerRepository = app.get(TravelerRepository);
        travelerFactory = app.get(TravelerFactory);
    });

    describe('root', () => {
        it('should exist', () => {
            expect(travelerService).toBeTruthy();
        });

        describe('onModuleInit', () => {
            let repositorySaveSpy;
            let factoryCreateRandomTravelerSpy;

            beforeEach(() => {
                repositorySaveSpy = jest.spyOn(travelerRepository, 'save');
                factoryCreateRandomTravelerSpy = jest.spyOn(
                    travelerFactory,
                    'createRandomTraveler'
                );
            });

            it('should not push to repository if the repository isnt empty', async () => {
                travelerRepository.isEmpty.mockResolvedValue(false);

                await travelerService.onModuleInit();

                expect(repositorySaveSpy).toBeCalledTimes(0);
                expect(factoryCreateRandomTravelerSpy).toBeCalledTimes(0);
            });

            it('should push to repository if the repository is empty', async () => {
                travelerRepository.isEmpty.mockResolvedValue(true);
                Object.defineProperty(
                    travelerService,
                    'DEFAULT_INITIAL_TRAVELERS',
                    { value: 5 }
                );

                await travelerService.onModuleInit();

                expect(repositorySaveSpy).toBeCalledTimes(1);
                expect(factoryCreateRandomTravelerSpy).toBeCalledTimes(5);
            });
        });
    });
});
