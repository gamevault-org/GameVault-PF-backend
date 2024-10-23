import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ordersRepository } from './orders.repository';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, ordersRepository],
})
export class OrdersModule {}
