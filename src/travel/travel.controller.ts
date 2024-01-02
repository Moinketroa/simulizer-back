import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    UseInterceptors,
} from '@nestjs/common';
import { TravelService } from './travel.service';
import { ApiTags } from '@nestjs/swagger';
import { TravelDto } from './dto/travel.dto';

@Controller('travels')
@ApiTags('travels')
@UseInterceptors(ClassSerializerInterceptor)
export class TravelController {
    constructor(private readonly _travelService: TravelService) {}

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getTravelers(@Param('id') travelId: string): Promise<TravelDto> {
        return this._travelService.getTravel(travelId);
    }
}
