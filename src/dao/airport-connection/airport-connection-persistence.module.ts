import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirportConnectionEntity } from './entity/airport-connection.entity';
import { AirportConnectionRepository } from './airport-connection.repository';

@Module({
    imports: [TypeOrmModule.forFeature([AirportConnectionEntity])],
    exports: [AirportConnectionRepository],
    providers: [AirportConnectionRepository],
})
export class AirportConnectionPersistenceModule {}
