import { Routes } from '@angular/router';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

const routes: Routes = [
  {
    path: 'docs',
    loadComponent: () => import('./docs/docs.component'),
    title: 'global.menu.admin.apidocs',
  },
  {
    path: 'configuration',
    loadComponent: () => import('./configuration/configuration.component'),
    title: 'configuration.title',
  },
  {
    path: 'health',
    loadComponent: () => import('./health/health.component'),
    title: 'health.title',
  },
  {
    path: 'logs',
    loadComponent: () => import('./logs/logs.component'),
    title: 'logs.title',
  },
  {
    path: 'metrics',
    loadComponent: () => import('./metrics/metrics.component'),
    title: 'metrics.title',
  },
  {
    path: 'gateway',
    loadComponent: () => import('./gateway/gateway.component'),
    title: 'gateway.title',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
    title: 'dashboard.title',
  },
  {
    path: 'user-management',
    loadComponent: () => import('./user-management/user-management.component'),
    title: 'user-management.title',
  },
  {
    path: 'orientations',
    loadComponent: () => import('./orientations/orientations.component'),
    title: 'user-management.title',
  },
  {
    path: 'etablissements',
    loadComponent: () => import('./etablissements/etablissements.component'),
    title: 'etablissements',
  },
  {
    path: 'bourses',
    loadComponent: () => import('./bourses/bourses.component'),
    title: '',
  },
  {
    path: 'parametres',
    loadComponent: () => import('./parametres/parametres.component'),
    title: '',
  },
  /* jhipster-needle-add-admin-route - JHipster will add admin routes here */
];

export default routes;
