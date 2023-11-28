import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDtoParameters } from '../interface/page-meta-dto-parameters.interface';

export class PageMetaDto {
    @ApiProperty()
    readonly page: number;

    @ApiProperty()
    readonly take: number;

    @ApiProperty()
    readonly itemCount: number;

    @ApiProperty()
    readonly pageCount: number;

    @ApiProperty()
    readonly hasPreviousPage: boolean;

    @ApiProperty()
    readonly hasNextPage: boolean;

    constructor(pageMetaDtoParameters: PageMetaDtoParameters) {
        this.page = pageMetaDtoParameters.pageOptionsDto.page;
        this.take = pageMetaDtoParameters.pageOptionsDto.take;
        this.itemCount = pageMetaDtoParameters.itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.take);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.pageCount;
    }
}
