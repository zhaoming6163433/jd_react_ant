import asyncComponent from './AsyncComponent';
const example = asyncComponent(() => import('@/page/example/example'));
const home = asyncComponent(() => import('@/page/home'));
const routes = [
  {
    exact: true,
    path: '/',
    component: example
  },
  {
    exact: true,
    path: '/example',
    component: example
  },
  {
    exact: true,
    path: '/home',
    component: home
  }
];

export default routes;
