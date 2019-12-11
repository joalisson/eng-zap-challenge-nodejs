require('dotenv').config();

import axios from 'axios';
import logger from '../logger';

const URL:string = process.env.ZAP_SOURCE_URL || '';

export default async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    logger.error(error);
    return error;
  }
}