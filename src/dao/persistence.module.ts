import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirportEntity } from './airport/entity/airport.entity';
import * as process from 'process';
import { AirportConnectionEntity } from './airport-connection/entity/airport-connection.entity';
import { TravelerEntity } from './traveler/entity/traveler.entity';

const moduleEntities: any[] = [
    AirportEntity,
    AirportConnectionEntity,
    TravelerEntity,
];

@Module({})
export class PersistenceModule {
    static forRoot(): DynamicModule {
        return {
            module: PersistenceModule,
            imports: [PersistenceModule.registerTypeOrmModule()],
        };
    }

    static registerTypeOrmModule(): DynamicModule {
        const dbType = process.env.DB_TYPE || '';
        const dbHost = process.env.DB_HOST || '';
        const dbPort = Number(process.env.DB_PORT) || 0;
        const dbUsername = process.env.DB_USERNAME || '';
        const dbPassword = process.env.DB_PASSWORD || '';
        const dbDatabase = process.env.DB_DATABASE || '';
        const dbSchema = process.env.DB_SCHEMA || '';
        const dbSynchronize = process.env.DB_SYNCHRONIZE === 'true' || false;
        const dbRetryAttempts = Number(process.env.DB_RETRY_ATTEMPTS) || 0;
        const dbRetryDelay = Number(process.env.DB_RETRY_DELAY) || 0;
        const dbSslConnection =
            process.env.DB_SSL_CONNECTION === 'true' || false;

        return {
            module: PersistenceModule,
            imports: [
                TypeOrmModule.forRoot({
                    type: dbType as any,
                    host: dbHost,
                    port: dbPort,
                    username: dbUsername,
                    password: dbPassword,
                    database: dbDatabase,
                    schema: dbSchema,
                    entities: moduleEntities,
                    synchronize: dbSynchronize,
                    retryAttempts: dbRetryAttempts,
                    retryDelay: dbRetryDelay,
                    ssl: dbSslConnection,
                }),
            ],
            exports: [TypeOrmModule],
        };
    }
}
