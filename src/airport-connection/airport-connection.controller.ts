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
import { PageOptionsDto } from '../util/dto/page-options.dto';
import { PageDto } from '../util/dto/page.dto';
import { ApiPaginatedResponse } from '../util/decorator/api-paginated-response.decorator';
import { AirportConnectionService } from './airport-connection.service';
import { AirportConnectionDto } from './dto/airport-connection.dto';

@Controller('airportConnections')
@ApiTags('airportConnections')
@UseInterceptors(ClassSerializerInterceptor)
export class AirportConnectionController {
    constructor(
        private readonly _airportConnectionService: AirportConnectionService
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiPaginatedResponse(AirportConnectionDto)
    getAirportConnections(
        @Query() pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<AirportConnectionDto>> {
        return this._airportConnectionService.getAirportConnections(
            pageOptionsDto
        );
    }
}
