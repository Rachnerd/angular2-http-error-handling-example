import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './shared/user.service';

@Component({
    selector: 'eh-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
    constructor(private userService: UserService) {
    }

    ngOnInit() {
    }

    public ngOnDestroy(): void {
    }
}
