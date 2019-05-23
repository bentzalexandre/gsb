import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-medecins',
  templateUrl: './medecins.component.html',
  styleUrls: ['./medecins.component.sass']
})
export class MedecinsComponent implements OnInit {

  nomMedecin: string;
  estCacheMenu = true;
  lesMedecins: any;
  medecin: any;
  afficherRapports = false;
  afficherMedecin = false;
  lesRapports: any;
  afficherMessage = false;
  lblMessage = '';

  constructor(private dataService: DataService) { }

  derniersRapports() {
    this.afficherRapports = true;
    this.afficherMedecin = false;
    this.dataService.chargerRapports(this.medecin.id).subscribe((data) => {
      this.lesRapports = data;
    }, (error) => { }
    );
  }

  majMedecin(): void {
    this.afficherRapports = false;
    this.afficherMedecin = true;
    this.afficherMessage = false;

  }
  valider(): void {
    this.afficherMessage = true;
    this.afficherRapports = false;
    this.afficherMedecin = true;
    this.dataService.majMedecin(this.medecin.id, this.medecin.adresse, this.medecin.tel, this.medecin.specialitecomplementaire)
      .subscribe(
        () => {
          this.lblMessage = 'Mise à jour effectuée';
        }, () => { this.lblMessage = 'Mise à jour effectuée'; }
      );
  }

  charger(): void {
    this.dataService.chargerMedecins(this.nomMedecin)
      .subscribe(
        (data) => { this.lesMedecins = data; },
        (error) => { }
      );
  }

  selectionner(med): void {
    this.medecin = med;
    this.estCacheMenu = false;
    this.nomMedecin = this.medecin.nom + ' ' + this.medecin.prenom + ' dep:' + this.medecin.departement;
    this.lesMedecins = null;

  }

  ngOnInit() {
  }

}
