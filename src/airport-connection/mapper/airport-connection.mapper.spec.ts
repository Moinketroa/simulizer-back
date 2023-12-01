import { Test, TestingModule } from '@nestjs/testing';
import { AirportConnectionMapper } from './airport-connection.mapper';
import { AirportEntity } from '../../dao/airport/entity/airport.entity';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { AirportMapper } from '../../airport/mapper/airport.mapper';
import { AirportDto } from '../../airport/dto/airport.dto';
import { AirportConnectionEntity } from '../../dao/airport-connection/entity/airport-connection.entity';

describe('AirportConnectionMapper', () => {
    let airportConnectionMapper: AirportConnectionMapper;
    let airportMapper: DeepMocked<AirportMapper>;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [AirportConnectionMapper],
        })
            .useMocker(createMock)
            .compile();

        airportConnectionMapper = app.get<AirportConnectionMapper>(
            AirportConnectionMapper
        );
        airportMapper = app.get(AirportMapper);
    });

    describe('root', () => {
        it('should exist', () => {
            expect(airportConnectionMapper).toBeTruthy();
        });

        it('should map correctly', () => {
            const firstAirportEntity = <Partial<AirportEntity>>{
                id: 'ID1',
            };
            const secondAirportEntity = <Partial<AirportEntity>>{
                id: 'ID2',
            };
            const airportConnection = <Partial<AirportConnectionEntity>>{
                id: 'ID',
                firstAirport: firstAirportEntity,
                secondAirport: secondAirportEntity,
                capacity: 20,
                speed: 100,
                frequency: 1,
                loadingTime: 10,
                unloadingTime: 15,
            };

            airportMapper.toDto.mockImplementation(airport => {
                return {
                    idEnt: airport.id,
                } as AirportDto;
            });

            const airportConnectionDto = airportConnectionMapper.toDto(
                airportConnection as AirportConnectionEntity
            );

            expect(airportConnectionDto.id).toEqual('ID');
            expect(airportConnectionDto.capacity).toEqual(20);
            expect(airportConnectionDto.speed).toEqual(100);
            expect(airportConnectionDto.frequency).toEqual(1);
            expect(airportConnectionDto.loadingTime).toEqual(10);
            expect(airportConnectionDto.unloadingTime).toEqual(15);
            expect(airportConnectionDto.airports.length).toEqual(2);
            expect(airportConnectionDto.airports[0].idEnt).toEqual('ID1');
            expect(airportConnectionDto.airports[1].idEnt).toEqual('ID2');
        });
    });
});
