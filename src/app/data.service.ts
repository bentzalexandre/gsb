import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
    private urlDomaine = 'http://localhost:8888/restGSB' ;
    visiteur: any;

  public connexion(loginIn: string, mdpIn: string) {
    const url: string = this.urlDomaine + '/connexion?login=' + loginIn + '&mdp=' + mdpIn;
    const req = this.http.get(url);
    return req;
  }
  public chargerMedecins(nomMedecin: string) {
      const url: string = this.urlDomaine + '/medecins?nom=' + nomMedecin;
      const req = this.http.get(url);
      return req;
  }
  public chargerRapports(idMedecin: number ) {
    const url: string = this.urlDomaine + '/rapports/' + idMedecin;
    const req = this.http.get(url);
    return req;
  }
  public majMedecin(id: string , adresse: string, tel: string, spe: string) {
    let url: string =  this.urlDomaine + '/majmedecin?idmedecin=' + id + '&adresse=';
    url += adresse + '&tel=' + tel + '&specialite=' + spe;
    const req = this.http
               .get(url);
    return req;
}
  public chargerRapportsAuneDate(idVisiteur: string, date: Date ) {
    const url: string =  this.urlDomaine + '/rapports_a_date?idVisiteur=' + idVisiteur + '&date=' + date;
    console.log(url);
    const req = this.http
          .get(url);
    return req;

}

  public majRapport(idRapport: string, motif: string, bilan: string) {
    let url: string =  this.urlDomaine + '/majrapport?idRapport=' + idRapport + '&motif=';
    url += motif + '&bilan=' + bilan;
    const req = this.http
               .get(url);
    return req;
}

public enregistrerRapport(idVisiteur: string, idMedecin: string, motif: string, date: Date, bilan: string, lesMedicaments: Array<any>  ) {
  let url: string =  this.urlDomaine + '/nouveaurapport?idVisiteur=' + idVisiteur + '&motif=';
  url += motif + '&bilan=' + bilan + '&idMedecin=' + idMedecin + '&date=' + date;
  lesMedicaments.forEach((med) => {url += '&medicaments[' + med.id + ']=' + med.qte; } );
  const req = this.http
                   .get(url);
  return req;

}

public chargerMedicaments(nom: string) {
  const url: string =  this.urlDomaine + '/medicaments?nom=' + nom;
  const req = this.http
          .get(url);
  return req;
}

}
