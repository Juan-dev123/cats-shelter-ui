import { provider } from '../config/init-pact.js';
import {Matchers} from '@pact-foundation/pact';
import { AnimalController } from '../../../controllers/AnimalsController.js';
import { expect } from 'chai';
import {HttpStatusCode} from "axios";

describe('Animal Service', () => {
    describe('When a request to update an animal is made', () => {
        before(async () => {
            await provider.setup();
            await provider.addInteraction({
                uponReceiving: 'a request to update an animal',
                state: "there is one animal to update",
                withRequest: {
                    method: 'PUT',
                    path: '/animals/Manchas',
                    body: Matchers.somethingLike({
                        name: Matchers.like('Cosito'),
                        breed: Matchers.like("Persa"),
                        gender: Matchers.like("Female"),
                        vaccinated: Matchers.boolean(true)
                    })
                },
                willRespondWith: {
                    status: 200,
                    body: Matchers.somethingLike({
                        name: Matchers.like('Cosito'),
                        breed: Matchers.like("Persa"),
                        gender: Matchers.like("Female"),
                        vaccinated: Matchers.boolean(true)
                    })
                }
            });
        });

        after(() => provider.finalize());

        it('should return the correct data', async () => {
            const cositoCat = {
                name: "Cosito",
                breed: "Persa",
                gender: "Female",
                vaccinated: true
            }

            const response = await AnimalController.updateAnimal("Manchas", cositoCat);
            const responseBody = response.data;

            expect(responseBody).to.not.be.undefined;
            expect(responseBody).to.have.property('name');
            expect(responseBody).to.have.property('breed');
            expect(responseBody).to.have.property('gender');
            expect(responseBody).to.have.property('vaccinated');

            expect(responseBody).to.be.eql(cositoCat);
            expect(response.status).to.be.equal(HttpStatusCode.Ok);
            await provider.verify()
        });
    });
});