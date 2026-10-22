import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../model/user';
import Swal from 'sweetalert2';
import { SharingData } from '../../services/sharing-data';

@Component({
  selector: 'app-auth.component',
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {

  user: User = {
    id: 0,
    name: '',
    lastname: '',
    email: '',
    username: '',
    password: ''
  };

  constructor(private sharingData: SharingData) {

  }

  onSubmit() {
    if (!this.user?.username || !this.user?.password) {
      Swal.fire(
        'Error de validacion',
        'Username y password requeridos',
        'error'
      );
    } else {
      this.sharingData.handlerLoginEventEmitter.emit({
        username: this.user.username,
        password: this.user.password
      })
    }
  }

}
