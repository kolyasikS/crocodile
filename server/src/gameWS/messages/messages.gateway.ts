import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { from, map, Observable } from 'rxjs';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class MessagesGateway {
    @WebSocketServer()
    server: Server;
    @SubscribeMessage('message')
    message(@MessageBody() data: any): void {
        console.log(data);
        this.server.emit('reMessage', { message: data })
    }
}
