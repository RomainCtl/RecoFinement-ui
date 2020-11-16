export class Movie {
  rating_count: number;
  producers: string;
  actors: string;
  rating: number;
  cover: string;
  language: string;
  movie_id: number;
  popularity_score: number;
  writer: string;
  director: string;
  title: string;
  genres: [{
    count: number;
    name: string;
    genre_id: number;
  }];
  tmdbid: number;
  year: number;
  imdbid: number;
  plot_outline: string;
}
