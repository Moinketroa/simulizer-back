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
import { AirportService } from './airport.service';
import { PageOptionsDto } from '../util/dto/page-options.dto';
import { PageDto } from '../util/dto/page.dto';
import { AirportDto } from './dto/airport.dto';
import { ApiPaginatedResponse } from '../util/decorator/api-paginated-response.decorator';

@Controller('airports')
@ApiTags('airports')
@UseInterceptors(ClassSerializerInterceptor)
export class AirportController {
    constructor(private readonly _airportService: AirportService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiPaginatedResponse(AirportDto)
    getAirports(
        @Query() pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<AirportDto>> {
        return this._airportService.getAirports(pageOptionsDto);
    }
}
