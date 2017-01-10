import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './shared/user.service';
import { User } from './shared/user.model';

@Component({
    selector: 'eh-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
    users: Array<User>;

    constructor(private userService: UserService) {
        this.users = [];
    }

    ngOnInit() {
        this.userService.users$
            .subscribe(
                (users: Array<User>) => this.users = users
            );
        this.userService.error$
            .subscribe(
                res => console.log(res)
            );
        this.userService.fetchRandomUsers();
        this.userService.forceRandomUsersError();
    }

    public ngOnDestroy(): void {
    }
}
