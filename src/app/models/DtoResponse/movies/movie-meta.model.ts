import { MovieMeta } from './MovieMeta.model';

export class MovieMetaResponseDto {
    status: boolean;
    message: string;
    content: MovieMeta;
}
