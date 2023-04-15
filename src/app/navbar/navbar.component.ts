import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLogged : Boolean;
  constructor(
    private userService : UserService
  ){
    this.isLogged = userService.isLoggedIn()
  }

  logOut(){
    this.userService.logout()
    window.location.reload()
  }

}
