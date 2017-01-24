import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { UsersModule } from './users/users.module';
import { RouterModule } from '@angular/router';
import { UserService } from './users/shared/user.service';
import { TestComponent } from './test/test.component';

@NgModule({
    declarations: [
        AppComponent,
        TestComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'users'
            }
        ]),
        UsersModule
    ],
    providers: [UserService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
