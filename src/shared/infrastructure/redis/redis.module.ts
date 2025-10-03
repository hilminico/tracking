import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule as NestRedisModule } from 'nestjs-redis'

// @Module({
//   imports: [
//     NestRedisModule.forRootAsync({
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         config: {
//           url: `redis://${configService.get('REDIS_HOST') || 'localhost'}:${configService.get('REDIS_PORT') || '6380'}`,
//         },
//       }),
//     }),
//   ],
// })
export class RedisModule { }