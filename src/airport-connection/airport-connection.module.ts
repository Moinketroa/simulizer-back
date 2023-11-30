import { Module } from '@nestjs/common';
import { AirportConnectionService } from './airport-connection.service';
import { AirportConnectionPersistenceModule } from '../dao/airport-connection/airport-connection-persistence.module';
import { AirportConnectionFactory } from './airport-connection.factory';
import { AirportPersistenceModule } from '../dao/airport/airport-persistence.module';

@Module({
    imports: [AirportConnectionPersistenceModule, AirportPersistenceModule],
    providers: [AirportConnectionService, AirportConnectionFactory],
})
export class AirportConnectionModule {}
