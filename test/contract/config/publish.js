import { Publisher } from '@pact-foundation/pact-core';
import dotenv from 'dotenv';

dotenv.config();

const opts = {
   pactBroker: process.env.PACT_BROKER_BASE_URL,
   pactBrokerToken: process.env.PACT_BROKER_TOKEN,
   // consumerVersion: process.env.npm_package_version,
   consumerVersion: "0.1.1", //cuando agrego nuevas cosas al contrato tengo que ir subiendo la version
   pactFilesOrDirs: ['./test/contract/pacts']
};

new Publisher(opts).publish();