import { ApiProperty } from '@nestjs/swagger';
import { AirportDto } from '../../airport/dto/airport.dto';
import { AirportConnectionDto } from '../../airport-connection/dto/airport-connection.dto';

export class TravelStepDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    departureAirport: AirportDto;

    @ApiProperty()
    destinationAirport: AirportDto;

    @ApiProperty()
    airportConnection: AirportConnectionDto;
}
