import { config } from 'dotenv';

config({ path: '.env' });

export const POSTGRES_URL = process.env.POSTGRES_URL;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
export const HOST = process.env.HOST;