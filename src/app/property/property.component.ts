import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertiesService } from '../services/properties/properties.service';
import { Property } from '../objects/Property';
import { PropertyOption } from '../objects/PropertyOption';
import { PropertyPhoto } from '../objects/PropertyPhoto';
import { Reservation } from '../objects/Reservation';
import { UserService } from '../services/user/user.service';
import { ReservationService } from '../services/reservations/reservation.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private propertyService : PropertiesService,
    private userService : UserService,
    private reservationService : ReservationService) {
      var option = new PropertyOption("", "")
      var photo = new PropertyPhoto("","",0)
      this.property = new Property("", "", 0,0,0,0,"", "", 0, "", "",[photo],[option])
    }
  property : Property;
  id : string = ""
  reservation : Reservation;

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.id = params['id'];
        this.propertyService.getPropertyById(params['id']).subscribe(
          success =>{
            this.property = success
            console.log(this.property);
            this.reservation = new Reservation("", this.property.id,this.userService.getUserId(), Date.now().toString(), Date.now().toString(), 0, 0, "PENDING")
          },
          error => this.router.navigate(['/'])
        )
      }
    );
  }

  reservationUpdate(){

    var diff = Math.abs((new Date(this.reservation.dateFin)).getTime() - (new Date(this.reservation.dateDebut)).getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    this.reservation.prix = this.property.prix * diffDays;
  }

  postReservation(){
    this.reservationService.postReservation(this.reservation).subscribe(
      success => {
        alert("Réservation effectuée !")
        this.router.navigate(['/']);
      },
      error => {
        if(error.error){
        alert(error.error.message)
        }else{
          alert("Veuillez vous connecter")
          this.router.navigate(['/user/login'])
        }
      }
    )
  }
}
