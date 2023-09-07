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
        console.log(data);
        this.server.to(data.room).emit('reMessage', data);
    }

    @SubscribeMessage('joinRoom')
    async joinToRoom(@MessageBody() data: any, @ConnectedSocket() socket: Socket): Promise<void> {
        socket.join(data.room);
        console.log(`${socket.id} is joining ${data.room}`);
        this.server.to(data.room).emit('roomJoined', data);
    }

    @SubscribeMessage('createRoom')
    async createRoom(@MessageBody() data: CreateRoomDto, @ConnectedSocket() socket: Socket): Promise<void> {
        const room = uuid();
        console.log(data.username, room);
        const res = await this.gameService.create({owner: data.username, room});
        if (res.errors) {
            console.log(res.errors)
            return;
        }
        socket.join(room);
        this.server.to(room).emit('roomCreated', { room });
    }

    @SubscribeMessage('draw')
    draw(@MessageBody() data: any): void {
        console.log(data);
        this.server.emit('draw', data)
    }
}
