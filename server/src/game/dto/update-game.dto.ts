import { PartialType } from '@nestjs/mapped-types';
import { CreateGameDto } from './create-game.dto';
import { User } from '../../schemas/user.schema';

export class UpdateGameDto extends PartialType(CreateGameDto) {
    newPlayer: User
}
