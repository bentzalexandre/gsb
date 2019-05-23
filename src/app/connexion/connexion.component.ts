import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.sass']
})
export class ConnexionComponent implements OnInit {

  login: string;
  password: string;
  estCache = true;
  lblMessage: string;
  visiteur: any;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
  }

  valider(): void {
    this.dataService.connexion(this.login, this.password).subscribe(
      (data) => { this.visiteur = data; this.dataService.visiteur = data; this.router.navigate(['accueil']); }
      , (error) => { this.estCache = false; this.lblMessage = 'Erreur : Identifiants incorrects'; }
    );
  }

}
