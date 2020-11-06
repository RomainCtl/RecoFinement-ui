export class UserDataDtoResponse {
  status: boolean;
  message: string;
  content: {
    uuid: string;
    email: string;
    username: string;
    preferences_defined: boolean;
  };
  number_of_elements: 0;
  page: 0;
  total_pages: 0;
  errors: [x: string];
}
