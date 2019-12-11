import redis from 'redis';
import bluebird from 'bluebird';
import logger from '../logger';
import zapService from './zapService';
import { isObject } from 'util';

const client = redis.createClient();

client.on('connect', () => {
  logger.info('Redis connected');
});

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

interface IDataCache {
  get: () => Promise<any>;
}

class DataCache implements IDataCache {

  protected async set() {
    try {
      logger.info('Set data from cache...');
      const response = await zapService();
      await client.set('zapServiceCache', JSON.stringify(response));
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  public async get() {
    try {
      let cache = await client.getAsync('zapServiceCache');
      cache = JSON.parse(cache);
      if (!isObject(cache)) {
        cache = this.set();
      }
      logger.info('Get data from cache...');
      return cache;
    } catch (error) {
      logger.error(error);
    }
  }
}

export default DataCache;