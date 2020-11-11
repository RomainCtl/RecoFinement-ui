import { Member } from './member.model';
import { Invitation } from './invitation.model';
export class Group {
    name: string;
    group_id: number;
    members: Member[];
    owner: {
      uuid: string;
      email: string;
      username: string;
    };
}
