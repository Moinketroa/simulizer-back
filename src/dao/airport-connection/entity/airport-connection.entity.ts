import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { AirportEntity } from '../../airport/entity/airport.entity';

@Entity('airport_connections')
export class AirportConnectionEntity {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => AirportEntity)
    @JoinColumn({ name: 'first_airport' })
    firstAirport: AirportEntity;

    @ManyToOne(() => AirportEntity)
    @JoinColumn({ name: 'second_airport' })
    secondAirport: AirportEntity;

    @Column()
    capacity: number;

    @Column({ type: 'float' })
    speed: number;

    @Column({ type: 'float' })
    frequency: number;

    @Column({ name: 'loading_time' })
    loadingTime: number;

    @Column({ name: 'unloading_time' })
    unloadingTime: number;
}
