export interface Filiere {
  id?: number;
  titre: string;
  domaine: string;
  descriptionFormation: string;
  difficulte: number;
  tauxEmploi: number;
  tauxSatisfaction: number;
  salaireMin: number;
  salaireMax: number;
  dureeFormation: number;
  ecoles: string[];
  debouches: string[];
  competences: string[];
  temoignages: string | null;
}
