import { createMock } from '@golevelup/ts-jest';
import { AirportService } from './airport.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AirportService', () => {
    let airportService: AirportService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [AirportService],
        })
            .useMocker(createMock)
            .compile();

        airportService = app.get<AirportService>(AirportService);
    });

    describe('root', () => {
        it('should exist', () => {
            expect(airportService).toBeTruthy();
        });
    });
});
