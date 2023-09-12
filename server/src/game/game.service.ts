import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from '../schemas/game.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { UserAuthDto } from '../auth/dto/user-auth.dto';
import { JoinGameDto } from './dto/join-game.dto';
import { UsersService } from '../users/users.service';
import mongoose from 'mongoose';
import { User } from '../schemas/user.schema';

const enum Roles {
    Player = 'Player',
    Owner = 'Owner',
}

@Injectable()
export class GameService {
    constructor(
        @InjectModel(Game.name) private gameModel: Model<Game>,
        @Inject(forwardRef(() => UsersService)) private userService: UsersService,
        private jwtService: JwtService,
    ) {}
    async create(createGameDto: CreateGameDto) {
        try {
            const ownerUser = await this.userService.findOne(createGameDto.owner);
            const game = await this.gameModel.create({owner: ownerUser, room: createGameDto.room, players: [ownerUser]});
            return game;
        } catch (e) {
            return e;
        }
    }

    async join({ username, token, room }: JoinGameDto) {
        try {
            const payload = {username} ?? await this.jwtService.verifyAsync<UserAuthDto>(token, {
                secret: jwtConstants.secret
            })
            const game = (await this.gameModel.aggregate([
                {
                    $match: {
                        room
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'owner',
                        foreignField: '_id',
                        as: 'ownerUser'
                    }
                },
                {
                    $unwind: { path: "$games",  preserveNullAndEmptyArrays: true,}
                },
                {
                    $limit: 1
                }
            ]))[0];
            const ownerUsername = game && game.ownerUser[0].username;
            if (ownerUsername === payload.username) {
                return Roles.Owner;
            } else {
                return Roles.Player;
            }

        } catch (e) {
            return e;
        }

    }
    async getGameForUser(_id: mongoose.Types.ObjectId) {
        const game = await this.gameModel.findOne({players: {$in: [_id]}});
        return game;
    }
    async leave(username: string) {
        const user = await this.userService.findOne(username);
        const game= await this.gameModel.findOneAndUpdate(
            {players: {$in: [user._id]}},
            {$pull: {players: user._id}},
            {returnOriginal: false}
        );
        console.log(game);
        if (game.players.length === 0) {
            await this.gameModel.deleteOne({_id: game._id});
        }
        return game;
    }

    update(id: number, updateGameDto: UpdateGameDto) {
        return `This action updates a #${id} game`;
    }

    remove(id: number) {
        return `This action removes a #${id} game`;
    }
}
