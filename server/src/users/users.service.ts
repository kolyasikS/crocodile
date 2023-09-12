import { ConflictException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UserAuthDto } from '../auth/dto/user-auth.dto';
import { GameService } from '../game/game.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @Inject(forwardRef(() => GameService)) private gameService: GameService
    ) {}

    async create(createUserDto: CreateUserDto) {
        if (await this.userModel.findOne({username: createUserDto.username})) {
            throw new ConflictException('User already exist');
        }


        try {
            const hashPassword = await bcrypt.hash(createUserDto.password, 3);
            const newUser = await this.userModel.create({...createUserDto, password: hashPassword});
            return newUser;
        } catch (e) {
            return e;
        }

    }

    async findAll() {
        const users = await this.userModel.find();
        return users;
    }

    async findOne(username: string) {
        const user = this.userModel.findOne({username});
        return user;
    }

    async getGame(userAuthDto: UserAuthDto) {
        const user = await this.userModel.findOne({username: userAuthDto.username});
        const game = await this.gameService.getGameForUser(user._id);
        return game;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
