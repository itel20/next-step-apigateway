export interface Publication {
  id?: number;
  content: string;
  authorId: number;
  authorType: 'ETUDIANT' | 'CONSEILLER' | 'ADMIN';
  createdAt?: string;
}
