import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { GameModule } from '../game/game.module';

@Module({
    imports: [
        forwardRef(() => GameModule),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    exports: [UsersService],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
