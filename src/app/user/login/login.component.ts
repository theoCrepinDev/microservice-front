import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  username : string = "";
  password : string = "";
  constructor(
    private router: Router,
    private userService : UserService
  ){}

  ngOnInit(): void {
    if(this.userService.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }

  login(){
    this.userService.login(this.username, this.password).subscribe(sucess => {
      console.log(sucess)
      if(sucess.isValid){
        this.userService.setToken(sucess.token)
        this.userService.setUser(sucess.token)
        window.location.reload()
      }else{
        alert("Vérifiez les informations de connexion ! ")
      }
    },
    error => {
      alert("Vérifiez les informations de connexion ! ")
    })
  }

}
