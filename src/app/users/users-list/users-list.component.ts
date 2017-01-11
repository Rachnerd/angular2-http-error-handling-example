import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'eh-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {
    users: Array<User>;
    private subscriptions: Subscription;

    constructor(private userService: UserService) {
        this.subscriptions = new Subscription();
    }

    ngOnInit(): void {
        const userSubscription = this.userService.users$
            .subscribe(
                (users: Array<User>) => this.users = users
            );
        this.subscriptions.add(userSubscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
