
import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
/*import { GameModule } from '../game/game.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from '../schemas/game.schema';*/

@Module({
    imports: [
        // GameModule,
    ],
    providers: [GameGateway],
})
export class GameWSModule {}