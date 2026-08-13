import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../services/user-service';
import { UserComponent } from '../user/user';
import { UserForm } from '../user-form/user-form';
import Swal from 'sweetalert2';

@Component({
    selector: 'user-app',
    imports: [UserComponent, UserForm],
    templateUrl: './user-app.html',
    styleUrl: './user-app.css',
})
export class UserApp implements OnInit {



    title: string = "Hola mundo desde user app"

    users: User[] = [];

    userSelected!: User;

    open: boolean = false;

    constructor(private service: UserService) {
        this.cleanUser();
    }

    cleanUser(): void {
        this.userSelected = {
            id: 0,
            name: '',
            lastname: '',
            email: '',
            username: '',
            password: ''
        }
    }

    ngOnInit(): void {
        this.service.findAll().subscribe(a => {
            this.users = a;
        })
    }

    addUser(user: User) {
        const fecha: Date = new Date();
        const fechaNumero: number = fecha.getTime();
        if (user.id > 0) {
            this.users = this.users.map(u => {
                if (u.id == user.id) {
                    return { ...user };
                }
                return u;
            })
        } else {
            this.users = [... this.users, { ...user, id: fechaNumero }];
        }
        Swal.fire({
            icon: "success",
            title: "Guardado",
            text: "Usuario guardado con exito",
            showConfirmButton: false,
            timer: 1500
        });
        this.cleanUser();
    }

    removeUser(id: number): void {
        this.users = this.users.filter(u => u.id != id);
    }

    selectUser(userRow: User): void {
        this.userSelected = { ...userRow };
        this.setOpen();
    }

    switchOpen(): void {
        this.open = !this.open;
    }

    setOpen() {
        this.open = !this.open;
    }
}
