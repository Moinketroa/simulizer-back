import { Injectable, OnModuleInit } from '@nestjs/common';
import { AirportConnectionRepository } from '../dao/airport-connection/airport-connection.repository';
import { AirportConnectionFactory } from './airport-connection.factory';
import { AirportRepository } from '../dao/airport/airport.repository';
import { PageOptionsDto } from '../util/dto/page-options.dto';
import { PageDto } from '../util/dto/page.dto';
import { PageMetaDto } from '../util/dto/page-meta.dto';
import { AirportConnectionDto } from './dto/airport-connection.dto';
import { AirportConnectionMapper } from './mapper/airport-connection.mapper';

@Injectable()
export class AirportConnectionService implements OnModuleInit {
    constructor(
        private readonly _airportConnectionFactory: AirportConnectionFactory,
        private readonly _airportConnectionMapper: AirportConnectionMapper,
        private readonly _airportConnectionRepository: AirportConnectionRepository,
        private readonly _airportRepository: AirportRepository
    ) {}

    async onModuleInit(): Promise<any> {
        if (await this._airportConnectionRepository.isEmpty()) {
            const airportEntities = await this._airportRepository.find();

            const airportConnections =
                this._airportConnectionFactory.primMinimalSpanningTree(
                    airportEntities
                );

            await this._airportConnectionRepository.save(airportConnections);
        }
    }

    public async getAirportConnections(
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<AirportConnectionDto>> {
        const queryBuilder = this._airportConnectionRepository
            .createQueryBuilder('airportConnection')
            .leftJoinAndSelect('airportConnection.firstAirport', 'firstAirport')
            .leftJoinAndSelect(
                'airportConnection.secondAirport',
                'secondAirport'
            );

        queryBuilder.skip(pageOptionsDto.skip).take(pageOptionsDto.take);

        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return new PageDto(
            entities.map(entity => this._airportConnectionMapper.toDto(entity)),
            pageMetaDto
        );
    }
}
