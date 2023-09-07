import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { GameWSModule } from './gameWS/game.module';
import { GameModule } from './game/game.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        GameModule,
        GameWSModule,
        ConfigModule.forRoot({ envFilePath: '.env' }),
        MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
