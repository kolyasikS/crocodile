import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    async create(createUserDto: CreateUserDto) {
        if (await this.userModel.findOne({username: createUserDto.username})) {
            throw new ConflictException('User already exist');
        }


        try {
            console.log(createUserDto)
            const hashPassword = await bcrypt.hash(createUserDto.password, 3);
            console.log(2)
            const newUser = await this.userModel.create({...createUserDto, password: hashPassword});
            console.log(3)
            return newUser;
        } catch (e) {
            return e;
        }

    }

    findAll() {
        return `This action returns all users`;
    }

    async findOne(username: string) {
        const user = this.userModel.findOne({username});
        return user;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
