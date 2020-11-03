import { TrackHistory } from './track-history-dto.model';

export class TrackHistoryResponseDto {
    status: boolean;
    message: string;
    content: TrackHistory[];
    number_of_elements: number;
    page: number;
    total_pages: number;
}
