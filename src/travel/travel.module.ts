import { Module } from '@nestjs/common';
import { TravelPersistenceModule } from '../dao/travel/travel-persistence.module';
import { TravelService } from './travel.service';
import { TravelFactory } from './travel.factory';
import { TravelerPersistenceModule } from '../dao/traveler/traveler-persistence.module';
import { AirportConnectionPersistenceModule } from '../dao/airport-connection/airport-connection-persistence.module';
import { TravelMapper } from './mapper/travel.mapper';

@Module({
    imports: [
        TravelPersistenceModule,
        TravelerPersistenceModule,
        AirportConnectionPersistenceModule,
    ],
    providers: [TravelService, TravelFactory, TravelMapper],
    exports: [TravelMapper],
})
export class TravelModule {}
