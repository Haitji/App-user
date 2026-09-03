import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../model/user';

@Component({
  selector: 'navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  @Input() users: User[] = [];

}
