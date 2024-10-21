import { MercadoPagoConfig, Preference } from 'mercadopago';
import { MP_ACCESS_TOKEN } from './enviroments.config';

if (!MP_ACCESS_TOKEN) {
  throw new Error('Mercado Pago access token is not defined');
}

export const mpClient = new MercadoPagoConfig({
  accessToken: MP_ACCESS_TOKEN,
});
