import { Injectable } from '@nestjs/common';
import { CartsRepository } from './carts.repository';

@Injectable()
export class CartsService {
  constructor(private readonly cartsRepository: CartsRepository) {}

  async getCartByUserId(userId: string) {}

  async createOrAddCart(userId: string, products: Array<string>) {}
}
