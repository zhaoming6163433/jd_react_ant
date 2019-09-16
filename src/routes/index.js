import aa from '@/page/aa'
import home from '@/page/home'
const routes = [
  {
    exact: true,
    path: '/',
    component: aa
  },
  {
    exact: true,
    path: '/aa',
    component: aa
  },
  {
    exact: true,
    path: '/home',
    component: home
  }
];

export default routes;
