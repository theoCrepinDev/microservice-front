import { PropertyOption } from "./PropertyOption";
import { PropertyPhoto } from "./PropertyPhoto";

export class Property {
  id: string;
  titre: string;
  nbrPieces: number;
  taille:number;
  nbrEtages : number;
  prix : number;
  description: string;
  adresse: string;
  codePostal:number;
  ville: string;
  pays: string;
  photos: Array<PropertyPhoto>;
  options : Array<PropertyOption>;
  isDisplayed : Boolean;

  constructor(id : string,
    titre:string,
    nbrPieces: number,
    taille:number,
    nbrEtages : number,
    prix : number,
    description: string,
    adresse: string,
    codePostal:number,
    ville: string,
    pays: string,
    photos: Array<PropertyPhoto>,
    options : Array<PropertyOption>){
    this.id = id;
    this.titre = titre;
    this.nbrPieces = nbrPieces;
    this.nbrEtages = nbrEtages;
    this.taille = taille;
    this.prix = prix;
    this.description = description;
    this.adresse = adresse;
    this.codePostal = codePostal;
    this.ville = ville;
    this.pays = pays;
    this.photos = photos;
    this.options = options;
    this.isDisplayed = true;
  }
}
