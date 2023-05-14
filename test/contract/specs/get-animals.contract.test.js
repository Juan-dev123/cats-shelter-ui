import { provider } from '../config/init-pact.js';
import {Matchers} from '@pact-foundation/pact';
import { AnimalController } from '../../../controllers/AnimalsController.js';
import { expect } from 'chai';
import {HttpStatusCode} from "axios";

describe('Animal Service', () => {
    describe('When a request to get an animal is made', () => {
        before(async () => {
            await provider.setup();
            await provider.addInteraction({
                uponReceiving: 'a request to get an animal',
                state: "there one animal to return",
                withRequest: {
                    method: 'GET',
                    path: '/animals/Manchas'
                },
                willRespondWith: {
                    status: 200,
                    body: Matchers.somethingLike({
                        name: Matchers.like('Manchas'),
                        breed: Matchers.like("Bengali"),
                        gender: Matchers.like("Female"),
                        vaccinated: Matchers.boolean(true)
                    })
                }
            });
        });

        after(() => provider.finalize());

        it('should return the correct data', async () => {
            const manchasCat = {
                name: "Manchas",
                breed: "Bengali",
                gender: "Female",
                vaccinated: true
            }

            const response = await AnimalController.getAnimal("Manchas");
            const responseBody = response.data;

            expect(responseBody).to.not.be.undefined;
            expect(responseBody).to.have.property('name');
            expect(responseBody).to.have.property('breed');
            expect(responseBody).to.have.property('gender');
            expect(responseBody).to.have.property('vaccinated');

            expect(responseBody).to.be.eql(manchasCat);
            expect(response.status).to.be.equal(HttpStatusCode.Ok);
            await provider.verify()
        });
    });
});