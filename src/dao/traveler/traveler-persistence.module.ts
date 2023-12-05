import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelerEntity } from './entity/traveler.entity';
import { TravelerRepository } from './traveler.repository';

@Module({
    imports: [TypeOrmModule.forFeature([TravelerEntity])],
    exports: [TravelerRepository],
    providers: [TravelerRepository],
})
export class TravelerPersistenceModule {}
