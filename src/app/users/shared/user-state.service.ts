import { Injectable } from '@angular/core';
import { User, HttpError, Empty } from './user.model';
import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs';

@Injectable()
export class UserStateService {
    users$: Observable<Array<User>>;
    rawUser$: Observable<User>;
    user$: Observable<User>;
    httpError$: Observable<HttpError>;
    clearError$: Observable<Empty>;
    startLoading$: Observable<boolean>;

    private usersSubject: BehaviorSubject<Array<User>>;
    private newUserSubject: ReplaySubject<User>;
    private errorSubject: ReplaySubject<HttpError | Empty>;
    private isLoadingSubject: ReplaySubject<boolean>;

    constructor() {
        this.usersSubject = new BehaviorSubject<Array<User>>([]);
        this.newUserSubject = new ReplaySubject<User>(1);
        this.errorSubject = new ReplaySubject<HttpError | Empty>(1);
        this.isLoadingSubject = new ReplaySubject<boolean>();


        this.rawUser$ = this.newUserSubject.asObservable()
            .filter((user: User) => !user.isCreated);

        this.user$ = this.newUserSubject.asObservable()
            .filter((user: User) => user.isCreated);

        this.users$ = this.usersSubject.asObservable();

        this.httpError$ = this.errorSubject.asObservable()
            .filter((error: HttpError) => error instanceof HttpError) as Observable<HttpError>;

        this.clearError$ = this.errorSubject.asObservable()
            .filter((error: Empty) => error instanceof Empty) as Observable<Empty>;

        this.startLoading$ = this.isLoadingSubject
            .filter((isLoading: boolean) => isLoading);
    }

    set users(users: Array<User>) {
        this.usersSubject.next(users);
    }

    set error(error: HttpError | Empty) {
        this.errorSubject.next(error);
    }

    set isLoading(isLoading: boolean) {
        this.isLoadingSubject.next(isLoading);
    }

    set newUser(newUser: {}) {
        this.newUserSubject.next(newUser as User);
    }

    clearError() {
        this.error = new Empty();
    }

    pushUser(user: User) {
        this.users = [user, ...this.usersSubject.getValue()];
    }
}
