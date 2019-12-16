import app from './app';
import logger from './logger';
import properties from './src/routes';

const PORT = process.env.PORT || 3000;

app.use('/', properties);

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));