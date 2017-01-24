import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User, HttpError, FetchUsersError, UsersResponse, Empty } from './user.model';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UserService {
    /**
     * Exposed observable streams
     */
    users$: Observable<Array<User>>;
    error$: Observable<HttpError | Empty>;
    /**
     * Private producers/observables
     */
    private usersSubject: Subject<Array<User>>;
    private errorSubject: Subject<HttpError>;

    constructor(private http: Http) {
        this.usersSubject = new Subject<Array<User>>();
        this.users$ = this.usersSubject.asObservable();
        this.errorSubject = new Subject<HttpError>();
        this.error$ = this.errorSubject.asObservable();
    }

    fetchRandomUsers(): void {
        this.http.get('http://randomuser.me/api?results=4')
            .map((res: Response) => res.json())
            .map((res: UsersResponse) => res.results)
            .catch((error: Response) => Observable.throw(
                new FetchUsersError('Users fetch failed: ' + error.text()))
            )
            .subscribe(
                (users: Array<User>) => this.usersSubject.next(users),
                (error: HttpError) => this.errorSubject.next(error)
            );
    }

    /**
     * Force a Http error.
     */
    forceRandomUsersError(): void {
        this.http.get('http://randomuser.me/typo')
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(
                new FetchUsersError('Users fetch failed: ' + error.text()))
            )
            .subscribe(
                (users: Array<User>) => this.usersSubject.next(users),
                (error: HttpError) => this.errorSubject.next(error)
            );
    }
}
