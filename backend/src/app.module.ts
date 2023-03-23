import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from 'src/entity/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'env/.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log(configService.get('POSTGRES_USER'));
        console.log(configService.get('POSTGRES_PASSWORD'));
        console.log(configService.get('POSTGRES_DB'));
        console.log(configService.get('POSTGRES_HOST'));
        console.log(configService.get('POSTGRES_PORT'));
        return {
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: +configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          entities: [User],
          synchronize: true,
          migrationsRun: false,
        };
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
