import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserStateService } from '../shared/user-state.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'eh-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {
    private subscriptions = new Subscription();

    constructor(private state: UserStateService) {
    }

    ngOnInit() {
        const userSubscription = this.state.user$
            .subscribe(
                user => alert('User created!')
            );
        this.subscriptions.add(userSubscription);
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    generateUser() {
        this.state.newUser = {isCreated: false};
    }

}
