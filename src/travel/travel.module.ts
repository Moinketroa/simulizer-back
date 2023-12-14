import { Module } from '@nestjs/common';
import { TravelPersistenceModule } from '../dao/travel/travel-persistence.module';
import { TravelService } from './travel.service';
import { TravelFactory } from './travel.factory';
import { TravelerPersistenceModule } from '../dao/traveler/traveler-persistence.module';
import { AirportConnectionPersistenceModule } from '../dao/airport-connection/airport-connection-persistence.module';

@Module({
    imports: [
        TravelPersistenceModule,
        TravelerPersistenceModule,
        AirportConnectionPersistenceModule,
    ],
    providers: [TravelService, TravelFactory],
})
export class TravelModule {}
