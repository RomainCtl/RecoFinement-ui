import { Group } from '../group.model';
import { Invitation } from '../invitation.model';
import { Member } from '../member.model';

export class InviteMemberDtoResponse {
    status: boolean;
    message: string;
    group: Group;
    members: Member[];
    invitations: Invitation[];
}



