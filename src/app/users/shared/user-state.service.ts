import { Injectable } from '@angular/core';
import { User, HttpError, Empty } from './user.model';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class UserStateService {
    users$: Observable<Array<User>>;
    httpError$: Observable<HttpError>;
    clearError$: Observable<Empty>;
    startLoading$: Observable<boolean>;

    private errorSubject: ReplaySubject<HttpError | Empty>;
    private usersSubject: ReplaySubject<Array<User>>;
    private isLoadingSubject: ReplaySubject<boolean>;

    constructor() {
        this.errorSubject = new ReplaySubject<HttpError | Empty>(1);
        this.usersSubject = new ReplaySubject<Array<User>>(1);
        this.isLoadingSubject = new ReplaySubject<boolean>();

        this.users$ = this.usersSubject.asObservable();

        this.httpError$ = this.errorSubject.asObservable()
            .filter((error: HttpError) => error instanceof HttpError) as Observable<HttpError>;

        this.clearError$ = this.errorSubject.asObservable()
            .filter((error: Empty) => error instanceof Empty) as Observable<Empty>;

        this.startLoading$ = this.isLoadingSubject
            .filter((isLoading: boolean) => isLoading === true);
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
}
