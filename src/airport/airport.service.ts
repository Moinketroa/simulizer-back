import { Injectable } from '@nestjs/common';
import { AirportRepository } from '../dao/airport/airport.repository';
import { PageOptionsDto } from '../util/dto/page-options.dto';
import { PageDto } from '../util/dto/page.dto';
import { AirportDto } from './dto/airport.dto';
import { AirportMapper } from './mapper/airport.mapper';
import { AirportEntity } from '../dao/airport/entity/airport.entity';
import { PaginatedService } from '../util/service/paginated.service';

@Injectable()
export class AirportService extends PaginatedService {
    constructor(
        private readonly _airportMapper: AirportMapper,
        private readonly _airportRepository: AirportRepository
    ) {
        super();
    }

    public async getAirports(
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<AirportDto>> {
        const queryBuilder = this._airportRepository.createQueryBuilder();

        return this.getPage(
            pageOptionsDto,
            queryBuilder,
            (airportEntity: AirportEntity) =>
                this._airportMapper.toDto(airportEntity)
        );
    }
}
