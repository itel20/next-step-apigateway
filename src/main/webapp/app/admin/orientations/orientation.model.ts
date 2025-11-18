export interface Temoignage {
  nom: string;
  role: string;
  texte: string;
}

export interface Filiere {
  id?: number;
  titre: string;
  categorie: string;
  descriptionDetaillee: string;
  difficulte: string;
  tauxEmploi: number;
  satisfaction: number;
  salaireMoyen: number;
  dureeFormation: string;
  universites: string[];
  debouches: string[];
  competences: string[];
  temoignages: Temoignage;
}
