import { ApiProperty } from '@nestjs/swagger';

export class AirportDto {
    @ApiProperty()
    idEnt: string;

    @ApiProperty()
    type: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    latitude: number;

    @ApiProperty()
    longitude: number;

    @ApiProperty()
    municipality: string;

    @ApiProperty()
    iataCode: string;
}
