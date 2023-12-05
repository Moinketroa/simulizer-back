import { TravelerFactory } from './traveler.factory';
import { Test, TestingModule } from '@nestjs/testing';
import { AirportEntity } from '../dao/airport/entity/airport.entity';
import * as lodash from 'lodash';

jest.mock('lodash');

describe('TravelerFactory', () => {
    let travelerFactory: TravelerFactory;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [TravelerFactory],
        }).compile();

        travelerFactory = app.get<TravelerFactory>(TravelerFactory);
    });

    describe('root', () => {
        it('should exist', () => {
            expect(travelerFactory).toBeTruthy();
        });

        describe('createRandomTraveler', () => {
            it('should create a random Traveler', () => {
                const airports: Partial<AirportEntity>[] = [
                    { id: 'ID1' },
                    { id: 'ID2' },
                    { id: 'ID3' },
                ];

                (lodash.sampleSize as jest.Mock).mockReturnValue([
                    { id: 'ID3' },
                    { id: 'ID1' },
                ]);

                const randomTraveler = travelerFactory.createRandomTraveler(
                    airports as AirportEntity[]
                );

                expect(randomTraveler.id).toBeFalsy();
                expect(randomTraveler.departureAirport.id).toEqual('ID3');
                expect(randomTraveler.destinationAirport.id).toEqual('ID1');
                expect(randomTraveler.firstName).toBeTruthy();
                expect(randomTraveler.lastName).toBeTruthy();
                expect(randomTraveler.createdBy).toEqual(
                    travelerFactory['CREATED_BY']
                );

                (lodash.sampleSize as jest.Mock).mockRestore();
            });
        });
    });
});
