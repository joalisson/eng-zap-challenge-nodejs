import * as express from 'express';

const route = express.Router();

route.get('/hello', (req: express.Request, res: express.Response) => {
  res.json({
    message: 'Welcome!'
  })
});

export default route;