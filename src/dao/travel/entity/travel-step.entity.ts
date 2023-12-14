import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { TravelEntity } from './travel.entity';
import { AirportConnectionEntity } from '../../airport-connection/entity/airport-connection.entity';
import { TravelStepDirection } from './travel-step-direction.enum';

@Entity('travel_steps')
export class TravelStepEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: 'step_order' })
    stepOrder: number;

    @ManyToOne(() => TravelEntity, travel => travel.steps)
    @JoinColumn({ name: 'travel_id' })
    travel: TravelEntity;

    @ManyToOne(() => AirportConnectionEntity)
    @JoinColumn({ name: 'airport_connection' })
    airportConnection: AirportConnectionEntity;

    @Column({ type: 'enum', enum: TravelStepDirection })
    direction: TravelStepDirection;
}
