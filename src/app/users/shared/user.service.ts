import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User, HttpError, FetchUsersError, UsersResponse, EmptyHttpError } from './user.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {
    users$: Observable<Array<User>>;
    error$: Observable<HttpError>;
    private usersSubject: BehaviorSubject<Array<User>>;
    private errorSubject: BehaviorSubject<HttpError>;

    constructor(private http: Http) {
        this.usersSubject = new BehaviorSubject<Array<User>>([]);
        this.users$ = this.usersSubject.asObservable();
        this.errorSubject = new BehaviorSubject<HttpError>(new EmptyHttpError());
        this.error$ = this.errorSubject.asObservable();
    }

    fetchRandomUsers(): void {
        this.http.get('http://randomuser.me/api?results=4')
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

    clearError(): void {
        this.errorSubject.next(new EmptyHttpError());
    }
}
