import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirportEntity } from './entity/airport.entity';
import { AirportRepository } from './airport.repository';

@Module({
    imports: [TypeOrmModule.forFeature([AirportEntity])],
    exports: [AirportRepository],
    providers: [AirportRepository],
})
export class AirportPersistenceModule {}
