import { Book } from './Book.model';

export class BookResponseDto {
    status: boolean;
    message: string;
    content: Book[];
    number_of_elements: 0;
    page: 0;
    total_pages: 0;
}