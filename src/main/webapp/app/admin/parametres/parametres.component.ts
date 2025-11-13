import { Component } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface UserRole {
  id: number;
  nom: string;
  role: string;
  email: string;
  dernierAcces: string;
}
interface ActivityLog {
  id: number;
  action: string;
  utilisateur: string;
  date: string;
  statut: string;
}

@Component({
  selector: 'jhi-parametres',
  standalone: true,
  imports: [NgClass, NgForOf, FormsModule],
  templateUrl: './parametres.component.html',
  styleUrl: './parametres.component.scss',
})
export default class ParametresComponent {
  userRoles: UserRole[] = [
    { id: 1, nom: 'Abdou Kane', role: 'Super Admin', email: 'abdou.kane@nextstep.sn', dernierAcces: '2024-11-06 15:32' },
    { id: 2, nom: 'Mariama Diallo', role: 'Modérateur', email: 'mariama.diallo@nextstep.sn', dernierAcces: '2024-11-06 14:18' },
    { id: 3, nom: 'Omar Faye', role: 'Éditeur', email: 'omar.faye@nextstep.sn', dernierAcces: '2024-11-05 18:45' },
  ];

  activityLogs: ActivityLog[] = [
    { id: 1, action: "Création d'un nouvel établissement", utilisateur: 'Mariama Diallo', date: '2024-11-06 14:18', statut: 'Succès' },
    { id: 2, action: 'Validation de 15 orientations', utilisateur: 'Abdou Kane', date: '2024-11-06 13:45', statut: 'Succès' },
    { id: 3, action: "Ajout d'une nouvelle bourse", utilisateur: 'Omar Faye', date: '2024-11-06 12:22', statut: 'Succès' },
    { id: 4, action: "Tentative de suppression d'utilisateur", utilisateur: 'Omar Faye', date: '2024-11-06 11:15', statut: 'Échec' },
    { id: 5, action: 'Export base de données', utilisateur: 'Abdou Kane', date: '2024-11-05 16:30', statut: 'Succès' },
  ];

  darkMode = false;
  twoFactorAuth = true;
  sessionTimeout = true;
}
