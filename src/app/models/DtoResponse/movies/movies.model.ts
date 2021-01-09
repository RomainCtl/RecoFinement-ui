import { Movie } from './Movie.model';

export class MovieResponseDto {
  status: boolean;
  message: string;
  content: Movie[];
  number_of_elements: number;
  page: number;
  total_pages: number;
}
