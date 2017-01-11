import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../shared/user.service';
import { HttpError } from '../shared/user.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'eh-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {
    message: string;
    private subscriptions: Subscription;

    constructor(private userService: UserService) {
        this.subscriptions = new Subscription();
    }

    ngOnInit(): void {
        const errorSubscription = this.userService.error$
            .subscribe(
                (error: HttpError) => this.message = error.message
            );
        this.subscriptions.add(errorSubscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    clearError(): void {
        this.userService.clearError();
    }
}
