import { Application } from './application.model';

export class ApplicationResponseDto {
  status: boolean;
  message: string;
  content: Application[];
  number_of_elements: number;
  page: number;
  total_pages: number;
}
