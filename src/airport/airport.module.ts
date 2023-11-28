import { Module } from '@nestjs/common';
import { AirportController } from './airport.controller';
import { AirportService } from './airport.service';
import { AirportPersistenceModule } from '../dao/airport/airport-persistence.module';
import { AirportMapper } from './mapper/airport.mapper';

@Module({
    controllers: [AirportController],
    providers: [AirportMapper, AirportService],
    imports: [AirportPersistenceModule],
})
export class AirportModule {}
