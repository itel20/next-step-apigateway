export interface Filiere {
  id?: number; // optionnel si serveur génère l'ID
  titre: string;
  categorie: string;
  difficulte: 'Très élevée' | 'Élevée' | 'Moyenne' | 'Faible';
  tauxEmploi: number;
  satisfaction: number;
  salaireMoyen: number;
  dureeFormation: string;
  universites?: string[];
  debouches?: string[];
  competences?: string[];
  temoignages?: {
    nom: string;
    role: string;
    texte: string;
  };
}
