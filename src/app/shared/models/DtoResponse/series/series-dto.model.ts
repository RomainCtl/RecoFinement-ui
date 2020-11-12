import { Series } from './Series.model';
export class SeriesResponseDto {
    status: boolean;
    message: string;
    content: Series[];
    number_of_elements: number;
    page: number;
    total_pages: number;
}