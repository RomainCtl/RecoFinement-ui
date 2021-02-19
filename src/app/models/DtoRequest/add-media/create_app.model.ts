export class CreateApplicationDtoRequest {
  name: string = "";
  size: string = "";
  installs: string = "";
  type: string = "";
  price: string = "";
  content_rating: string = "";
  last_updated: string = "";
  current_version: string = "";
  android_version: string = "";
  cover: string = "";
  genres: number[] = []
}
