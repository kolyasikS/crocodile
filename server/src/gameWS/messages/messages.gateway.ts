import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { from, map, Observable } from 'rxjs';
import { MessageDto } from './dto/message.dto';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class MessagesGateway {
    @WebSocketServer()
    server: Server;
    @SubscribeMessage('message')
    message(@MessageBody() data: MessageDto): void {
        console.log(data);
        this.server.to(data.room).emit('reMessage', data);
    }

    @SubscribeMessage('joinRoom')
    async joinToRoom(@MessageBody() data: any, @ConnectedSocket() socket: Socket): Promise<void> {
        socket.join(data.room);
        console.log(`${socket.id} is joining ${data.room}`);
        this.server.to(data.room).emit('roomCreated', data);
    }
    @SubscribeMessage('draw')
    draw(@MessageBody() data: any): void {
        console.log(data);
        this.server.emit('draw', data)
    }
}
