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
import { validateBody } from './middlewares/validateBody';
import { UpdateMobileSettingsSchema } from './validations/schemas/body.schema';
import { putMobileSettingsByClientId } from './controllers/putMobileSettingsByClienId.controller';

mongoInit();

// initialize Knex
const Knex = knex(dbConfig.development);

// Initialize DALs
const eventDAL = createEventDAL(Knex);
const TicketDAL = createTicketDAL(Knex);

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/events', createGetEventsController({ eventsDAL: eventDAL, ticketsDAL: TicketDAL }));

app.get('/mobile-config', getMobileSettings());

app.get('/mobile-config-by-client-id', validateQuery(ClientIdQuerySchema), getMobileSettingsByClientId());

app.put('/update-config-by-client-id', validateBody(UpdateMobileSettingsSchema), putMobileSettingsByClientId());

app.get('/', (_req, res) => {
  res.json({ message: 'Hello API' });
});

app.listen(3000, () => {
  console.log('Server Started');
});
