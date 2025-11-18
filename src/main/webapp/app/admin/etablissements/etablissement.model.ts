export interface EtablissementDTO {
  id?: number; // facultatif pour la création
  nom: string;
  type: string;
  classement: number;
  ville: string;
  pays: string;
  nombreEtudiants: number;
  nombreEnseignants: number;
  laboratoiresBibliotheques: string;
  fraisScolarite: number;
  tauxSelectivite: number;
  filieresDisponibles: string[];
  processusAdmission: string;
  tauxAcceptation: number;
  pointsBacRequis: string;
  vieEtudiante: string;
  informationsPratiques: string;
  tauxInsertion: number;
  salaireMoyen: number;
  temoignages: string;
}
