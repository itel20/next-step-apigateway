// ===================== ACTUALITÉS =====================
export interface Actu {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
}

// ===================== TÉMOIGNAGES =====================
export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  age: number;
  school: string;
  likes: number;
  comments: number;
  avatar: string;
}

// ===================== PUBLICATION (API) =====================
export interface Publication {
  id: number;
  content: string;
  createdAt?: string;
  authorType?: string;
  category?: string;
  image?: string;
}

// ===================== DISCUSSIONS =====================
// Réponse / commentaire
export interface Reply {
  id: number;
  user: string;
  comment: string;
  likes: number;
  time: string;
  replies?: Reply[];
}

// Topic principal (question)
export interface Topic {
  id: number;
  subject: string;
  user: string;
  comment: string;
  likes: number;
  certified: boolean;
  avatar: string;
  time: string;
  replies: Reply[];
  responses?: number;
  newReply: string;
}
