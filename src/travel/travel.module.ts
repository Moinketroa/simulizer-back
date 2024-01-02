import { Module } from '@nestjs/common';
import { TravelPersistenceModule } from '../dao/travel/travel-persistence.module';
import { TravelService } from './travel.service';
import { TravelFactory } from './travel.factory';
import { TravelerPersistenceModule } from '../dao/traveler/traveler-persistence.module';
import { AirportConnectionPersistenceModule } from '../dao/airport-connection/airport-connection-persistence.module';
import { TravelMapper } from './mapper/travel.mapper';
import { TravelController } from './travel.controller';
import { TravelStepMapper } from './mapper/travel-step.mapper';
import { AirportConnectionModule } from '../airport-connection/airport-connection.module';
import { AirportModule } from '../airport/airport.module';

@Module({
    imports: [
        TravelPersistenceModule,
        TravelerPersistenceModule,
        AirportConnectionModule,
        AirportModule,
        AirportConnectionPersistenceModule,
    ],
    controllers: [TravelController],
    providers: [TravelService, TravelFactory, TravelMapper, TravelStepMapper],
    exports: [TravelMapper],
})
export class TravelModule {}
