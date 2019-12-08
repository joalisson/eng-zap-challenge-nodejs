import app from './app';
import logger from './logger';
import {
  hello 
} from './src/routes';

const PORT = process.env.PORT || 3000;

app.use('/', hello);

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));