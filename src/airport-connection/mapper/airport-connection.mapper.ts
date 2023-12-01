import { Injectable } from '@nestjs/common';
import { AirportConnectionEntity } from '../../dao/airport-connection/entity/airport-connection.entity';
import { AirportConnectionDto } from '../dto/airport-connection.dto';
import { AirportMapper } from '../../airport/mapper/airport.mapper';

@Injectable()
export class AirportConnectionMapper {
    constructor(private readonly _airportMapper: AirportMapper) {}

    toDto(airportConnection: AirportConnectionEntity): AirportConnectionDto {
        return <AirportConnectionDto>{
            id: airportConnection.id,
            airports: [
                this._airportMapper.toDto(airportConnection.firstAirport),
                this._airportMapper.toDto(airportConnection.secondAirport),
            ],
            capacity: airportConnection.capacity,
            speed: airportConnection.speed,
            frequency: airportConnection.frequency,
            loadingTime: airportConnection.loadingTime,
            unloadingTime: airportConnection.unloadingTime,
        };
    }
}
