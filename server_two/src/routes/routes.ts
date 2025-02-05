import express from 'express';
import { produceMessage } from '../controllers/controllers';

const routes = express.Router();

routes.post('/produce-message', produceMessage);

export default routes;