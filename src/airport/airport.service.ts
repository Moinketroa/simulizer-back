import { Injectable } from '@nestjs/common';
import { AirportRepository } from '../dao/airport/airport.repository';
import { PageOptionsDto } from '../util/dto/page-options.dto';
import { PageDto } from '../util/dto/page.dto';
import { AirportDto } from './dto/airport.dto';
import { PageMetaDto } from '../util/dto/page-meta.dto';
import { AirportMapper } from './mapper/airport.mapper';

@Injectable()
export class AirportService {
    constructor(
        private readonly _airportMapper: AirportMapper,
        private readonly _airportRepository: AirportRepository
    ) {}

    public async getAirports(
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<AirportDto>> {
        const queryBuilder = this._airportRepository.createQueryBuilder();

        queryBuilder.skip(pageOptionsDto.skip).take(pageOptionsDto.take);

        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return new PageDto(
            entities.map(entity => this._airportMapper.toDto(entity)),
            pageMetaDto
        );
    }
}
