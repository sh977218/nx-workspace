import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
    title: 'Home'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
    title: 'Login'
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then((c) => c.ProfileComponent),
    title: 'Profile'
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./search/search.component').then((c) => c.SearchComponent),
    title: 'Search'
  },
  {
    path: 'threeJs',
    loadComponent: () =>
      import('./three-js/three-js.component').then((c) => c.ThreeJsComponent),
    title: 'Three Js'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    title: 'Dashboard'
  },
  {
    path: 'video',
    loadComponent: () =>
      import('./video/video.component').then((c) => c.VideoComponent),
    title: 'Video'
  },
  {
    path: 'feed',
    loadComponent: () =>
      import('./feed/feed.component').then((c) => c.FeedComponent),
    title: 'Feed'
  }
];
