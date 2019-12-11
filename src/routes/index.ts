import * as express from 'express';
import DataCache from '../dataCache';
import logger from '../../logger';

const route = express.Router();

const dataCache = new DataCache();

route.get('/hello', async (req: express.Request, res: express.Response) => {
  try {
    const response: any = await dataCache.get();
    res.json(response);
  } catch (error) {
    logger.error(error);
  }
});

export default route;