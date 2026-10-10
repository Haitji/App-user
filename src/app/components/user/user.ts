
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { User } from '../../model/user';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service';
import { SharingData } from '../../services/sharing-data';

@Component({
  selector: 'user',
  imports: [RouterLink],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class UserComponent implements OnInit {

  users: User[] = [];
  private cdr = inject(ChangeDetectorRef);

  title: string = "listado de usuarios";

  constructor(private router: Router, private service: UserService, private sharingData: SharingData) {
    if(this.router.currentNavigation()?.extras.state){
      this.users = this.router.currentNavigation()?.extras.state!['users'];
    }
  }

  ngOnInit(): void {
    if (this.users.length == 0 || this.users == null || this.users == undefined) {
      console.log("Consulta find all")
      this.service.findAll().subscribe(users => this.users = users);
      this.cdr.detectChanges();
    }

  }


  deleteUser(id: number): void {
    Swal.fire({
      title: "Estas seguro?",
      text: "NO podras revertir el proceso despues de esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No eliminar",
      confirmButtonText: "Si eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.sharingData.userIdEventEmitter.emit(id);

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
    //this.sharingData.selectUserEventEmitter.emit(userRow);
    this.router.navigate(['users/edit', userRow.id])
  }
}
