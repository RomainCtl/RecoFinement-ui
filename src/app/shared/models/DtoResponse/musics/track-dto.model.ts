import { Genre } from './Genre.model';
import { Track } from './Track.model';
export class TrackResponseDto {
    status: boolean;
    message: string;
    content: Track[];
    number_of_elements: number;
    page: number;
    total_pages: number;
}
