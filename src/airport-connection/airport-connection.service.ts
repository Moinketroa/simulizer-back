import { Injectable, OnModuleInit } from '@nestjs/common';
import { AirportConnectionRepository } from '../dao/airport-connection/airport-connection.repository';
import { AirportConnectionFactory } from './airport-connection.factory';
import { AirportRepository } from '../dao/airport/airport.repository';

@Injectable()
export class AirportConnectionService implements OnModuleInit {
    constructor(
        private readonly airportConnectionFactory: AirportConnectionFactory,
        private readonly airportConnectionRepository: AirportConnectionRepository,
        private readonly airportRepository: AirportRepository
    ) {}

    async onModuleInit(): Promise<any> {
        await this.airportConnectionRepository
            .createQueryBuilder()
            .delete()
            .execute();

        const airportEntities = await this.airportRepository.find();

        const airportConnections =
            this.airportConnectionFactory.primMinimalSpanningTree(
                airportEntities
            );

        await this.airportConnectionRepository.save(airportConnections);
    }
}
