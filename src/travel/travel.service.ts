import { Injectable, OnModuleInit } from '@nestjs/common';
import { TravelRepository } from '../dao/travel/travel.repository';
import { TravelerRepository } from '../dao/traveler/traveler.repository';
import { TravelFactory } from './travel.factory';

@Injectable()
export class TravelService implements OnModuleInit {
    constructor(
        private readonly _travelRepository: TravelRepository,
        private readonly _travelerRepository: TravelerRepository,
        private readonly _travelFactory: TravelFactory
    ) {}

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
}
