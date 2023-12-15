import { ApiProperty } from '@nestjs/swagger';
import { AirportDto } from '../../airport/dto/airport.dto';
import { TravelDto } from '../../travel/dto/travel.dto';

export class TravelerDto {
    @ApiProperty()
    id: string;

    @ApiProperty({ type: () => AirportDto })
    departureAirport: AirportDto;

    @ApiProperty({ type: () => AirportDto })
    destinationAirport: AirportDto;

    @ApiProperty({ type: () => TravelDto })
    travel: TravelDto;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    createdBy: string;
}
