import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '../util/decorator/api-paginated-response.decorator';
import { PageOptionsDto } from '../util/dto/page-options.dto';
import { PageDto } from '../util/dto/page.dto';
import { TravelerDto } from './dto/traveler.dto';
import { TravelerService } from './traveler.service';

@Controller('travelers')
@ApiTags('travelers')
@UseInterceptors(ClassSerializerInterceptor)
export class TravelerController {
    constructor(
        private readonly _travelerService: TravelerService
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiPaginatedResponse(TravelerDto)
    getTravelers(
        @Query() pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<TravelerDto>> {
        return this._travelerService.getTravelers(
            pageOptionsDto
        );
    }
}
