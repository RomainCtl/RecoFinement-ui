import { User } from './../user.model';
export class UserDtoResponse {
  status: boolean;
  message: string;
  user: User;
  errors: [x: string];
}
