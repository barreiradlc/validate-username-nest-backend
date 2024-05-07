import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderGateway } from './order.gateway';
import { Order } from './schema/schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private orderGateway: OrderGateway,
  ) {}

  async getAll(): Promise<Order[]> {
    return this.orderModel.find({});
  }

  async create(orderData: Order): Promise<Order> {
    console.log('Before create');

    const newOrder = await this.orderModel.create(orderData);
    console.log('Creating...');
    await newOrder.save();
    console.log('Saving...');
    this.orderGateway.notify('order-added', newOrder);
    console.log('Notifying...');

    return newOrder;
  }
}
