import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { UsersModule } from './users/users.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        AppComponent
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
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
