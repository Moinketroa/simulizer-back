import { Injectable, OnModuleInit } from '@nestjs/common';
import { TravelerRepository } from '../dao/traveler/traveler.repository';
import { TravelerMapper } from './mapper/traveler.mapper';
import { PageOptionsDto } from '../util/dto/page-options.dto';
import { PageDto } from '../util/dto/page.dto';
import { TravelerDto } from './dto/traveler.dto';
import { PaginatedService } from '../util/service/paginated.service';
import { AirportRepository } from '../dao/airport/airport.repository';
import { TravelerEntity } from '../dao/traveler/entity/traveler.entity';
import { TravelerFactory } from './traveler.factory';

@Injectable()
export class TravelerService extends PaginatedService implements OnModuleInit {
    private readonly DEFAULT_INITIAL_TRAVELERS: number = 250;

    constructor(
        private readonly _airportRepository: AirportRepository,
        private readonly _travelerRepository: TravelerRepository,
        private readonly _travelerMapper: TravelerMapper,
        private readonly _travelerFactory: TravelerFactory
    ) {
        super();
    }

    async onModuleInit(): Promise<any> {
        if (await this._travelerRepository.isEmpty()) {
            const airportEntities = await this._airportRepository.find();

            const randomlyGeneratedTravelers: TravelerEntity[] = [];

            for (let i = 0; i < this.DEFAULT_INITIAL_TRAVELERS; i++) {
                randomlyGeneratedTravelers.push(
                    this._travelerFactory.createRandomTraveler(airportEntities)
                );
            }

            await this._travelerRepository.save(randomlyGeneratedTravelers);
        }
    }

    public async getTravelers(
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<TravelerDto>> {
        const queryBuilder = this._travelerRepository
            .createQueryBuilder('traveler')
            .leftJoinAndSelect('traveler.travel', 'travel')
            .leftJoinAndSelect('traveler.departureAirport', 'departureAirport')
            .leftJoinAndSelect(
                'traveler.destinationAirport',
                'destinationAirport'
            );

        return this.getPage(
            pageOptionsDto,
            queryBuilder,
            (travelerEntity: TravelerEntity) =>
                this._travelerMapper.toDto(travelerEntity)
        );
    }
}
