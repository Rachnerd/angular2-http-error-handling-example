import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User, HttpError, FetchUsersError, UsersResponse, Empty, CreateUserError } from './user.model';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UserService {
    /**
     * Exposed observable streams
     */
    users$: Observable<Array<User>>;
    user$: Observable<User>;
    error$: Observable<HttpError | Empty>;
    /**
     * Private producers/observables
     */
    private usersSubject: Subject<Array<User>>;
    private userSubject: Subject<User>;
    private errorSubject: Subject<HttpError>;

    constructor(private http: Http) {
        this.usersSubject = new Subject<Array<User>>();
        this.users$ = this.usersSubject.asObservable();
        this.userSubject = new Subject<User>();
        this.user$ = this.userSubject.asObservable();
        this.errorSubject = new Subject<HttpError>();
        this.error$ = this.errorSubject.asObservable();
    }

    fetchRandomUsers(): void {
        this.http.get('http://randomuser.me/api?results=4')
            .map((res: Response) => res.json())
            .map((res: {results: Array<User>}) => res.results)
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

    generateUser(): void {
        this.http.get('http://randomuser.me/api')
            .map((res: Response) => res.json())
            .map((res: UsersResponse) => res.results)
            .map((users: Array<User>) => users[0])
            .map((user: User) => {
                user.isCreated = true;
                return user;
            })
            .catch((error: Response) => Observable.throw(
                new CreateUserError('Users fetch failed: ' + error.text()))
            )
            .subscribe(
                (user: User) => this.userSubject.next(user),
                (error: HttpError) => this.errorSubject.next(error)
            );
    }
}
