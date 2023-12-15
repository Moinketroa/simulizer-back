import { Injectable } from '@nestjs/common';
import { TravelDto } from '../dto/travel.dto';
import { TravelEntity } from '../../dao/travel/entity/travel.entity';

@Injectable()
export class TravelMapper {
    toDto(travelEntity: TravelEntity): TravelDto {
        return <TravelDto>{
            id: travelEntity.id,
        };
    }
}
