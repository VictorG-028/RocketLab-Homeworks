import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';

const validationPipe = {
  provide: APP_PIPE,
  useValue: new ValidationPipe({ whitelist: true }), // Ative a validação de white-list
}

@Module({
  imports: [UserModule, ProductModule, OrderModule],
  controllers: [AppController],
  providers: [AppService, validationPipe],
})
export class AppModule { }
