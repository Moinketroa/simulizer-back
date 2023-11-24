import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('app')
@ApiTags('app')
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Hello World Test response' })
    getHello(): string {
        return this.appService.getHello();
    }
}
