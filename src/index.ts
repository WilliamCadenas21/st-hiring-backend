import express from 'express';
import { knex } from 'knex';
import dbConfig from './knexfile';
import { createEventDAL } from './dal/events.dal';
import { createTicketDAL } from './dal/tickets.dal';
import { createGetEventsController } from './controllers/get-events';
import mongoInit from './database/mongo/mongoConnection';
import { getMobileSettings } from './controllers/getMobileSettings.controller';
import { getMobileSettingsByClientId } from './controllers/getMobileSettingsByClientId.controller';
import { validateQuery } from './middlewares/validateQuery';
import { ClientIdQuerySchema } from './validations/schemas/clientId.schema';

mongoInit();

// initialize Knex
const Knex = knex(dbConfig.development);

// Initialize DALs
const eventDAL = createEventDAL(Knex);
const TicketDAL = createTicketDAL(Knex);

const app = express();

app.use('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/events', createGetEventsController({ eventsDAL: eventDAL, ticketsDAL: TicketDAL }));

app.use('/mobile-config', getMobileSettings());

app.use('/mobile-config-by-client-id', validateQuery(ClientIdQuerySchema), getMobileSettingsByClientId());

app.use('/', (_req, res) => {
  res.json({ message: 'Hello API' });
});

app.listen(3000, () => {
  console.log('Server Started');
});
