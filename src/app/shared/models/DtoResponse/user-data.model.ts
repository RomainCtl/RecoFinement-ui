import { User } from 'src/app/shared/models/user.model';
export class UserDataDtoResponse {
  status: boolean;
  message: string;
  content: {
    uuid: string;
    email: string;
    username: string;
  };
  number_of_elements: 0;
  page: 0;
  total_pages: 0;
  errors: [x: string];
}
