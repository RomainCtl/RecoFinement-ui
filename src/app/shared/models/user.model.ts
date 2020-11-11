import { Group } from './group.model';

export class User {
  uuid: string;
  email: string;
  username: string;
  groups: Group[];
  invitations: Group[];
  owned_groups: Group[];
}
