import { Response } from '@angular/http';

export class User {

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
export class FetchUsersError extends HttpError {

}
