import { Module } from '@nestjs/common';
import { PersistenceModule } from './dao/persistence.module';
import { AirportModule } from './airport/airport.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PersistenceModule.forRoot(),
        AirportModule,
    ],
})
export class AppModule {}
