import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './shared/user.service';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { ErrorComponent } from './error/error.component';
import { UserComponent } from './user/user.component';
import { LoadingComponent } from './loading/loading.component';
import { CreateComponent } from './create/create.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: 'users',
                component: UsersComponent,
                children: [
                    {
                        path: 'list',
                        component: UsersListComponent
                    },
                    {
                        path: 'error',
                        component: ErrorComponent
                    },
                    {
                        path: 'loading',
                        component: LoadingComponent
                    },
                    {
                        path: 'create',
                        component: CreateComponent
                    }
                ]
            }
        ])
    ],
    declarations: [
        UsersComponent,
        UsersListComponent,
        ErrorComponent,
        UserComponent,
        LoadingComponent,
        CreateComponent
    ],
    providers: [UserService]
})
export class UsersModule {
}
