export class UserRegisterDtoResponse {
    message: string;
    status: boolean;
    user: {
        email: string;
        username: string;
        uuid: string;
    };
    access_token: string;
    errors: [x: string];
}
