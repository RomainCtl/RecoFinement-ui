import { Genre } from './../../genre.model';
import { Track } from './../../track.model';
export class TrackResponseDto {
    status: boolean;
    message: string;
    content: Track[];
    number_of_elements: number;
    page: number;
    total_pages: number;
}
