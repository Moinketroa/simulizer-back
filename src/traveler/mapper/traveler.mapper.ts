import { Injectable } from '@nestjs/common';
import { TravelerEntity } from '../../dao/traveler/entity/traveler.entity';
import { TravelerDto } from '../dto/traveler.dto';
import { AirportMapper } from '../../airport/mapper/airport.mapper';

@Injectable()
export class TravelerMapper {
    constructor(private readonly _airportMapper: AirportMapper) {}

    toDto(travelerEntity: TravelerEntity): TravelerDto {
        return <TravelerDto>{
            id: travelerEntity.id,
            departureAirport: this._airportMapper.toDto(
                travelerEntity.departureAirport
            ),
            destinationAirport: this._airportMapper.toDto(
                travelerEntity.destinationAirport
            ),
            firstName: travelerEntity.firstName,
            lastName: travelerEntity.lastName,
            createdBy: travelerEntity.createdBy,
        };
    }
}
