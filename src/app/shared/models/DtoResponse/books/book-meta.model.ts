import { BookMeta } from './BookMeta.model';

export class BookMetaResponseDto {
    status: boolean;
    message: string;
    content: BookMeta;
}
