import { ApplicationMeta } from './applicationMeta.model';

export class ApplicationMetaResponseDto {
    status: boolean;
    message: string;
    content: ApplicationMeta;
}
