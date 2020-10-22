import { ApplicationDto } from './applications/application.model';

export class ApplicationResponseDto {
  status: boolean;
  message: string;
  content: ApplicationDto[];
  number_of_elements: number;
  page: number;
  total_pages: number;
}
