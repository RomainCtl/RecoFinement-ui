export class CreateGameDtoRequest {
  steamid: number = 0;
  name: string = "";
  short_description: string = "";
  header_image: string = "";
  website: string = "";
  developers: string = "";
  publishers: string = "";
  price: string = "";
  release_date: string = "";
  genres: number[] = [];
}
