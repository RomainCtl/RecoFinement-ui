export class CreateMovieDtoRequest {
  title: string = "";
  language: string = "";
  actors: string = "";
  year: string = "";
  producers: string = "";
  director: string = "";
  writer: string = "";
  imdbid: string = "";
  tmdbid: string = "";
  cover: string = "";
  plot_outline: string = "";
  genres: number[] = [];
}
