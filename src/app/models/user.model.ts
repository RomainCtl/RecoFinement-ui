import { Group } from './group.model';
import { Invitation } from './invitation.model';

export class User {
  uuid: string;
  email: string;
  username: string;
  groups: Group[];
  invitations: Invitation[];
  owned_groups: Group[];
  preferences_defined: boolean;
}
