import { Module } from '@nestjs/common';
import { PersistenceModule } from './dao/persistence.module';
import { AirportModule } from './airport/airport.module';
import { ConfigModule } from '@nestjs/config';
import { AirportConnectionModule } from './airport-connection/airport-connection.module';
import { TravelerModule } from './traveler/traveler.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `env/${process.env.NODE_ENV}.env`,
        }),
        PersistenceModule.forRoot(),

        AirportModule,
        AirportConnectionModule,
        TravelerModule,
    ],
})
export class AppModule {}
