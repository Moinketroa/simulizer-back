import { Injectable } from '@nestjs/common';
import { TravelStepEntity } from '../../dao/travel/entity/travel-step.entity';
import { TravelStepDto } from '../dto/travel-step.dto';
import { AirportConnectionMapper } from '../../airport-connection/mapper/airport-connection.mapper';
import { AirportConnectionEntity } from '../../dao/airport-connection/entity/airport-connection.entity';
import { AirportDto } from '../../airport/dto/airport.dto';
import { TravelStepDirection } from '../../dao/travel/entity/travel-step-direction.enum';
import { AirportMapper } from '../../airport/mapper/airport.mapper';

@Injectable()
export class TravelStepMapper {
    constructor(
        private readonly _airportConnectionMapper: AirportConnectionMapper,
        private readonly _airportMapper: AirportMapper
    ) {}

    toDto(travelStep: TravelStepEntity): TravelStepDto {
        return <TravelStepDto>{
            id: travelStep.id,
            airportConnection: this._airportConnectionMapper.toDto(
                travelStep.airportConnection
            ),
            departureAirport: this.getDepartureAirport(
                travelStep.airportConnection,
                travelStep.direction
            ),
            destinationAirport: this.getDestinationAirport(
                travelStep.airportConnection,
                travelStep.direction
            ),
        };
    }

    private getDepartureAirport(
        airportConnection: AirportConnectionEntity,
        direction: TravelStepDirection
    ): AirportDto {
        if (TravelStepDirection.FROM_FIRST_TO_SECOND === direction) {
            return this._airportMapper.toDto(airportConnection.firstAirport);
        } else {
            return this._airportMapper.toDto(airportConnection.secondAirport);
        }
    }

    private getDestinationAirport(
        airportConnection: AirportConnectionEntity,
        direction: TravelStepDirection
    ): AirportDto {
        if (TravelStepDirection.FROM_FIRST_TO_SECOND === direction) {
            return this._airportMapper.toDto(airportConnection.secondAirport);
        } else {
            return this._airportMapper.toDto(airportConnection.firstAirport);
        }
    }
}
