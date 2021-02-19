export class CreateSerieDtoRequest {
    title: string = "";
    imdbid: string = "";
    start_year: number = 0;
    end_year: number = 0;
    writers: string = "";
    directors: string = "";
    actors: string = "";
    cover: string = "";
    episodes: [
      {
        title: string;
        imdbid: string;
        year: number;
        season_number: number;
        episode_number: number;
        genres: number[];
      }
    ];
    genres: number[] = [];
}
