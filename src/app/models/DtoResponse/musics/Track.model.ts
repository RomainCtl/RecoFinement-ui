import { Genre } from './Genre.model';
export class Track {
    content_id: number;
    track_id: number;
    title: string;
    year: number;
    artist_name: string;
    release: string;
    track_mmid: string;
    recording_mbid: string;
    language: string;
    rating: number;
    genres: Genre[];
    rating_count: number;
    spotify_id: string;
    url: string;
    covert_art_url: string;
    reco_score: number;
    reco_engine: string;
    popularity_score: number;
}
