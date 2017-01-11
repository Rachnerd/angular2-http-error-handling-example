import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './shared/user.service';
import { User, HttpError, EmptyHttpError } from './shared/user.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'eh-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
    users: Array<User>;
    private subscriptions: Subscription;

    constructor(private router: Router, private userService: UserService) {
        this.users = [];
        this.subscriptions = new Subscription();
    }

    ngOnInit(): void {
        const userSubscription = this.userService.users$
            .subscribe(
                (users: Array<User>) => this.router.navigate(['users', 'list'])
            );

        const errorSubscription = this.userService.error$
            .filter((error: HttpError) => error instanceof HttpError)
            .subscribe(
                () => this.router.navigate(['users', 'error'])
            );

        const clearErrorSubscription = this.userService.error$
            .skip(1)
            .filter((error: HttpError) => error instanceof EmptyHttpError)
            .subscribe(
                () => this.router.navigate(['users', 'list'])
            );

        this.subscriptions.add(userSubscription);
        this.subscriptions.add(errorSubscription);
        this.subscriptions.add(clearErrorSubscription);
    }

    ngOnDestroy(): void {
        // Prevents memory leaks while routing.
        this.subscriptions.unsubscribe();
    }

    fetch(): void {
        this.userService.fetchRandomUsers();
    }

    fetchError(): void {
        this.userService.forceRandomUsersError();
    }
}
