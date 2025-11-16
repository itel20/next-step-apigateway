export interface BourseConcours {
  id?: number;
  titre: string;
  type: string;
  montant: number;
  periodicite: string;
  nombreBeneficiaires: number;
  tauxAcceptation: number;
  dateLimite: string; // format ISO
  criteresEligibilite: string[];
  tags: string[];
  conseilsPratiques: string;
  favoris: boolean;
}
