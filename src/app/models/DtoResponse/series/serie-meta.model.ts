import { SerieMeta } from './SerieMeta.model';

export class SerieMetaResponseDto {
    status: boolean;
    message: string;
    content: SerieMeta;
}
