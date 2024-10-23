import { Injectable } from '@nestjs/common';

@Injectable()
export class CartsRepository {
  async getCartByUserId(userId: string) {}

  async createOrAddCart(userId: string, products: Array<string>) {}
}
