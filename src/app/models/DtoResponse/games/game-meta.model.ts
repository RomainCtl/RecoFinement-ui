import { GameMeta } from './GameMeta.model';
export class GameMetaResponseDto {
    status: boolean;
    message: string;
    content: GameMeta;
}
