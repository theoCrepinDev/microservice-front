import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username : string = "";
  password : string = "";
  email : string = "";
  constructor(
    private router: Router,
    private userService : UserService
  ){}

  ngOnInit(): void {
    if(this.userService.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }

  register(){
    this.userService.register(this.username, this.email, this.password).subscribe(sucess => {
        this.userService.setToken(sucess.token)
        this.userService.setUser(sucess.token)
        window.location.reload()
    },
    error => {
      console.log(error)
      alert(error.error.message)
    })
  }
}
