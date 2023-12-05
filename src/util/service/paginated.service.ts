import { Injectable } from '@nestjs/common';
import { PageOptionsDto } from '../dto/page-options.dto';
import { PageDto } from '../dto/page.dto';
import { PageMetaDto } from '../dto/page-meta.dto';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

@Injectable()
export class PaginatedService {
    protected async getPage<T, U>(
        pageOptionsDto: PageOptionsDto,
        queryBuilder: SelectQueryBuilder<U>,
        mapCallback: (value: U, index: number, array: U[]) => T
    ): Promise<PageDto<T>> {
        queryBuilder.skip(pageOptionsDto.skip).take(pageOptionsDto.take);

        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return new PageDto(entities.map(mapCallback), pageMetaDto);
    }
}
