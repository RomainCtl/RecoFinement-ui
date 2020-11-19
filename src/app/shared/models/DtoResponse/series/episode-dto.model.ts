import { Episode } from './Episode.model';
import { Genre } from '../musics/Genre.model';

export class EpisodeDtoResponse {
    status: boolean;
    message: string;
    content: Episode[];
}
