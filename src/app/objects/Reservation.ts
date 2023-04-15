export class Reservation {
  id: string;
  idLogement: string;
  idUser: string;
  dateDebut: string;
  dateFin: string;
  nbrPersonnes: number;
  prix: number;
  status: string;

  constructor(id: string,
    idLogement: string,
    idUser: string,
    dateDebut: string,
    dateFin: string,
    nbrPersonnes: number,
    prix: number,
    status: string,){
      this.id = id;
      this.idLogement = idLogement;
      this.idUser = idUser;
      this.dateDebut = dateDebut;
      this.dateFin = dateFin;
      this.nbrPersonnes = nbrPersonnes;
      this.prix = prix;
      this.status = status;
    }
}
