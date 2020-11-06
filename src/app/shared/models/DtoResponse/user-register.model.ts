export class UserRegisterDtoResponse {
    message: string;
    status: boolean;
    user: {
        email: string;
        username: string;
        preferences_defined: boolean;
        uuid: string;
    };
    access_token: string;
    errors: [x: string];
}
