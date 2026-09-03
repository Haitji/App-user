
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../model/user';
import { SharingData } from '../../services/sharing-data';
import { Router } from '@angular/router';


@Component({
    selector: 'user-form',
    imports: [FormsModule],
    templateUrl: './user-form.html',
    styleUrl: './user-form.css',
})
export class UserForm {

    user: User;


    constructor(private sharingData: SharingData, private router: Router) {
        if (this.router.currentNavigation()?.extras.state) {
            this.user =
                this.router.currentNavigation()?.extras.state!['userRow'];
                console.log("Llega");
                console.log(this.user);
        } else {
            this.user = {
                id: 0,
                name: '',
                lastname: '',
                email: '',
                username: '',
                password: ''
            };
        }

    }


    onSubmit(userForm: NgForm): void {
        if (userForm.valid) {
            this.sharingData.newUserEventEmitter.emit(this.user);
            console.log(this.user);
        }

    }

    cleanForm(userForm: NgForm): void {
        userForm.reset();
        userForm.resetForm();
    }

}
