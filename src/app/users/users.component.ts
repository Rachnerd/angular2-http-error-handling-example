import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './shared/user.service';
import { User, HttpError, FetchUsersError, Empty } from './shared/user.model';
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
        /**
         * Subscribe to users -> navigate to the list component
         */
        const userSubscription = this.userService.users$
            .subscribe(
                (users: Array<User>) => this.router.navigate(['users', 'list'])
            );

        /**
         * Subscribe to Http errors -> navigate to the error component
         */
        const errorSubscription = this.userService.error$
            .filter((error: HttpError) => error instanceof HttpError)
            .subscribe(
                () => this.router.navigate(['users', 'error'])
            );

        /**
         * Subscribe to fetch users error -> log a message
         */
        const fetchErrorSubscription = this.userService.error$
            .filter((error: HttpError) => error instanceof FetchUsersError)
            .subscribe(
                () => console.error('Users fetch failed!')
            );

        /**
         * Subscribe to empty Http errors -> skip  -> navigate to the list component
         */
        const clearErrorSubscription = this.userService.error$
            .skip(1)
            .filter((error: HttpError) => error instanceof Empty)
            .subscribe(
                () => this.router.navigate(['users', 'list'])
            );

        /**
         * Combine all subscriptions
         */
        this.subscriptions.add(userSubscription);
        this.subscriptions.add(errorSubscription);
        this.subscriptions.add(fetchErrorSubscription);
        this.subscriptions.add(clearErrorSubscription);
    }

    ngOnDestroy(): void {
        /**
         * Prevent memory leak by unsubscribing all hot streams.
         */
        this.subscriptions.unsubscribe();
    }

    fetch(): void {
        this.userService.fetchRandomUsers();
    }

    fetchError(): void {
        this.userService.forceRandomUsersError();
    }
}
