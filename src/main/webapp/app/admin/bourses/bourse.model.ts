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
  favoris?: boolean | null; // optionnel = cohérent avec la classe
  pays: string;
}

export class BourseConcours implements IBourseConcours {
  constructor(
    public id: number | null = null,
    public titre = '',
    public type = '',
    public description = '',
    public montant = 0,
    public periodicite = '',
    public nombreBeneficiaires = 0,
    public tauxAcceptation = 0,
    public dateLimite: string = new Date().toISOString().split('T')[0],
    public criteresEligibilite: string[] = [''],
    public tags: string[] = [''],
    public conseilsPratiques = '',
    public favoris?: boolean | null, // ⬅ devient optionnel ici aussi
    public pays = '',
  ) {}
}
