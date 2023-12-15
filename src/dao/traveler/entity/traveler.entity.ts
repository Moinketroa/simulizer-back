import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { AirportEntity } from '../../airport/entity/airport.entity';
import { TravelEntity } from '../../travel/entity/travel.entity';

@Entity('travelers')
export class TravelerEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => AirportEntity)
    @JoinColumn({ name: 'departure_airport' })
    departureAirport: AirportEntity;

    @ManyToOne(() => AirportEntity)
    @JoinColumn({ name: 'destination_airport' })
    destinationAirport: AirportEntity;

    @OneToOne(() => TravelEntity, travel => travel.traveler)
    travel: TravelEntity;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ name: 'created_by' })
    createdBy: string;
}
