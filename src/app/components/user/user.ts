import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../model/user';
import Swal from 'sweetalert2'

@Component({
  selector: 'user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class UserComponent {

  @Input() users: User[] = [];

  @Output() userIdEventEmitter = new EventEmitter();
  @Output() userEventEmitter: EventEmitter<User> = new EventEmitter();



  deleteUser(id: number): void {
    Swal.fire({
  title: "Estas seguro?",
  text: "NO podras revertir el proceso despues de esto",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  cancelButtonText:"No eliminar",
  confirmButtonText: "Si eliminar"
}).then((result) => {
  if (result.isConfirmed){
    this.userIdEventEmitter.emit(id);
    Swal.fire({
    title: "Eliminado!",
    text: "Usuario eliminado con exito.",
    icon: "success"
  });
  } 
});
    // const confirmRemove = confirm("Estas seguro que quieres eliminar?");
    // if (confirmRemove) {
      
    // }
  }

  updateUser(userRow: User): void {
    this.userEventEmitter.emit(userRow);
  }
}
