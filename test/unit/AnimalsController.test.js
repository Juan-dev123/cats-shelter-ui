import { expect } from 'chai';
import moxios from 'moxios';
import { AnimalController, axiosInstance } from '../../controllers/AnimalsController.js';

describe('Animal Controller Unit Tests', () => {

    beforeEach(async () => {
        moxios.install(axiosInstance);
    });

    afterEach(() => {
        moxios.uninstall(axiosInstance);
    });

    it('Test Register Animal', async () => {
        const animalToRegister = {
            name: "manchas",
            breed: "Bengali",
            gender: "Female",
            vaccinated: true
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 201,
                response: animalToRegister,
            });
        });

        const actualResponse = await AnimalController.register(animalToRegister);

        expect(actualResponse.status).to.be.eql(201);
        expect(actualResponse.data).to.be.eql(animalToRegister);
    });

    it('Test list animals', async () => {
        const animal1 = {
            name: "naranjin",
            breed: "Persa",
            gender: "Male",
            vaccinated: true
        }

        const animal2 = {
            name: "manchas",
            breed: "Bengali",
            gender: "Female",
            vaccinated: true
        }

        const animals = [animal1, animal2]

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: animals,
            });
        });

        const actualResponse = await AnimalController.list()

        expect(actualResponse.status).to.be.eql(200);
        expect(actualResponse.data[0]).to.be.eql(animal1);
        expect(actualResponse.data[1]).to.be.eql(animal2);
    });

    it('Test delete animals', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 204,
                response: null
            });
        });

        const actualResponse = await AnimalController.delete("naranjin");
        expect(actualResponse.status).to.be.eql(204);
        expect(actualResponse.data).to.be.null;

    });

    it('Test get animal', async () => {
        const animal = {
            name: "manchas",
            breed: "Bengali",
            gender: "Female",
            vaccinated: true
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: animal,
            });
        });

        const actualResponse = await AnimalController.getAnimal(animal.name);
        expect(actualResponse.status).to.be.eql(200);
        expect(actualResponse.data).to.be.eql(animal);
    });

    it('Test update animal', async () => {
        const animal = {
            name: "manchas",
            breed: "Bengali",
            gender: "Female",
            vaccinated: true
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: animal,
            });
        });

        const actualResponse = await AnimalController.updateAnimal(animal.name);
        expect(actualResponse.status).to.be.eql(200);
        expect(actualResponse.data).to.be.eql(animal);
    });
})