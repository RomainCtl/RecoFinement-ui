export class Group {
    name: string;
    group_id: number;
    owner: {
      uuid: string;
      email: string;
      username: string;
    };
}
