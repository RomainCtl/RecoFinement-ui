import { User } from 'src/app/shared/models/user.model';
import { Invitation } from './invitation.model';
import { Member } from './member.model';
export class Group {
    name: string;
    group_id: number;
    members: Member[];
    invitations: Invitation[];
    owner: User;
}
