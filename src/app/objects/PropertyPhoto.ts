export class PropertyPhoto {
  id: string;
  lien: string;
  position: number;

  constructor(id : string, lien:string, position: number){
    this.id = id;
    this.lien = lien;
    this.position = position;
  }
}
