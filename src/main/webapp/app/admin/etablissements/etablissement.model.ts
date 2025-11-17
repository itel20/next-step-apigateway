export interface EtablissementDTO {
  id?: number;
  nom: string;
  type: string;
  classement: number;
  ville: string;
  pays: string;
  nombreEtudiants: number;
  nombreEnseignants: number;
  laboratoiresBibliotheques: string;

  filieresDisponibles: string;
  fraisScolarite: number;
  informationsPratiques: string;
  pointsBacRequis: string;
  processusAdmission: string;
  salaireMoyen: number;
  tauxAcceptation: number;
  tauxInsertion: number;
  tauxSelectivite: number;
  temoignages: string;
  vieEtudiante: string;
}
