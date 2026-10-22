
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { User } from '../../model/user';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service';
import { SharingData } from '../../services/sharing-data';
import { PaginatorComponent } from '../paginator-component/paginator-component';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'user',
  imports: [RouterLink,PaginatorComponent],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class UserComponent implements OnInit {

  users: User[] = [];
  paginator: any = {};
  pageUrl: string= '/users/page'
  private cdr = inject(ChangeDetectorRef);

  title: string = "listado de usuarios";

  constructor(private router: Router, private service: UserService, private sharingData: SharingData, private route: ActivatedRoute, private authService:AuthService) {
    if (this.router.currentNavigation()?.extras.state) {
      this.users = this.router.currentNavigation()?.extras.state!['users'];
      this.paginator = this.router.currentNavigation()?.extras.state!['paginator'];
    }
  }

  ngOnInit(): void {

    console.log("Consulta find all");
    this.route.paramMap.subscribe(params => {
      const page = +(params.get('page') || 0);
      console.log(page)
      this.service.findAllPageable(page).subscribe(pageable => {
        this.users = pageable.content as User[];
        this.paginator = pageable;
        this.sharingData.pageUserEventEmitter.emit({users: this.users, paginator: this.paginator});
        this.cdr.detectChanges();
      })

    });




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

  get admin(){
    return this.authService.isAdmin();
  }
}
