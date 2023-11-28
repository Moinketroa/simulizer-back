import { Injectable } from '@nestjs/common';
import { AirportEntity } from '../../dao/airport/entity/airport.entity';
import { AirportDto } from '../dto/airport.dto';

@Injectable()
export class AirportMapper {
    toDto(airportEntity: AirportEntity): AirportDto {
        return <AirportDto>{
            idEnt: airportEntity.id,
            type: airportEntity.type,
            name: airportEntity.name,
            latitude: airportEntity.latitude,
            longitude: airportEntity.longitude,
            municipality: airportEntity.municipality,
            iataCode: airportEntity.iataCode,
        };
    }
}
