import { TrackMeta } from './TrackMeta.model';

export class TrackMetaResponseDto {
    status: boolean;
    message: string;
    content: TrackMeta;
}
