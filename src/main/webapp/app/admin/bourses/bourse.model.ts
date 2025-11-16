export interface IBourseConcours {
  id: number | null;
  titre: string;
  type: string;
  description: string;
  montant: number;
  periodicite: string;
  nombreBeneficiaires: number;
  tauxAcceptation: number;
  dateLimite: string;
  criteresEligibilite: string[];
  tags: string[];
  conseilsPratiques: string;
  favoris?: boolean | null; // facultatif
  pays: string;
}

export class BourseConcours implements IBourseConcours {
  constructor(
    public id: number | null = null,
    public titre = 'Titre non défini',
    public type = 'Bourse',
    public description = 'Description non définie',
    public montant = 0,
    public periodicite = 'Non définie',
    public nombreBeneficiaires = 0,
    public tauxAcceptation = 0,
    public dateLimite: string = new Date().toISOString().split('T')[0], // date du jour
    public criteresEligibilite: string[] = ['Non défini'],
    public tags: string[] = ['Aucun'],
    public conseilsPratiques = 'Aucun conseil disponible',
    public favoris: boolean | null = null, // facultatif
    public pays = 'Non défini',
  ) {}
}
