export interface IUser {
  type?: string;
  statut?: 'Actif' | 'Suspendu';
}

export interface IEleve {
  id?: number;
  nom: string;
  prenom: string;
  dateNaissance?: string;
  telephone?: string;
  adresse?: string;
  email: string;
  serie: string;
  niveauEtude: string;
  lycee?: string;
  ville?: string;
  keycloakId?: string;
  user?: IUser | null;
}

export interface IEleve {
  id?: number;
  nom: string;
  prenom: string;
  dateNaissance?: string;
  telephone?: string;
  adresse?: string;
  email: string;
  serie: string;
  niveauEtude: string;
  lycee?: string;
  ville?: string;
  keycloakId?: string;
  user?: IUser | null;
  password?: string;
  // ⚠️ on ne met pas password ici pour éviter de l’exposer côté back
}

export class Eleve implements IEleve {
  password?: string; // uniquement pour le formulaire
  constructor(
    public id?: number,
    public nom = '',
    public prenom = '',
    public dateNaissance?: string,
    public telephone?: string,
    public adresse?: string,
    public email = '',
    public serie = '',
    public niveauEtude = '',
    public lycee?: string,
    public ville?: string,
    public keycloakId?: string,
    public user: IUser | null = { type: '', statut: 'Actif' },
  ) {}
}
