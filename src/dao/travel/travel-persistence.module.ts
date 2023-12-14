import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelEntity } from './entity/travel.entity';
import { TravelStepEntity } from './entity/travel-step.entity';
import { TravelStepRepository } from './travel-step.repository';
import { TravelRepository } from './travel.repository';

@Module({
    imports: [TypeOrmModule.forFeature([TravelEntity, TravelStepEntity])],
    exports: [TravelRepository],
    providers: [TravelRepository, TravelStepRepository],
})
export class TravelPersistenceModule {}
