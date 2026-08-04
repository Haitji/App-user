import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    private users: User[] = [
        {
            id: 1,
            name: 'Carlos',
            lastname: 'García',
            email: 'carlos.garcia@example.com',
            username: 'cgarcia',
            password: '123456'
        },
        {
            id: 2,
            name: 'Laura',
            lastname: 'Martínez',
            email: 'laura.martinez@example.com',
            username: 'lmartinez',
            password: 'abcdef'
        },
        {
            id: 3,
            name: 'Daniel',
            lastname: 'López',
            email: 'daniel.lopez@example.com',
            username: 'dlopez',
            password: 'password123'
        }
    ]

    findAll(): Observable<User[]> {
        return of(this.users);
    }
}
