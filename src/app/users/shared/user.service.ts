import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User, HttpError, FetchUsersError, UsersResponse } from './user.model';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UserService {
    users$: Observable<User>;
    error$: Observable<HttpError>;
    private usersSubject: Subject<User>;
    private errorSubject: Subject<HttpError>;

    constructor(private http: Http) {
        this.usersSubject = new Subject<User>();
        this.users$ = this.usersSubject.asObservable();
        this.errorSubject = new Subject<HttpError>();
        this.error$ = this.errorSubject.asObservable();
    }

    fetchRandomUsers(): void {
        this.http.get('http://randomuser.me/api')
            .map((res: Response) => res.json())
            .map((res: UsersResponse) => res.results)
            .subscribe(
                (users: Array<User>) => this.usersSubject.next(users),
                (error: Response) => this.errorSubject.next(new FetchUsersError(error))
            );
    }

    /**
     * To demonstrate the error stream.
     */
    forceRandomUsersError(): void {
        this.http.get('http://randomuser.me/typo')
            .map((res: Response) => res.json())
            .subscribe(
                (users: Array<User>) => this.usersSubject.next(users),
                (error: Response) => this.errorSubject.next(new FetchUsersError(error))
            );
    }
}
