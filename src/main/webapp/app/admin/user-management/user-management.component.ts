import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgIf } from '@angular/common';

interface User {
  id: number;
  nom: string;
  prenom: string;
  type: string;
  email: string;
  telephone: string;
  statut: string;
  dateInscription: string;
  serie: string;
  region: string;
}

@Component({
  selector: 'jhi-user-management',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, NgForOf],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export default class UserManagementComponent {
  searchTerm = '';
  filterType = 'all';
  selectedUser: User | null = null;

  mockUsers: User[] = [
    {
      id: 1,
      nom: 'Diop',
      prenom: 'Amadou',
      type: 'Bachelier',
      email: 'amadou.diop@email.sn',
      telephone: '+221 77 123 4567',
      statut: 'Actif',
      dateInscription: '2024-09-15',
      serie: 'S',
      region: 'Dakar',
    },
    {
      id: 2,
      nom: 'Ndiaye',
      prenom: 'Fatou',
      type: 'Bachelier',
      email: 'fatou.ndiaye@email.sn',
      telephone: '+221 76 234 5678',
      statut: 'Actif',
      dateInscription: '2024-09-18',
      serie: 'L',
      region: 'Thiès',
    },
    {
      id: 3,
      nom: 'Sall',
      prenom: 'Moussa',
      type: 'École',
      email: 'contact@ucad.sn',
      telephone: '+221 33 824 5678',
      statut: 'Actif',
      dateInscription: '2024-06-10',
      serie: '-',
      region: 'Dakar',
    },
    {
      id: 4,
      nom: 'Fall',
      prenom: 'Awa',
      type: 'Bachelier',
      email: 'awa.fall@email.sn',
      telephone: '+221 70 345 6789',
      statut: 'Suspendu',
      dateInscription: '2024-10-02',
      serie: 'G',
      region: 'Saint-Louis',
    },
    {
      id: 5,
      nom: 'Sy',
      prenom: 'Cheikh',
      type: 'Parent',
      email: 'cheikh.sy@email.sn',
      telephone: '+221 77 456 7890',
      statut: 'Actif',
      dateInscription: '2024-09-25',
      serie: '-',
      region: 'Kaolack',
    },
    {
      id: 6,
      nom: 'Sarr',
      prenom: 'Mame',
      type: 'Bachelier',
      email: 'mame.sarr@email.sn',
      telephone: '+221 76 567 8901',
      statut: 'Actif',
      dateInscription: '2024-10-12',
      serie: 'S',
      region: 'Ziguinchor',
    },
  ];

  get filteredUsers(): User[] {
    return this.mockUsers.filter(u => {
      const matchesSearch =
        u.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        u.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = this.filterType === 'all' || u.type === this.filterType;
      return matchesSearch && matchesType;
    });
  }

  openDetails(user: User): void {
    this.selectedUser = user;
  }

  closeDetails(): void {
    this.selectedUser = null;
  }
}
