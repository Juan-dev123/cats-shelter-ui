import { provider } from '../config/init-pact.js';
import {Matchers} from '@pact-foundation/pact';
import { AnimalController } from '../../../controllers/AnimalsController.js';
import { expect } from 'chai';
import {HttpStatusCode} from "axios";

describe('Animal Service', () => {
    describe('When a request to delete an animal', () => {
        before(async () => {
            await provider.setup();
            await provider.addInteraction({
                uponReceiving: 'a request to delete an animal',
                state: "there are one animal to delete",
                withRequest: {
                    method: 'DELETE',
                    path: '/animals/Manchas',
                },
                willRespondWith: {
                    status: 204
                }
            });
        });

        after(() => provider.finalize());

        it('should return no content', async () => {
            const response = await AnimalController.delete('Manchas');
            const responseBody = response.data;

            expect(responseBody).to.be.empty;
            expect(response.status).to.be.equal(HttpStatusCode.NoContent);
            await provider.verify()
        })
    })
});