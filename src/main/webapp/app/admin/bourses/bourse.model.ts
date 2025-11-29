export interface IBourseConcours {
  id: number | null;
  titre: string;
  type: string;
  typeBourse: string | null;
  nombreBeneficiaires: number;
  tauxAccepte: number | null;
  dateLimite: string;
  criteres: string[];
}

export class BourseConcours implements IBourseConcours {
  constructor(
    public id: number | null = null,
    public titre = '',
    public type = '',
    public typeBourse: string | null = null,
    public nombreBeneficiaires = 0,
    public tauxAccepte: number | null = null,
    public dateLimite: string = new Date().toISOString().split('T')[0],
    public criteres: string[] = [],
  ) {}
}
