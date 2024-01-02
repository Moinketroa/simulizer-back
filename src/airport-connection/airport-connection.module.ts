import { Module } from '@nestjs/common';
import { AirportConnectionService } from './airport-connection.service';
import { AirportConnectionPersistenceModule } from '../dao/airport-connection/airport-connection-persistence.module';
import { AirportConnectionFactory } from './airport-connection.factory';
import { AirportPersistenceModule } from '../dao/airport/airport-persistence.module';
import { AirportConnectionMapper } from './mapper/airport-connection.mapper';
import { AirportConnectionController } from './airport-connection.controller';
import { AirportModule } from '../airport/airport.module';

@Module({
    imports: [
        AirportModule,
        AirportConnectionPersistenceModule,
        AirportPersistenceModule,
    ],
    providers: [
        AirportConnectionService,
        AirportConnectionFactory,
        AirportConnectionMapper,
    ],
    controllers: [AirportConnectionController],
    exports: [AirportConnectionMapper],
})
export class AirportConnectionModule {}
