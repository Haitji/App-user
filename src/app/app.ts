import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { User } from './model/user';
import { UserService } from './services/user-service';
import Swal from 'sweetalert2';
import { SharingData } from './services/sharing-data';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Navbar],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App {
    protected readonly title = signal('5-user-app');

    users: User[] = [];

    userSelected!: User;

    constructor(private service: UserService, private sharingData: SharingData, private router: Router) {
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
        this.addUser();
        this.removeUser();
        this.findUserById();
        // this.selectUser();
    }

    findUserById() {
        this.sharingData.findUserByIdEventEmitter.subscribe(id => {
            const user = this.users.find(user => user.id == id);
            this.sharingData.selectUserEventEmitter.emit(user);
        })
    }

    addUser() {

        this.sharingData.newUserEventEmitter.subscribe(user => {

            if (user.id > 0) {
                this.service.updateUser(user).subscribe({
                    next: (userUpdate) => {
                        this.users = this.users.map(u => {
                            if (u.id == userUpdate.id) {
                                return { ...userUpdate };
                            }
                            return u;
                        })
                        Swal.fire({
                            icon: "success",
                            title: "Guardado",
                            text: "Usuario guardado con exito",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.router.navigate(['/users'], { state: { users: this.users } })
                    },
                    error: (err) => {
                        this.sharingData.errorsUserFormEventEmitter.emit(err.error);
                        console.log(err.error)
                    }
                });
            } else {
                this.service.createUser(user).subscribe({
                    next: (userNew) => {
                        this.users = [... this.users, { ...userNew }];
                        Swal.fire({
                            icon: "success",
                            title: "Guardado",
                            text: "Usuario guardado con exito",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.router.navigate(['/users'], { state: { users: this.users } })
                    },
                    error: (err) => {
                        this.sharingData.errorsUserFormEventEmitter.emit(err.error);
                        console.log(err.error)
                    }
                })
            }



        })

        this.cleanUser();
    }

    removeUser(): void {
        this.sharingData.userIdEventEmitter.subscribe(id => {
            this.service.removeUser(id).subscribe(() => {
                this.users = this.users.filter(u => u.id != id);
                this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
                    this.router.navigate(['/users'], { state: { users: this.users } })
                });
            });

        });

    }

    // selectUser(): void {
    //     this.sharingData.selectUserEventEmitter.subscribe(userRow => {
    //         this.userSelected = { ...userRow };
    //     })

    // }
}
