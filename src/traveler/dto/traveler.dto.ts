import { ApiProperty } from '@nestjs/swagger';
import { AirportDto } from '../../airport/dto/airport.dto';

export class TravelerDto {
    @ApiProperty()
    id: string;

    @ApiProperty({ type: () => AirportDto })
    departureAirport: AirportDto;

    @ApiProperty({ type: () => AirportDto })
    destinationAirport: AirportDto;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    createdBy: string;
}
