import { Genre } from '../musics/Genre.model';
export class Series {
    serie_id: number;
    imdbid: string;
    title: string;
    genre: Genre[];
    start_year: number;
    end_year: number;
    writers: string;
    directors: string;
    actors: string;
    cover: string;
    rating: number;
    rating_count: number;
    popularity_score: number;
}