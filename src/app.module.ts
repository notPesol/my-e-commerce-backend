import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/module';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/config/configuration';
import { SequelizeModule } from './common/sequelize/module';
import { AuthGuard } from './common/guard/auth.guard';
import { RoleModule } from './role/module';
import { RolesGuard } from './common/guard/roles.guard';
import { UserRoleAssociationModule } from './user-role-association/module';
import { AuthModule } from './auth/module';
import { HttpExceptionFilter } from './common/exception-filter/http-exception.filter';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { BrandModule } from './brand/module';
import { CategoryModule } from './category/module';
import { ProductModule } from './product/module';
import { ProductAssociationModule } from './product-association/module';
import { WishlistAssociationModule } from './wishlist-association/module';
import { UserInfoModule } from './user-info/module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SequelizeModule,
    UserModule,
    RoleModule,
    UserRoleAssociationModule,
    AuthModule,
    BrandModule,
    CategoryModule,
    ProductModule,
    ProductAssociationModule,
    WishlistAssociationModule,
    UserInfoModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
