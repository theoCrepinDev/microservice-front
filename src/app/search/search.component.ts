import { Component } from '@angular/core';
import { PropertiesService } from '../services/properties/properties.service';
import { Property } from '../objects/Property';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  titreSearch : string = "";
  villeToFilter : string = "";
  budgetToFilter : number = 0;
  constructor(
    private propertiesService : PropertiesService
  ){}

  properties : Property[] = []

  ngOnInit(): void {
    this.propertiesService.getProperties().subscribe(
      value => {
        value.map(p => p.isDisplayed =true)
        this.properties = value

      }
    )
  }
  findByTitle(){
    this.properties.map(p => {
      if(!p.titre.includes(this.titreSearch)){
        p.isDisplayed = false;
      }else{
        p.isDisplayed = true;
      }
    })

  }

  toDisplayProperties(){
    return this.properties.filter(p => p.isDisplayed === true)
  }


  villesFilter(){
    return new Set(this.properties.map(p => p.ville))
  }

  filterVille(){
    this.properties.map(p => {
      if(!p.ville.includes(this.villeToFilter)){
        p.isDisplayed = false;
      }else{
        p.isDisplayed = true;
      }
    })
  }

  budgetFilter(){
    this.properties.map(p => {
      if(p.prix >= this.budgetToFilter * 100){
        p.isDisplayed = false;
      }else{
        p.isDisplayed = true;
      }
    })
  }

  fullBudget(){
    this.properties.map(p => p.isDisplayed = true)
  }
}
