import { ApiProperty } from '@nestjs/swagger';
import { TravelStepDto } from './travel-step.dto';
import { IsArray, Length } from 'class-validator';

export class TravelDto {
    @ApiProperty()
    id: string;

    @IsArray()
    @Length(1)
    @ApiProperty({ isArray: true, type: () => TravelStepDto })
    travelSteps: TravelStepDto[];
}
