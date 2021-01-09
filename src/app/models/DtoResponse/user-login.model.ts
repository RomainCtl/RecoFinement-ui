export class UserLoginDtoResponse {
    status: boolean;
    message: string;
    user: {
        username: string;
        uuid: string;
        email: string;
        preferences_defined: boolean;
    };
    access_token: string;
    errors: [x: string];
}
