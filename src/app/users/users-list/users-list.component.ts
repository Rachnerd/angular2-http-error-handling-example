import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../shared/user.model';
import { Subscription } from 'rxjs';
import { UserStateService } from '../shared/user-state.service';

@Component({
    selector: 'eh-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {
    users: Array<User>;
    private subscriptions: Subscription;

    constructor(private state: UserStateService) {
        this.subscriptions = new Subscription();
    }

    ngOnInit(): void {
        const userSubscription = this.state.users$
            .subscribe(
                (users: Array<User>) => this.users = users
            );
        this.subscriptions.add(userSubscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
