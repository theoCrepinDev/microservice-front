import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { Property } from 'src/app/objects/Property';
import { Reservation } from 'src/app/objects/Reservation';
import { PropertiesService } from 'src/app/services/properties/properties.service';
import { ReservationService } from 'src/app/services/reservations/reservation.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  constructor(
    private router: Router,
    private userService : UserService,
    private reservationService : ReservationService,
    private logementService : PropertiesService
  ){}

  properties : Property[]
  allProperties : Property[]
  reservations : Reservation[] = new Array()
  userReservation : Reservation[] = new Array()

  ngOnInit(): void {
    if(!this.userService.isLoggedIn()){

      this.router.navigate(['/user/login'])
    }
    this.logementService.getUserProperties().subscribe(
      success => {
        this.properties = success
        this.getReservations()
      }
    )
    this.logementService.getProperties().subscribe(
      success => {
        this.allProperties = success
      }
    )
    this.reservationService.getUserReservations().subscribe(
      success => {
        this.userReservation = success
        this.getReservations()
      }
    )
  }

  getRole() : string{
    var role = this.userService.getRole();
    if(role.includes("TENANT")){
      return "locataire"
    }
    if(role.includes("OWNER")){
      return "propriétaire"
    }
    return "autre"
  }
  switchRole(){
    var role = this.userService.getRole();

    if(role.includes("TENANT")){
       this.userService.switchRole(this.userService.getUsername(), "OWNER").subscribe(
        success => {
          this.logOut()
        }
       )
    }
    if(role.includes("OWNER")){
      this.userService.switchRole(this.userService.getUsername(), "TENANT").subscribe(
        success => {
          this.logOut()
        }
       )
    }
  }

  getLogementReservation(id : string ){
    this.reservationService.getLogementReservations(id)
    .subscribe(
      data => {
        for(let res of data.resevations){
          this.reservations.push(res)
        }
      }
    )
  }

  getReservations(){
    this.properties.forEach(p => {
      this.getLogementReservation(p.id)
    })

  }

  getLogementFromId(id : string){
    var res = ""
    this.properties.forEach(p => {
      if(p.id === id){
        res =  p.titre;
      }
    })
    return res;

  }

  getLogementFromIdAll(id : string){
    var res = ""
    this.allProperties.forEach(p => {
      if(p.id === id){
        res =  p.titre;
      }
    })
    return res;

  }

  alert(s :string){
    confirm(s)
  }

  logOut(){
    this.userService.logout()
    window.location.reload()
  }

  delReservation(res : Reservation){
    this.reservationService.deleteReservation(res).subscribe(
      success => window.location.reload()
    )
  }
}
