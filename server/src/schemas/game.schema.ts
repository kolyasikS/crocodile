import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import * as mongoose from 'mongoose';

export type UserDocument = HydratedDocument<Game>;

@Schema()
export class Game {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true, unique: true })
    owner: User;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }], default: []})
    players: User[];

    @Prop({required: true})
    room: string;

}

export const GameSchema = SchemaFactory.createForClass(Game);
