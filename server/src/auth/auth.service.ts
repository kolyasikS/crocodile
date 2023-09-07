import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(username: string, password: string) {
        const user = await this.usersService.findOne(username);
        console.log(user);
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user._id, username: user.username };
        return {
            access_token: await this.signToken(payload),
        };
    }
    create(createAuthDto: CreateAuthDto) {
        return 'This action adds a new auth';
    }

    findAll() {
        return `This action returns all auth`;
    }

    findOne(id: number) {
        return `This action returns a #${id} auth`;
    }

    update(id: number, updateAuthDto: UpdateAuthDto) {
        return `This action updates a #${id} auth`;
    }

    remove(id: number) {
        return `This action removes a #${id} auth`;
    }

    async signToken(payload) {
        return await this.jwtService.signAsync(payload);
    }
}
