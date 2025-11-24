export interface IEleve {
  id?: number;
  nom: string;
  prenom: string;
  dateNaissance?: string; // LocalDate → string Format YYYY-MM-DD
  telephone?: string;
  adresse?: string;
  email: string;
  serie: string;
  niveauEtude: string;
  lycee?: string;
  ville?: string;
  password?: string;
  passwordHash?: string;
  keycloakId?: string;
  user?: any; // ou IUser si tu as le modèle UserDTO
}

export class Eleve implements IEleve {
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
    public password?: string,
    public passwordHash?: string,
    public keycloakId?: string,
    public user?: any,
  ) {}
}
