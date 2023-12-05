import { PaginatedService } from './paginated.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PageOptionsDto } from '../dto/page-options.dto';
import { Order } from '../enum/order.enum';
import { AirportConnectionEntity } from '../../dao/airport-connection/entity/airport-connection.entity';
import { createMock } from '@golevelup/ts-jest';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

describe('PaginatedService', () => {
    let paginatedService: PaginatedService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [PaginatedService],
        }).compile();

        paginatedService = app.get<PaginatedService>(PaginatedService);
    });

    describe('root', () => {
        it('should exist', () => {
            expect(paginatedService).toBeTruthy();
        });

        describe('getPage', () => {
            it('should create the page correctly', async () => {
                const pageOptionsDto = <PageOptionsDto>{
                    order: Order.ASC,
                    page: 1,
                    take: 1,
                };
                const entity = { id: 'ID1' };
                const dto = { id: 'ID' };

                const partialQueryBuilder =
                    createMock<SelectQueryBuilder<any>>();
                partialQueryBuilder.getCount.mockResolvedValue(1);
                partialQueryBuilder.getRawAndEntities.mockResolvedValue({
                    entities: [entity] as AirportConnectionEntity[],
                    raw: [],
                });

                const mapCallback = jest.fn(() => dto);

                const getPageResult = await paginatedService['getPage'](
                    pageOptionsDto,
                    partialQueryBuilder,
                    mapCallback
                );

                expect(mapCallback).toBeCalledTimes(1);
                expect(getPageResult.data).toEqual([dto]);
                expect(getPageResult.meta.itemCount).toEqual(1);
                expect(getPageResult.meta.pageCount).toEqual(1);
                expect(getPageResult.meta.page).toEqual(1);
                expect(getPageResult.meta.hasPreviousPage).toEqual(false);
                expect(getPageResult.meta.hasNextPage).toEqual(false);
            });

            it('should create empty page correctly', async () => {
                const pageOptionsDto = <PageOptionsDto>{
                    order: Order.ASC,
                    page: 1,
                    take: 1,
                };

                const partialQueryBuilder =
                    createMock<SelectQueryBuilder<any>>();
                partialQueryBuilder.getCount.mockResolvedValue(0);
                partialQueryBuilder.getRawAndEntities.mockResolvedValue({
                    entities: [],
                    raw: [],
                });

                const mapCallback = jest.fn(() => {});

                const getPageResult = await paginatedService['getPage'](
                    pageOptionsDto,
                    partialQueryBuilder,
                    mapCallback
                );

                expect(mapCallback).toBeCalledTimes(0);
                expect(getPageResult.data).toEqual([]);
                expect(getPageResult.meta.itemCount).toEqual(0);
                expect(getPageResult.meta.pageCount).toEqual(0);
                expect(getPageResult.meta.page).toEqual(1);
                expect(getPageResult.meta.hasPreviousPage).toEqual(false);
                expect(getPageResult.meta.hasNextPage).toEqual(false);
            });
        });
    });
});
