import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './shared/user.service';
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

    constructor(private router: Router,
                private route: ActivatedRoute,
                private userService: UserService,
                private state: UserStateService) {
        this.subscriptions = new Subscription();
    }

    ngOnInit(): void {
        this.initStateUpdate();
        this.initStateUpdateHandlers();
    }

    ngOnDestroy(): void {
        /**
         * Prevent memory leak by unsubscribing all hot streams.
         */
        this.subscriptions.unsubscribe();
    }

    fetch(): void {
        this.state.isLoading = true;
        setTimeout(() => {
            this.userService.fetchRandomUsers();
        }, 1000);
    }

    fetchError(): void {
        this.state.isLoading = true;
        setTimeout(() => {
            this.userService.forceRandomUsersError();
        }, 1000);
    }

    private initStateUpdate() {
        /**
         * Update users state and stop loading
         */
        const usersSubscription = this.userService.users$
            .do(() =>
                this.stopLoading()
            )
            .subscribe(users =>
                this.state.users = users
            );

        const errorSubscription = this.userService.error$
            .do(() =>
                this.stopLoading()
            )
            .subscribe(error =>
                this.state.error = error
            );

        this.subscriptions.add(usersSubscription);
        this.subscriptions.add(errorSubscription);
    }

    private stopLoading() {
        this.state.isLoading = false;
    }

    private initStateUpdateHandlers() {
        /**
         * Subscribe to users -> navigate to the list component
         * Subscribe to error instance of Empty -> navigate to the list component
         */
        const showListSubscription = this.state
            .users$
            .merge(this.state.clearError$)
            .subscribe(() =>
                this.router.navigate(['./list'], { relativeTo: this.route })
            );

        /**
         * Subscribe to Http errors -> navigate to the error component
         */
        const showErrorSubscription = this.state
            .httpError$
            .subscribe(error =>
                this.router.navigate(['./error'], { relativeTo: this.route })
            );
        /**
         * Subscribe to isLoading that is true -> navigate to the loading component
         */
        const showLoadingSubscription = this.state
            .startLoading$
            .subscribe(() =>
                this.router.navigate(['./loading'], { relativeTo: this.route })
            );
        /**
         * Combine all subscriptions
         */
        this.subscriptions.add(showListSubscription);
        this.subscriptions.add(showErrorSubscription);
        this.subscriptions.add(showLoadingSubscription);
    }
}
