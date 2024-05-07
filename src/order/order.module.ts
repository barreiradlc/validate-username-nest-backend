import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { OrderController } from './order.controller';
import { OrderGateway } from './order.gateway';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './schema/schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: OrderSchema, name: Order.name }]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderGateway],
})
export class OrderModule {}
