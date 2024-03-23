import { Module } from '@nestjs/common';
import { AuthService } from './service';
import { AuthController } from './controller';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserRoleAssociationModule } from 'src/user-role-association/module';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('jwt.secret'),
          signOptions: { expiresIn: '7d' }, // Set your desired sign options
        };
      },
    }),
    UserRoleAssociationModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
