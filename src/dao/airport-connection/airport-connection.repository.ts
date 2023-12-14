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

    async getAirportConnections(
        airportId: string
    ): Promise<AirportConnectionEntity[]> {
        const departureConnectionsQB = this.createQueryBuilder(
            'airportConnection'
        )
            .where('airportConnection.firstAirport.id = :firstAirportId', {
                firstAirportId: airportId,
            })
            .orWhere('airportConnection.secondAirport.id = :secondAirportId', {
                secondAirportId: airportId,
            })
            .leftJoinAndSelect('airportConnection.firstAirport', 'firstAirport')
            .leftJoinAndSelect(
                'airportConnection.secondAirport',
                'secondAirport'
            );

        const { entities } = await departureConnectionsQB.getRawAndEntities();

        return entities;
    }
}
