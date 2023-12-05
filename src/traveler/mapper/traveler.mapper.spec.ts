import { Test, TestingModule } from '@nestjs/testing';
import { TravelerMapper } from './traveler.mapper';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { AirportMapper } from '../../airport/mapper/airport.mapper';
import { AirportDto } from '../../airport/dto/airport.dto';
import { TravelerEntity } from '../../dao/traveler/entity/traveler.entity';
import { AirportEntity } from '../../dao/airport/entity/airport.entity';

describe('TravelerMapper', () => {
    let travelerMapper: TravelerMapper;
    let airportMapper: DeepMocked<AirportMapper>;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [TravelerMapper],
        })
            .useMocker(createMock)
            .compile();

        travelerMapper = app.get<TravelerMapper>(TravelerMapper);
        airportMapper = app.get(AirportMapper);
    });

    describe('root', () => {
        it('should exist', () => {
            expect(travelerMapper).toBeTruthy();
        });

        describe('toDto', () => {
            it('should map correctly', () => {
                const departureAirportEntity = <AirportEntity>{
                    id: 'ID1',
                };
                const destinationAirportEntity = <AirportEntity>{
                    id: 'ID2',
                };

                const departureAirportDto = <AirportDto>{
                    idEnt: 'ID1',
                };
                const destinationAirportDto = <AirportDto>{
                    idEnt: 'ID2',
                };

                const travelerEntity = <TravelerEntity>{
                    id: 'ID_T',
                    firstName: 'John',
                    lastName: 'Doe',
                    createdBy: 'Computer',
                    departureAirport: departureAirportEntity,
                    destinationAirport: destinationAirportEntity,
                };

                //mock airport mapper
                airportMapper.toDto.mockImplementation(airportEntity => {
                    if (airportEntity.id === 'ID1') {
                        return departureAirportDto;
                    } else if (airportEntity.id === 'ID2') {
                        return destinationAirportDto;
                    }
                });

                // when
                const travelerResult = travelerMapper.toDto(travelerEntity);

                // then
                expect(travelerResult.id).toEqual('ID_T');
                expect(travelerResult.firstName).toEqual('John');
                expect(travelerResult.lastName).toEqual('Doe');
                expect(travelerResult.createdBy).toEqual('Computer');
                expect(travelerResult.departureAirport.idEnt).toEqual('ID1');
                expect(travelerResult.destinationAirport.idEnt).toEqual('ID2');
            });
        });
    });
});
