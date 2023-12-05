import { Injectable } from '@nestjs/common';
import { AirportEntity } from '../dao/airport/entity/airport.entity';
import { TravelerEntity } from '../dao/traveler/entity/traveler.entity';
import { sampleSize } from 'lodash';
import * as chance from 'chance';

@Injectable()
export class TravelerFactory {
    private readonly CREATED_BY = 'COMPUTER';

    createRandomTraveler(airports: AirportEntity[]): TravelerEntity {
        const randomAirports = sampleSize(airports, 2);

        return <TravelerEntity>{
            departureAirport: randomAirports[0],
            destinationAirport: randomAirports[1],
            firstName: chance().first(),
            lastName: chance().last(),
            createdBy: this.CREATED_BY,
        };
    }
}
