import { Injectable } from '@angular/core';
import { User, HttpError, Empty } from './user.model';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable()
export class UserStateService {
    users$: Observable<Array<User>>;
    error$: Observable<HttpError | Empty>;
    isLoading$: Observable<boolean>;

    private errorSubject: ReplaySubject<HttpError | Empty>;
    private usersSubject: ReplaySubject<Array<User>>;
    private isLoadingSubject: ReplaySubject<boolean>;

    constructor() {
        this.errorSubject = new ReplaySubject<HttpError | Empty>(1);
        this.usersSubject = new ReplaySubject<Array<User>>(1);
        this.isLoadingSubject = new ReplaySubject<boolean>();

        this.error$ = this.errorSubject.asObservable();
        this.users$ = this.usersSubject.asObservable();
        this.isLoading$ = this.isLoadingSubject.asObservable();
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
