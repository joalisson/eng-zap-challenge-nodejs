import app from './app';
import logger from './logger';
import routes from './src/routes';

const PORT = process.env.PORT || 3000;

app.use('/', routes);

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));