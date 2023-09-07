import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectModel } from '@nestjs/mongoose';
import { GameModule } from './game.module';
import { Game } from '../schemas/game.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { UserAuthDto } from '../auth/dto/user-auth.dto';
import { JoinGameDto } from './dto/join-game.dto';
import { UsersService } from '../users/users.service';

const enum Roles {
    Player = 'Player',
    Owner = 'Owner',
}

@Injectable()
export class GameService {
    constructor(
        @InjectModel(Game.name) private gameModel: Model<Game>,
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}
    async create(createGameDto: CreateGameDto) {
        try {
            const ownerUser = await this.userService.findOne(createGameDto.owner);
            const game = await this.gameModel.create({owner: ownerUser, room: createGameDto.room});
            return game;
        } catch (e) {
            return e;
        }
    }

    async join({ token, room }: JoinGameDto) {
        console.log(token, room);
        try {
            const payload = await this.jwtService.verifyAsync<UserAuthDto>(token, {
                secret: jwtConstants.secret
            })

            const game: Game = await this.gameModel.findOne({room});
            if (game.owner.username === payload.username) {
                return Roles.Owner;
            } else {
                return Roles.Player;
            }

        } catch (e) {
            return e;
        }

    }

    findOne(id: number) {
        return `This action returns a #${id} game`;
    }

    update(id: number, updateGameDto: UpdateGameDto) {
        return `This action updates a #${id} game`;
    }

    remove(id: number) {
        return `This action removes a #${id} game`;
    }
}
