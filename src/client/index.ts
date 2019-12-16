import axios from 'axios';
import logger from '../../logger';

require('dotenv').config({ path: __dirname + '/.env' });

const URL:string = process.env.ZAP_SOURCE_URL || 'http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-2.json';

export default async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    logger.error(error);
    return error;
  }
}