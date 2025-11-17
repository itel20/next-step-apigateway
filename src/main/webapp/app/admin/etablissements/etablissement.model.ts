export interface EtablissementDTO {
  id?: number;
  nom: string;
  type: string;
  ville: string;
  pays: string;
  classement: number;
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
