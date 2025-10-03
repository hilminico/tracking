import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../../../auth/domain/entities/user.entity';
import { Customer } from '../../../customer/domain/entities/customer.entity';
import { Vehicle } from '../../../vehicle/domain/entities/vehicle.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Customer, Vehicle],
        synchronize: true,
        dropSchema: true,
      }),
    }),
  ],
})
export class DatabaseModule { }