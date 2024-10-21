import { Injectable } from '@nestjs/common';
import { CreateMercadopagoDto } from './dto/create-mercadopago.dto';
import { UpdateMercadopagoDto } from './dto/update-mercadopago.dto';
import { MercadoPagoPreApproval } from 'mercadopago/resources/preapproval';
import { mpClient } from '../../config/mercadopago.config';
import { Payment, Preference, MerchantOrder } from 'mercadopago';
import { create } from 'domain';
import { HOST } from '../../config/enviroments.config';
import mercadopago from 'mercadopago';

@Injectable()
export class MercadopagoService {
  async create(createMercadopagoDto: any) {
    try {
      createMercadopagoDto = {
        body: {
          items: [
            {
              title: "Assassin's Creed",
              quantity: 1,
              unit_price: 5000,
              currency_id: 'ARS',
            },
          ],
          payer: {
            email: 'test_user@example.com',
          },
          back_urls: {
            success: `${HOST}/mercadopago/success`,
            failure: `${HOST}/mercadopago/failure`,
          },
          notification_url: `${HOST}/mercadopago/webhook`,
          auto_return: 'approved',
        },
      };

      const preference = await new Preference(mpClient).create(
        createMercadopagoDto,
      );
      return preference;
    } catch (error) {
      console.log(error);
    }
  }

  async webhook(body: any) {
    if (body.data) {
      const payment = await new Payment(mpClient).get(body.data);
      if (payment.status === 'approved') {
        console.log('Pago aprobado');
        const order = await new MerchantOrder(mpClient).get(payment.order as any)
        console.log(order);
      }
    }
  }
}
