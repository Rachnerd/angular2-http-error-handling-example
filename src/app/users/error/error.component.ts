import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpError } from '../shared/user.model';
import { Subscription } from 'rxjs';
import { UserStateService } from '../shared/user-state.service';

@Component({
    selector: 'eh-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {
    error: HttpError;
    private subscriptions: Subscription;

    constructor(private state: UserStateService) {
        this.subscriptions = new Subscription();
    }

    ngOnInit(): void {
        const errorSubscription = this.state.httpError$
            .subscribe((error: HttpError) => {
                this.error = error
            });
        this.subscriptions.add(errorSubscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    clearError(): void {
        this.state.clearError();
    }
}
