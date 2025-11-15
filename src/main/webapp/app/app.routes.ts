import { Routes } from '@angular/router';

import { Authority } from 'app/config/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { errorRoute } from './layouts/error/error.route';
import { loadEntityRoutes } from './core/microfrontend';
import ChatbotPageComponent from './chatbot-page/chatbot-page.component';
import { TestOrientationComponent } from './test-orientation/test-orientation.component';
import ParcoursComponent from './parcours/parcours.component';
import DashboardComponent from './admin/dashboard/dashboard.component';
import UserManagementComponent from './admin/user-management/user-management.component';
import EtablissementsComponent from './admin/etablissements/etablissements.component';
import OrientationsComponent from './admin/orientations/orientations.component';
import BoursesComponent from './admin/bourses/bourses.component';
//import { NoAuthGuard } from './core/auth/no-auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/custom-login/custom-login.component').then(m => m.CustomLoginComponent),
  },

  // 2️⃣ Home → protégé
  {
    path: 'home',
    loadComponent: () => import('./home/home.component'),
    canActivate: [UserRouteAccessService],
  },

  // 3️⃣ Admin dashboard → protégé
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./admin/dashboard/dashboard.component'),
    canActivate: [UserRouteAccessService],
    data: { authorities: [Authority.ADMIN] },
  },

  // 4️⃣ Redirection par défaut → login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'parcours',
    loadComponent: () => import('./parcours/parcours.component'),
    title: 'parcours.title',
  },

  {
    path: 'test-orientation',
    loadComponent: () => import('./test-orientation/test-orientation.component').then(m => m.TestOrientationComponent),
  },
  {
    path: 'actus',
    loadComponent: () => import('./actus/actus.component').then(m => m.ActusComponent),
  },
  {
    path: 'conseils',
    loadComponent: () => import('./conseils/conseils.component').then(m => m.ConseilsComponent),
  },

  {
    path: 'chatbot',
    component: ChatbotPageComponent,
  },

  {
    path: 'navbar',
    loadComponent: () => import('./layouts/navbar/navbar.component'),
    outlet: 'navbar',
  },
  /*{
    path: 'admin',
    data: {
      authorities: [Authority.ADMIN],
    },
    canActivate: [UserRouteAccessService],
    loadChildren: () => import('./admin/admin.routes'),
  },*/
  {
    path: 'entities',
    loadChildren: () => import(`./entities/entity.routes`),
  },
  {
    path: 'nextstepsenegal',
    loadChildren: () => loadEntityRoutes('nextstepsenegal'),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./admin/dashboard/dashboard.component'),
    title: 'dashboard.title',
  },
  {
    path: 'user-management',
    loadComponent: () => import('./admin/user-management/user-management.component'),
    title: 'user-management',
  },
  {
    path: 'etablissements',
    loadComponent: () => import('./admin/etablissements/etablissements.component'),
    title: 'etablissements',
  },
  {
    path: 'orientations',
    loadComponent: () => import('./admin/orientations/orientations.component'),
    title: 'etablissements',
  },
  {
    path: 'bourses',
    loadComponent: () => import('./admin/bourses/bourses.component'),
    title: 'etablissements',
  },
  {
    path: 'parametre',
    loadComponent: () => import('./admin/parametres/parametres.component'),
    title: 'parametre',
  },
  ...errorRoute,
];

export default routes;
