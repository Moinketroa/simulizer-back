import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { AirportEntity } from '../../airport/entity/airport.entity';

@Entity('travelers')
export class TravelerEntity {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => AirportEntity)
    @JoinColumn({ name: 'departure_airport' })
    departureAirport: AirportEntity;

    @ManyToOne(() => AirportEntity)
    @JoinColumn({ name: 'destination_airport' })
    destinationAirport: AirportEntity;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ name: 'created_by' })
    createdBy: string;
}
