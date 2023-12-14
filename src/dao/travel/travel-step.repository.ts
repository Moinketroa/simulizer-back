import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TravelStepEntity } from './entity/travel-step.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TravelStepRepository extends Repository<TravelStepEntity> {
    constructor(
        @InjectRepository(TravelStepEntity)
        repository: Repository<TravelStepEntity>
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }
}
