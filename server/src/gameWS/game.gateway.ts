import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDto } from './dto/message.dto';
import { v4 as uuid} from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { GameService } from '../game/game.service';
import CreateRoomDto from './dto/create-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { LeaveRoomDto } from './dto/leave-room.dto';
@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class GameGateway {
    @WebSocketServer()
    server: Server;

    constructor(
        private gameService: GameService
    ) {}
    @SubscribeMessage('message')
    message(@MessageBody() data: MessageDto): void {
        this.server.to(data.room).emit('reMessage', data);
    }

    @SubscribeMessage('joinRoom')
    async joinToRoom(@MessageBody() data: JoinRoomDto, @ConnectedSocket() socket: Socket): Promise<void> {
        socket.join(data.room);
        const role = await this.gameService.join(data)
        this.server.to(data.room).emit('roomJoined', {...data, role});
    }

    @SubscribeMessage('createRoom')
    async createRoom(@MessageBody() data: CreateRoomDto, @ConnectedSocket() socket: Socket): Promise<void> {
        const room = uuid();
        const res = await this.gameService.create({owner: data.username, room});
        if (res.errors) {
            console.log(res.errors)
            return;
        }
        socket.join(room);
        this.server.to(room).emit('roomCreated', { room });
    }

    @SubscribeMessage('leaveRoom')
    async leaveRoom(@MessageBody() data: LeaveRoomDto, @ConnectedSocket() socket: Socket): Promise<void> {
        const res = await this.gameService.leave(data.username);
        if (res.errors) {
            console.log(res);
            return;
        }
        this.server.to(data.room).emit('roomLeaved', {username: data.username});
        socket.leave(data.room);
    }

    @SubscribeMessage('draw')
    draw(@MessageBody() data: any): void {
        this.server.emit('draw', data)
    }
}
