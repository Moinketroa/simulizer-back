import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('airports')
export class AirportEntity {
    @PrimaryColumn({ name: 'ident' })
    id: string;

    @Column()
    type: string;

    @Column()
    name: string;

    @Column({ type: 'float', name: 'latitude_deg' })
    latitude: number;

    @Column({ type: 'float', name: 'longitude_deg' })
    longitude: number;

    @Column()
    municipality: string;

    @Column({ name: 'iata_code' })
    iataCode: string;
}
