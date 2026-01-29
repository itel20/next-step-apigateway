import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PublicationService } from './publication.service';
import { Actu, Topic, Testimonial, Publication, Reply } from './publication.model';

@Component({
  selector: 'jhi-actus',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actus.component.html',
  styleUrls: ['./actus.component.scss'],
})
export class ActusComponent implements OnInit {
  actusEvents: Actu[] = [];
  topics: Topic[] = [];
  allTestimonials: Testimonial[] = [];

  visibleTestimonials = 3;
  newQuestion = '';

  likedTopics = new Set<number>();
  likedReplies = new Set<number>();
  likedTestimonials = new Set<number>();

  constructor(private publicationService: PublicationService) {}

  ngOnInit(): void {
    this.loadActus();
    this.loadTopics();
    this.loadTestimonials();
    this.loadLikes();
  }

  // ===================== ACTUALITÉS =====================
  loadActus(): void {
    this.publicationService.getAll().subscribe({
      next: (data: Publication[]) => {
        this.actusEvents = data.map((pub, index) => {
          const createdAt = pub.createdAt ? new Date(pub.createdAt) : new Date();
          return {
            id: pub.id || index + 1,
            title: String(pub.content).slice(0, 30) + (pub.content.length > 30 ? '…' : ''),
            description: String(pub.content),
            date: createdAt.toLocaleDateString('fr-FR'),
            category: pub.authorType === 'ETUDIANT' ? 'Actualité' : 'Événement',
            image: pub.image ?? 'https://via.placeholder.com/400x200',
          };
        });
      },
      error: err => console.error('Erreur chargement actus', err),
    });
  }

  // ===================== DISCUSSIONS =====================
  loadTopics(): void {
    // Charger depuis le localStorage si présent
    const savedTopics = localStorage.getItem('topics');
    if (savedTopics) {
      this.topics = JSON.parse(savedTopics);
    }

    this.publicationService.getAll().subscribe({
      next: (data: Publication[]) => {
        const apiTopics: Topic[] = data.map((pub, index): Topic => {
          const createdAt = pub.createdAt ? new Date(pub.createdAt) : new Date();

          return {
            id: pub.id || index + 1,
            subject: String(pub.content).slice(0, 30) + (pub.content.length > 30 ? '…' : ''),
            comment: String(pub.content),
            user: pub.authorType === 'ETUDIANT' ? 'Étudiant' : pub.authorType === 'CONSEILLER' ? 'Conseiller' : 'Admin',
            likes: 0,
            certified: pub.authorType === 'CONSEILLER',
            avatar: `https://randomuser.me/api/portraits/lego/${(index % 10) + 1}.jpg`,
            time: createdAt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            replies: [],
            responses: 0,
            newReply: '',
          };
        });

        // Ne pas dupliquer les topics déjà existants
        const existingIds = new Set(this.topics.map(t => t.id));
        this.topics.push(...apiTopics.filter(t => !existingIds.has(t.id)));

        this.saveTopics();
      },
      error: err => console.error('Erreur chargement discussions', err),
    });
  }

  // ===================== TÉMOIGNAGES =====================
  loadTestimonials(): void {
    this.allTestimonials = [
      {
        id: 1,
        quote: "Cette plateforme m'a aidé à découvrir ma passion pour l'informatique.",
        name: 'Fatou Sall',
        age: 20,
        school: 'ESP Dakar',
        likes: 89,
        comments: 15,
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      },
      {
        id: 2,
        quote: "Le test d'orientation a été décisif.",
        name: 'Ousmane Diaw',
        age: 19,
        school: 'ESEA Dakar',
        likes: 102,
        comments: 22,
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      },
      {
        id: 3,
        quote: 'Les conseillers ont été très attentifs.',
        name: 'Aïssatou Ndiaye',
        age: 21,
        school: 'UCAD',
        likes: 76,
        comments: 11,
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
    ];
  }

  // ===================== TOPICS & REPLIES =====================
  sendQuestion(): void {
    const trimmed = this.newQuestion.trim();
    if (!trimmed) return;

    const tempId = Math.floor(Math.random() * 100000);
    const newTopic: Topic = {
      newReply: '',
      id: tempId,
      subject: trimmed.slice(0, 30) + (trimmed.length > 30 ? '…' : ''),
      comment: trimmed,
      user: 'Moi',
      likes: 0,
      certified: false,
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
      time: 'À l’instant',
      replies: [],
      responses: 0,
    };

    this.topics.unshift(newTopic);
    this.saveTopics();
    this.newQuestion = '';
  }

  sendReply(topic: Topic, replyText: string, username = 'Utilisateur'): void {
    if (!replyText.trim()) return;

    const reply: Reply = {
      id: Math.floor(Math.random() * 100000),
      user: username,
      comment: replyText.trim(),
      likes: 0,
      time: 'À l’instant',
      replies: [],
    };

    topic.replies.push(reply);
    topic.responses = topic.replies.length;
    this.saveTopics();
  }

  toggleLikeTopic(topicId: number): void {
    const topic = this.topics.find(t => t.id === topicId);
    if (!topic) return;

    if (this.likedTopics.has(topicId)) {
      this.likedTopics.delete(topicId);
      topic.likes--;
    } else {
      this.likedTopics.add(topicId);
      topic.likes++;
    }
    this.saveTopics();
  }

  toggleLikeReply(topicId: number, replyId: number): void {
    const topic = this.topics.find(t => t.id === topicId);
    if (!topic) return;
    const reply = topic.replies.find(r => r.id === replyId);
    if (!reply) return;

    if (this.likedReplies.has(replyId)) {
      this.likedReplies.delete(replyId);
      reply.likes--;
    } else {
      this.likedReplies.add(replyId);
      reply.likes++;
    }
    this.saveTopics();
  }

  toggleLikeTestimonial(id: number): void {
    if (this.likedTestimonials.has(id)) {
      this.likedTestimonials.delete(id);
    } else {
      this.likedTestimonials.add(id);
    }
  }

  loadMoreTestimonials(): void {
    this.visibleTestimonials = Math.min(this.visibleTestimonials + 3, this.allTestimonials.length);
  }

  getInitials(name: string): string {
    const parts = name.split(' ');
    return parts.length === 1 ? parts[0].charAt(0).toUpperCase() : (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }

  // ===================== LOCAL STORAGE =====================
  private saveTopics(): void {
    localStorage.setItem('topics', JSON.stringify(this.topics));
    localStorage.setItem('likedTopics', JSON.stringify(Array.from(this.likedTopics)));
    localStorage.setItem('likedReplies', JSON.stringify(Array.from(this.likedReplies)));
  }

  private loadLikes(): void {
    const savedLikedTopics = localStorage.getItem('likedTopics');
    const savedLikedReplies = localStorage.getItem('likedReplies');
    if (savedLikedTopics) this.likedTopics = new Set(JSON.parse(savedLikedTopics));
    if (savedLikedReplies) this.likedReplies = new Set(JSON.parse(savedLikedReplies));
  }
}
