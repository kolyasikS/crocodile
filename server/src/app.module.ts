import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PaintGateway } from './gameWS/paint/paint.gateway';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        ConfigModule.forRoot({ envFilePath: '.env' }),
        MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    ],
    controllers: [AppController],
    providers: [AppService, PaintGateway],
})
export class AppModule {}
