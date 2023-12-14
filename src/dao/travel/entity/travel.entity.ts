import {
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { TravelerEntity } from '../../traveler/entity/traveler.entity';
import { TravelStepEntity } from './travel-step.entity';

@Entity('travels')
export class TravelEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @OneToOne(() => TravelerEntity)
    @JoinColumn({ name: 'traveler' })
    traveler: TravelerEntity;

    @OneToMany(() => TravelStepEntity, step => step.travel, {
        cascade: true,
        eager: true,
    })
    steps: TravelStepEntity[];
}
