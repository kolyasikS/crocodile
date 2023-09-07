import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from './auth.guard';
import { UserAuthDto } from './dto/user-auth.dto';
import { User } from '../schemas/user.schema';
import { UserReq } from '../users/user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
        console.log(signInDto);
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('refresh')
    checkAuth(@UserReq('user') user: UserAuthDto) {
        return this.authService.signToken({sub: user.sub, username: user.username});
    }
}
