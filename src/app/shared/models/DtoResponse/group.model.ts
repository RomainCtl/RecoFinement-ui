import { Group } from '../group.model';
import { Invitation } from '../invitation.model';

export class GroupDtoResponse {
  status: boolean;
  message: string;
  group: Group[];
  errors: [x: string];
}



