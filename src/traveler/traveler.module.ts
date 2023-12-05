import { Module } from '@nestjs/common';
import { TravelerController } from './traveler.controller';
import { TravelerService } from './traveler.service';
import { TravelerPersistenceModule } from '../dao/traveler/traveler-persistence.module';
import { AirportModule } from '../airport/airport.module';
import { TravelerMapper } from './mapper/traveler.mapper';
import { AirportPersistenceModule } from '../dao/airport/airport-persistence.module';
import { TravelerFactory } from './traveler.factory';

@Module({
    controllers: [TravelerController],
    providers: [TravelerService, TravelerMapper, TravelerFactory],
    imports: [
        TravelerPersistenceModule,
        AirportPersistenceModule,
        AirportModule,
    ],
})
export class TravelerModule {}
