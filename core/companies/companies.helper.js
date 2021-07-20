import dotenv from 'dotenv';

dotenv.config();

export const getCurrentUrl = async (request) => {
  const { PORT } = process.env;
  return `${request.protocol}://${request.hostname}${PORT === '80' || PORT === '443' ? '' : `:${PORT}`}/`;
}