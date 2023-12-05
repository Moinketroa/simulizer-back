import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TravelerEntity } from './entity/traveler.entity';

@Injectable()
export class TravelerRepository extends Repository<TravelerEntity> {
    constructor(
        @InjectRepository(TravelerEntity)
        repository: Repository<TravelerEntity>
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async isEmpty(): Promise<boolean> {
        const count = await this.count();
        return count === 0;
    }
}
