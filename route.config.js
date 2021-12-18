import navConfig from './nav.config';

const load = function(path) {
  return r => require.ensure([], () =>
      r(require(`./pages/${path}.vue`)))
};

const loadDocs = function(path) {
  return r => require.ensure([], () =>
      r(require(`./docs${path}.md`)))
};

const registerRoute = (navConfig) => {
  let route = [];
  Object.keys(navConfig).forEach((index) => {
    let navs = navConfig;
    route.push({
      path: `/component`,
      redirect: `/component/alert`,
      component: load('component'),
      children: []
    });
    navs.forEach(nav => {
      if (nav.href) return;
      if (nav.groups) {
        nav.groups.forEach(group => {
          group.list.forEach(nav => {
            addRoute(nav, index);
          });
        });
      } else if (nav.children) {
        nav.children.forEach(nav => {
          addRoute(nav, index);
        });
      } else {
        addRoute(nav, index);
      }
    });
  });
  function addRoute(page, index) {
    const component = page.path === '/changelog'
      ? load('changelog')
      : loadDocs(page.path);
    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
      },
      name: 'component-' + (page.title || page.name),
      component: component.default || component
    };

    route[index].children.push(child);
  }

  return route;
};

let route = registerRoute(navConfig);

route = route.concat([{
  path: '/',
  redirect: '/component'
}, {
  path: '*',
  redirect: '/component'
}]);

export default route;
