import { Test, TestingModule } from '@nestjs/testing';
import { AirportMapper } from './airport.mapper';
import { AirportEntity } from '../../dao/airport/entity/airport.entity';

describe('AirportMapper', () => {
    let airportMapper: AirportMapper;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [AirportMapper],
        }).compile();

        airportMapper = app.get<AirportMapper>(AirportMapper);
    });

    describe('root', () => {
        it('should exist', () => {
            expect(airportMapper).toBeTruthy();
        });

        it('should map correctly', () => {
            const airportEntity = <AirportEntity>{
                id: 'ID',
                name: 'Name',
                type: 'Type',
                latitude: 420.69,
                longitude: 1664.86,
                municipality: 'Townville',
                iataCode: 'COD',
            };

            const airportDto = airportMapper.toDto(airportEntity);

            expect(airportDto.idEnt).toEqual('ID');
            expect(airportDto.name).toEqual('Name');
            expect(airportDto.type).toEqual('Type');
            expect(airportDto.latitude).toEqual(420.69);
            expect(airportDto.longitude).toEqual(1664.86);
            expect(airportDto.municipality).toEqual('Townville');
            expect(airportDto.iataCode).toEqual('COD');
        });
    });
});
