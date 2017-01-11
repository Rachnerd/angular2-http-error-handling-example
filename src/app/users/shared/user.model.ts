import { Response } from '@angular/http';

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
    message: string;

    constructor(response: Response) {
        this.message = response.text();
    }
}

export class EmptyHttpError extends HttpError {
    constructor() {
        super({ text: () => '' } as Response);
    }
}

export class FetchUsersError extends HttpError {
}
