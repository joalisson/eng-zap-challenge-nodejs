import fs from 'fs';
import logger from '../../logger';
import client from '../client';
import { IDataSource } from '../interfaces/datasource.interface';
import { IServiceFilter } from '../interfaces/service.interface';

const path = './datasource/data.json';

class DataSource {
  private async get() {
    try {
      let data = fs.existsSync(path);
  
      if (!data) {
        logger.info('Get response from API');
        const response = await client();
        fs.writeFileSync(path, JSON.stringify(response), 'utf8');
      }
      const buffer = fs.readFileSync(path, 'utf8');
      return JSON.parse(buffer);
    } catch (error) {
      logger.error(error);
    }
  }

  private formatResponse(data: IDataSource[], limit: number, offset: number) {
    const totalCount = data.length;
    const listings = data.slice(offset * limit, (offset * limit) + limit);
    return {
      listings,
      totalCount,
      pageNumber: offset + 1,
      pageSize: listings.length
    }
  }

  private checkBoundingBox(lat: number, lon: number) {
    const minLon = -46.693419;
    const minLat = -23.568704;
    const maxLon = -46.641146;
    const maxLat = -23.546686;

    return (lat > maxLat && lat < minLat) && (minLon > lon && maxLon < lon);
  }

  private checkEligibleProperty(item: IDataSource, type: string, portal: string) {
    if (
      item.usableAreas === 0 ||
      item.address.geoLocation.location.lat === 0 ||
      item.address.geoLocation.location.lon === 0
    ) {
      return false;
    }
  
    switch (portal) {
      case 'zap':
        if (type === 'sale' && item.usableAreas > 350) {
          return item;
        }
    
        if (type === 'rent' && item.usableAreas <= 350) {
          return item;
        }
      case 'viva-real':
        if (type === 'rent') {
          let percent = 30;
          const boundingBox = this.checkBoundingBox(item.address.geoLocation.location.lat, item.address.geoLocation.location.lon);

          if (boundingBox) {
            percent = 50;
          }

          const monthlyCondoFee = parseInt(item.pricingInfos.monthlyCondoFee);
          const total = (percent * 100) / parseInt(item.pricingInfos.price);

          if (typeof monthlyCondoFee !== 'number' || total > monthlyCondoFee) {
            return false;
          }
          return item;
        }
      default:
        break;
    }
  }

  private getDataByPortal(data: IDataSource[], type: string, portal: string) {
    return data.filter((item: IDataSource) => {
      const checked = this.checkEligibleProperty(item, type, portal);
      return checked !== false;
    });
  }

  public async service({ type, limit, offset, service }: IServiceFilter) {
    const data = await this.get();
    const res = this.getDataByPortal(data, type, service);
    return this.formatResponse(res, limit, offset);
  }
};


export default DataSource;