import { Injectable, OnModuleInit } from '@nestjs/common';
import { TravelRepository } from '../dao/travel/travel.repository';
import { TravelerRepository } from '../dao/traveler/traveler.repository';
import { TravelFactory } from './travel.factory';
import { PaginatedService } from '../util/service/paginated.service';
import { TravelDto } from './dto/travel.dto';
import { TravelMapper } from './mapper/travel.mapper';
import { TravelStepEntity } from '../dao/travel/entity/travel-step.entity';

@Injectable()
export class TravelService extends PaginatedService implements OnModuleInit {
    constructor(
        private readonly _travelRepository: TravelRepository,
        private readonly _travelerRepository: TravelerRepository,
        private readonly _travelFactory: TravelFactory,
        private readonly _travelMapper: TravelMapper
    ) {
        super();
    }

    async onModuleInit(): Promise<any> {
        if (await this._travelRepository.isEmpty()) {
            const travelersQueryBuilder = this._travelerRepository
                .createQueryBuilder('traveler')
                .leftJoinAndSelect(
                    'traveler.departureAirport',
                    'departureAirport'
                )
                .leftJoinAndSelect(
                    'traveler.destinationAirport',
                    'destinationAirport'
                );

            const travelersRawAndEntities =
                await travelersQueryBuilder.getRawAndEntities();
            const travelers = travelersRawAndEntities.entities;

            for (const traveler of travelers) {
                const travel = await this._travelFactory.createTravel(traveler);

                await this._travelRepository.save(travel);
            }
        }
    }

    public async getTravel(travelId: string): Promise<TravelDto> {
        const queryBuilder = this._travelRepository
            .createQueryBuilder('travel')
            .where('travel.id = :travelId', { travelId: travelId })
            .leftJoinAndMapMany(
                'travel.steps',
                TravelStepEntity,
                'travelStep',
                'travelStep.travel = travel.id'
            )
            .leftJoinAndSelect(
                'travelStep.airportConnection',
                'airportConnection'
            )
            .leftJoinAndSelect('airportConnection.firstAirport', 'firstAirport')
            .leftJoinAndSelect(
                'airportConnection.secondAirport',
                'secondAirport'
            );

        const travelEntity = await queryBuilder.getOne();

        return this._travelMapper.toDto(travelEntity);
    }
}
