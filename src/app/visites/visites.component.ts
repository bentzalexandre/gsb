import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-visites',
  templateUrl: './visites.component.html',
  styleUrls: ['./visites.component.sass']
})
export class VisitesComponent implements OnInit {

  gestionMajRapport = false;
  afficherRapport = false;
  gestionAjoutRapport = false;
  dateVisite: Date;
  lesRapports: any;
  titre = '';
  messageMAJ: string;
  nomMedecin: any;
  lesMedecins: any;
  rapport: any;
  medecin: any;
  motif: string;
  bilan: string;
  dateNouveauRapport: Date;
  nomMedicament: string;
  lesMedicaments: any;
  qtes: Array<number> = [1, 2, 3, 4, 5];
  qteSelect: string;
  medicamentsSelect: any = new Array();
  messageEnregistrement: string;
  medicament: any;

  constructor(private dataService: DataService) { }

  modifierRapport() {
    this.gestionMajRapport = true;
    this.gestionAjoutRapport = false;
  }

  initNouveauRapport() {
    this.nomMedecin = '';
  }
  ajouterRapport() {
    this.initNouveauRapport();
    this.gestionAjoutRapport = true;
    this.afficherRapport = false;
    this.gestionMajRapport = false;
  }

  chargerMedecins() {
    this.dataService.chargerMedecins(this.nomMedecin)
      .subscribe(
        (data) => { this.lesMedecins = data; },
        (error) => { }
      );
  }

  chargerVisites(): void {
    this.titre = 'Medecins visité(s) à ce jour';
    console.log(this.dataService.visiteur.id);
    console.log(this.dateVisite);
    this.dataService.chargerRapportsAuneDate(this.dataService.visiteur.id, this.dateVisite).subscribe(
      (data) => { this.lesRapports = data; }
      , (error) => { }
    );

  }

  selectionner(rapport) {
    this.rapport = rapport;
    this.afficherRapport = true;
    console.log(this.rapport);

  }

  valider() {
    this.dataService.majRapport(this.rapport.idRapport, this.rapport.motif, this.rapport.bilan).subscribe(
      () => { this.messageMAJ = 'Enregistrement effectué'; },
      () => { this.messageMAJ = 'Enregistremennt effectué'; });
  }
  selectionnerMedecin(medecin) {
    this.medecin = medecin;
    this.nomMedecin = this.medecin.nom + ' ' + this.medecin.prenom + ' dep:' + this.medecin.departement;
    this.lesMedecins = null;
  }

  enregistrer() {
    this.dataService.enregistrerRapport(this.dataService.visiteur.id, this.medecin.id, this.motif, this.dateNouveauRapport,
      this.bilan, this.medicamentsSelect).subscribe(
      () => { this.messageEnregistrement = 'Enregistrement effectué'; },
      () => { this.messageEnregistrement = 'Enregistremennt effectué'; });
  }
  ajouter() {
    this.medicamentsSelect.push({ nom: this.medicament.nomCommercial, qte: this.qteSelect });
    this.nomMedicament = '';

  }

  retirer() {
    this.medicamentsSelect.pop();
  }

  chargerMedicaments() {
    this.dataService.chargerMedicaments(this.nomMedicament).subscribe(
        (data) => { this.lesMedicaments = data; },
        (error) => { }
      );
  }

  choisirMedicament(medicament) {
    this.medicament = medicament;
    this.nomMedicament = this.medicament.nomCommercial;
    this.lesMedicaments = null;

  }
  ngOnInit() {
  }

}
