export class User {
  uuid: string;
  email: string;
  username: string;
  groups: {
      name: string;
      owner: {
        uuid: string;
        email: string;
        username: string
      };
  };
  invitations: {
      name: string;
      owner: {
        uuid: string;
        email: string;
        username: string
      };
  };
  owned_groups: {
      name: string;
      owner: {
        uuid: string;
        email: string;
        username: string
      }
  };
}
