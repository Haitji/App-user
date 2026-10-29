import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { User } from './model/user';
import { UserService } from './services/user-service';
import Swal from 'sweetalert2';
import { SharingData } from './services/sharing-data';
import { AuthService } from './services/auth-service';
import { Store } from '@ngrx/store';
import { add, find, findAll, remove, setPaginator, update } from './store/users.actions';


@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Navbar],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App {
    protected readonly title = signal('5-user-app');

    users: User[] = [];
    paginator: any = {};
    user!: User;

    userSelected!: User;

    constructor(private service: UserService,
         private sharingData: SharingData, 
         private router: Router, 
         private route: ActivatedRoute, 
         private authService: AuthService,
         private store: Store<{users:any}>
        ) {
        this.cleanUser();
        this.store.select('users').subscribe(state =>{
            this.users = state.users,
            this.paginator = state.paginator,
            this.user =state.user
        })
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

    pageUsersEvent() {
        this.sharingData.pageUserEventEmitter.subscribe(paginable => {
            //this.users = paginable.users;
            //this.paginator = paginable.paginator;
            this.store.dispatch(findAll({users: paginable.users}));
            this.store.dispatch(setPaginator({paginator: paginable.paginator}));
        })
    }

    ngOnInit(): void {
        // this.route.paramMap.subscribe(params => {
        //     const page = +(params.get('page') || 0);
        //     this.service.findAllPageable(page).subscribe(pageable => {
        //         this.users = pageable.content as User[];
        //     })
        // });

        this.addUser();
        this.removeUser();
        this.findUserById();
        this.handlerLogin();
        // this.selectUser();
    }

    findUserById() {
        this.sharingData.findUserByIdEventEmitter.subscribe(id => {
            //const user = this.users.find(user => user.id == id);
            this.store.dispatch(find({id}));
            this.sharingData.selectUserEventEmitter.emit(this.user);
        })
    }

    handlerLogin() {
        this.sharingData.handlerLoginEventEmitter.subscribe(({ username, password }) => {
            console.log(username + " ---- " + password);
            this.authService.loginUser({ username, password }).subscribe({
                next: respose => {
                    const token = respose.token;
                    console.log("token: "+token);
                    const payload = this.authService.getPayload(token);
                    console.log(payload);
                    const user = {username: payload.sub}
                    const login = {
                        user,
                        isAuth: true,
                        isAdmin: payload.isAdmin
                    }
                    this.authService.token=token;
                    this.authService.user = login;
                    this.router.navigate(['/users'], { state: { users: this.users, paginator: this.paginator } })
                },
                error: error => {
                    if(error.status == 401){
                        console.log(error);
                        Swal.fire("Error en el login", error.error.message, "error");
                    }else{
                        throw error;
                    }
                }
            })
        })
    }

    addUser() {

        this.sharingData.newUserEventEmitter.subscribe(user => {

            if (user.id > 0) {
                this.service.updateUser(user).subscribe({
                    next: (userUpdate) => {
                        // this.users = this.users.map(u => {
                        //     if (u.id == userUpdate.id) {
                        //         return { ...userUpdate };
                        //     }
                        //     return u;
                        // })
                        this.store.dispatch(update({userUpdate}));
                        Swal.fire({
                            icon: "success",
                            title: "Guardado",
                            text: "Usuario guardado con exito",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.router.navigate(['/users'], { state: { users: this.users, paginator: this.paginator } })
                    },
                    error: (err) => {
                        this.sharingData.errorsUserFormEventEmitter.emit(err.error);
                        console.log(err.error)
                    }
                });
            } else {
                this.service.createUser(user).subscribe({
                    next: (userNew) => {
                        //this.users = [... this.users, { ...userNew }];
                        this.store.dispatch(add({userNew}));
                        Swal.fire({
                            icon: "success",
                            title: "Guardado",
                            text: "Usuario guardado con exito",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.router.navigate(['/users'], { state: { users: this.users, paginator: this.paginator } })
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
                //this.users = this.users.filter(u => u.id != id);
                this.store.dispatch(remove({id}));
                this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
                    this.router.navigate(['/users'], { state: { users: this.users, paginator: this.paginator } })
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
