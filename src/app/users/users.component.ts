import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './shared/user.service';
import { HttpError, Empty } from './shared/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserStateService } from './shared/user-state.service';

@Component({
    selector: 'eh-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
    providers: [UserStateService]
})
export class UsersComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription;

    constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private state: UserStateService) {
        this.subscriptions = new Subscription();
    }

    ngOnInit(): void  {
        /**
         * Update state with new values fetched from the server.
         */
        const usersSubscription = this.userService.users$
            .subscribe(
                users => this.state.users = users
            );
        const errorSubscription = this.userService.error$
            .subscribe(
                error => this.state.error = error
            );
        /**
         * Subscribe to users and empty errors -> navigate to the list component
         */
        const showUsersSubscription = this.state
            .users$
            .merge(
                this.state.error$
                    .filter((error: Empty) => error instanceof Empty)
            )
            .subscribe(
                () => {
                    this.router.navigate(['./list'], {
                        relativeTo: this.route
                    });
                }
            );

        /**
         * Subscribe to Http errors -> navigate to the error component
         */
        const showErrorSubscription = this.state
            .error$
            .filter((error: HttpError) => error instanceof HttpError)
            .subscribe(
                error => {
                    this.router.navigate(['./error'], {
                        relativeTo: this.route
                    });
                }
            );

        // Example specific error subscription.
        // /**
        //  * Subscribe to fetch users error -> log a message
        //  */
        // const fetchErrorSubscription = this.userService.error$
        //     .filter((error: HttpError) => error instanceof FetchUsersError)
        //     .subscribe(
        //         () => console.error('Users fetch failed!')
        //     );

        /**
         * Combine all subscriptions
         */
        this.subscriptions.add(usersSubscription);
        this.subscriptions.add(errorSubscription);
        this.subscriptions.add(showUsersSubscription);
        this.subscriptions.add(showErrorSubscription);
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
