import { AirportConnectionService } from './airport-connection.service';
import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { AirportConnectionRepository } from '../dao/airport-connection/airport-connection.repository';
import { AirportConnectionFactory } from './airport-connection.factory';

describe('AirportConnectionService', () => {
    let airportConnectionService: AirportConnectionService;
    let airportConnectionRepository: DeepMocked<AirportConnectionRepository>;
    let airportConnectionFactory: DeepMocked<AirportConnectionFactory>;

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
    });
});
