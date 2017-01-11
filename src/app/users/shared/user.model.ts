export class User {
    name: {
        title: string;
        first: string;
        last: string;
    };
    picture: {
        medium: string;
    }
}

export class UsersResponse {
    results: Array<User>;
}

export abstract class HttpError {
    constructor(public message: string) {
    }
}

export class Empty {
}

export class FetchUsersError extends HttpError {
}
