import * as express from 'express';
import logger from '../../logger';
import DataSource from '../utils/DataSource';

const route = express.Router();
const dataSource = new DataSource();

route.get('/zap', async (req: express.Request, res: express.Response) => {
  try {
    const data = await dataSource.service({ ...req.query, service: 'zap' });
    res.json(data);
  } catch (error) {
    logger.error(error);
  }
});

route.get('/viva-real', async (req: express.Request, res: express.Response) => {
  try {
    const data = await dataSource.service({ ...req.query, service: 'viva-real' });
    res.json(data);
  } catch (error) {
    logger.error(error);
  }
});

export default route;