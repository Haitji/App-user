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
        this.selectUser();
    }

    addUser() {

        this.sharingData.newUserEventEmitter.subscribe(user => {
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
            this.router.navigate(['/users'], {
                state: {
                    users: this.users
                }
            })
            Swal.fire({
                icon: "success",
                title: "Guardado",
                text: "Usuario guardado con exito",
                showConfirmButton: false,
                timer: 1500
            });
        })

        this.cleanUser();
    }

    removeUser(): void {
        this.sharingData.userIdEventEmitter.subscribe(id => {
            this.users = this.users.filter(u => u.id != id);
            this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
            this.router.navigate(['/users'], {
                state: {
                    users: this.users
                }
            })
        });
        });
        
    }

    selectUser(): void {
        this.sharingData.selectUserEventEmitter.subscribe(userRow => {
            this.userSelected = { ...userRow };
        })

    }
}
