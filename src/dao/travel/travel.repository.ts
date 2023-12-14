import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TravelEntity } from './entity/travel.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TravelRepository extends Repository<TravelEntity> {
    constructor(
        @InjectRepository(TravelEntity) repository: Repository<TravelEntity>
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async isEmpty(): Promise<boolean> {
        const count = await this.count();
        return count === 0;
    }
}
