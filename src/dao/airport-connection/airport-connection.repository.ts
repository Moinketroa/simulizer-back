import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AirportConnectionEntity } from './entity/airport-connection.entity';

@Injectable()
export class AirportConnectionRepository extends Repository<AirportConnectionEntity> {
    constructor(
        @InjectRepository(AirportConnectionEntity)
        repository: Repository<AirportConnectionEntity>
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async isEmpty(): Promise<boolean> {
        const count = await this.count();
        return count === 0;
    }
}
