import { Injectable } from '@nestjs/common';
import { TravelDto } from '../dto/travel.dto';
import { TravelEntity } from '../../dao/travel/entity/travel.entity';
import { TravelStepMapper } from './travel-step.mapper';

@Injectable()
export class TravelMapper {
    constructor(private readonly _travelStepMapper: TravelStepMapper) {}

    toDto(travelEntity: TravelEntity): TravelDto {
        return <TravelDto>{
            id: travelEntity.id,
            travelSteps: travelEntity.steps?.map(travelStep =>
                this._travelStepMapper.toDto(travelStep)
            ),
        };
    }
}
