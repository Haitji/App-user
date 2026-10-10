
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../model/user';
import { SharingData } from '../../services/sharing-data';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user-service';


@Component({
    selector: 'user-form',
    imports: [FormsModule],
    templateUrl: './user-form.html',
    styleUrl: './user-form.css',
})
export class UserForm implements OnInit {

    user: User;
    private cdr = inject(ChangeDetectorRef);
    errors: any = {};


    constructor(private sharingData: SharingData, private route: ActivatedRoute, private service: UserService) {
        // if (this.router.currentNavigation()?.extras.state) {
        //     this.user =
        //         this.router.currentNavigation()?.extras.state!['userRow'];
        //     console.log("Llega");
        //     console.log(this.user);
        // } else {
        //     this.user = {
        //         id: 0,
        //         name: '',
        //         lastname: '',
        //         email: '',
        //         username: '',
        //         password: ''
        //     };
        // }
        this.user = {
            id: 0,
            name: '',
            lastname: '',
            email: '',
            username: '',
            password: ''
        };
    }

    ngOnInit(): void {

        // this.sharingData.selectUserEventEmitter.subscribe(user=>{
        //     this.user = user;
        // })
        this.sharingData.errorsUserFormEventEmitter.subscribe(errors => this.errors)
        this.route.paramMap.subscribe(params => {
            const id: number = +(params.get('id') || '0');

            if (id > 0) {
                //this.sharingData.findUserByIdEventEmitter.emit(id);
                this.service.findByUser(id).subscribe(user => {
                    this.user = user;
                    this.cdr.detectChanges();
                });
            }
        })
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
