import { Routes } from '@angular/router';
import { UserForm } from './components/user-form/user-form';
import { UserComponent } from './components/user/user';
import { AuthComponent } from './components/auth/auth.component';
import { authGuard } from './guards/auth-guard';
import { Forbidden403 } from './components/forbidden403/forbidden403';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/users'
    },
    {
        path: 'users',
        component: UserComponent,
    },
    {
        path: 'users/page/:page',
        component: UserComponent
    },
    {
        path: 'users/create',
        component: UserForm,
        canActivate:[authGuard]
    },
    {
        path: 'users/edit/:id',
        component: UserForm,
        canActivate:[authGuard]
    },
    {
        path: 'login',
        component: AuthComponent
    },
    {
        path:'forbidden',
        component: Forbidden403
    }
];
