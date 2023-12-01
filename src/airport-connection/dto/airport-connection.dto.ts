import { ApiProperty } from '@nestjs/swagger';
import { AirportDto } from '../../airport/dto/airport.dto';
import { IsArray, Length } from 'class-validator';

export class AirportConnectionDto {
    @ApiProperty()
    id: string;

    @IsArray()
    @Length(2, 2)
    @ApiProperty({ isArray: true, type: () => AirportDto })
    airports: AirportDto[];

    @ApiProperty()
    capacity: number;

    @ApiProperty()
    speed: number;

    @ApiProperty()
    frequency: number;

    @ApiProperty()
    loadingTime: number;

    @ApiProperty()
    unloadingTime: number;
}
