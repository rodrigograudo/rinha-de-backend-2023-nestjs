import { Module } from '@nestjs/common';
import { PessoasModule } from './pessoas/pessoas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'rinha',
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    PessoasModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
