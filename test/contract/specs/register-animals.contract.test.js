import { provider } from '../config/init-pact.js';
import {Matchers} from '@pact-foundation/pact';
import { AnimalController } from '../../../controllers/AnimalsController.js';
import { expect } from 'chai';

describe('Animal Service', () => {
    describe('When a request to create an animal is made', () => {
        before(async () => {
            await provider.setup();
            await provider.addInteraction({
                uponReceiving: 'a request to create an animal',
                state: "there are no animals",
                withRequest: {
                    method: 'POST',
                    path: '/animals',
                    body: Matchers.somethingLike({
                        name: Matchers.like('Manchas'),
                        breed: Matchers.like("Bengali"),
                        gender: Matchers.like("Female"),
                        vaccinated: Matchers.boolean(true)
                    })
                },
                willRespondWith: {
                    status: 201,
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

            const response = await AnimalController.register(manchasCat);
            const responseBody = response.data;

            expect(responseBody).to.not.be.undefined;
            expect(responseBody).to.have.property('name');
            expect(responseBody).to.have.property('breed');
            expect(responseBody).to.have.property('gender');
            expect(responseBody).to.have.property('vaccinated');

            expect(responseBody).to.be.eql(manchasCat);
            await provider.verify()
        });
    });
});