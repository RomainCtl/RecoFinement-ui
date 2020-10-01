export class UserLoginDtoResponse {
    status: boolean;
    message: string;
    user: {
        username: string;
        uuid: string;
        email: string;
    };
    access_token: string;
    errors: [x: string];
}
