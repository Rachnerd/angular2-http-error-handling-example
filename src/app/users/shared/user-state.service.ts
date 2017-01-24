import { Injectable } from '@angular/core';
import { User, HttpError, Empty } from './user.model';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class UserStateService {
    users$: Observable<Array<User>>;
    error$: Observable<HttpError | Empty>;

    private errorSubject: ReplaySubject<HttpError | Empty>;
    private usersSubject: ReplaySubject<Array<User>>;

    constructor() {
        this.errorSubject = new ReplaySubject<HttpError | Empty>(1);
        this.usersSubject = new ReplaySubject<Array<User>>(1);
        this.error$ = this.errorSubject.asObservable();
        this.users$ = this.usersSubject.asObservable();
    }

    set users(users: Array<User>) {
        this.usersSubject.next(users);
    }

    set error(error: HttpError | Empty) {
        this.errorSubject.next(error);
    }
}
