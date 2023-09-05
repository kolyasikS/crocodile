
import { Module } from '@nestjs/common';
import { PaintGateway } from './paint.gateway';

@Module({
    providers: [PaintGateway],
})
export class EventsModule {}