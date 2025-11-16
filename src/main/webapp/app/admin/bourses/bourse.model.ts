export interface IBourseConcours {
  id: number | null;
  titre: string;
  type?: string | null;
  description?: string | null;
  montant?: number | null;
  periodicite?: string | null;
  nombreBeneficiaires?: number | null;
  tauxAcceptation?: number | null;
  dateLimite?: string | null;
  criteresEligibilite?: string[] | null;
  tags?: string[] | null;
  conseilsPratiques?: string | null;
  favoris?: boolean | null;
  pays?: string | null;
}

export class BourseConcours implements IBourseConcours {
  constructor(
    public id: number | null = null,
    public titre = '',
    public type: string | null = null,
    public description: string | null = null,
    public montant: number | null = null,
    public periodicite: string | null = null,
    public nombreBeneficiaires: number | null = null,
    public tauxAcceptation: number | null = null,
    public dateLimite: string | null = null,
    public criteresEligibilite: string[] | null = null,
    public tags: string[] | null = null,
    public conseilsPratiques: string | null = null,
    public favoris: boolean | null = null,
    public pays: string | null = null,
  ) {}
}
