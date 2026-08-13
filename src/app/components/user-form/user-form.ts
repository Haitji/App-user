
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../model/user';


@Component({
    selector: 'user-form',
    imports: [FormsModule],
    templateUrl: './user-form.html',
    styleUrl: './user-form.css',
})
export class UserForm {

    @Input() user: User;

    @Input() open: boolean = false;

    @Output() openEventEmitter = new EventEmitter();

    constructor() {
        this.user = {
            id: 0,
            name: '',
            lastname: '',
            email: '',
            username: '',
            password: ''
        }
    }


    @Output() newUserEventEmmiter: EventEmitter<User> = new EventEmitter();


    onSubmit(userForm: NgForm): void {
        if (userForm.valid) {
            this.newUserEventEmmiter.emit(this.user);
            console.log(this.user);
        }

    }

    cleanForm(userForm: NgForm): void {
        userForm.reset();
        userForm.resetForm();
    }

    onOpen(): void{
        this.openEventEmitter.emit();
    }
}
