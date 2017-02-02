import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { Observable } from 'rxjs';
import { UserStateService } from '../shared/user-state.service';

@Component({
    selector: 'eh-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
    users$: Observable<Array<User>>;

    constructor(private state: UserStateService) {
    }

    ngOnInit(): void {
        this.users$ = this.state.users$;
    }
}
