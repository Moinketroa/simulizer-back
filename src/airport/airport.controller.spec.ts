import { Test, TestingModule } from '@nestjs/testing';
import { AirportController } from './airport.controller';
import { AirportService } from './airport.service';

describe('AppController', () => {
    let airportController: AirportController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AirportController],
            providers: [
                {
                    provide: AirportService,
                    useValue: {},
                },
            ],
        }).compile();

        airportController = app.get<AirportController>(AirportController);
    });

    describe('root', () => {
        it('should exist', () => {
            expect(airportController).toBeTruthy();
        });
    });
});
