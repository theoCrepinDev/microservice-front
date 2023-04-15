import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../services/properties/properties.service';
import { Property } from '../objects/Property';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(
    private propertiesService : PropertiesService
  ){}

  properties : Property[] = []

  ngOnInit(): void {
    this.propertiesService.getProperties().subscribe(
      value => this.properties = value
    )
  }
}
