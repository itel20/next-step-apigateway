import { Routes } from '@angular/router';

import { Authority } from 'app/config/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { errorRoute } from './layouts/error/error.route';
import NavbarComponent from 'app/layouts/navbar/navbar.component';

import { loadEntityRoutes } from './core/microfrontend';
import ChatbotPageComponent from './chatbot-page/chatbot-page.component';
import { TestOrientationComponent } from './test-orientation/test-orientation.component';
import ParcoursComponent from './parcours/parcours.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component'),
    title: 'home.title',
  },
  {
    path: '',
    loadComponent: () => import('./parcours/parcours.component'),
    title: 'parcours.title',
  },
  {
    path: 'parcours',
    component: ParcoursComponent,
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
    path: '',
    component: NavbarComponent,
    outlet: 'navbar',
  },

  {
    path: 'chatbot',
    component: ChatbotPageComponent,
  },

  {
    path: '',
    loadComponent: () => import('./layouts/navbar/navbar.component'),
    outlet: 'navbar',
  },
  {
    path: 'admin',
    data: {
      authorities: [Authority.ADMIN],
    },
    canActivate: [UserRouteAccessService],
    loadChildren: () => import('./admin/admin.routes'),
  },
  {
    path: '',
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
  ...errorRoute,
];

export default routes;
