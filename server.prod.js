import path from 'path';
import Koa from 'koa';
import views from 'koa-views';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import serve from 'koa-static';
import mount from 'koa-mount';

// function useRouter(application, router) {
//   application
//     .use(router.routes())
//     .use(router.allowedMethods());
// }

const app = new Koa('0.0.0.0');

app.use(views(path.join(__dirname, '..', 'views'), {
  map: {
    html: 'nunjucks',
  },
}));

if (process.env.NODE_ENV === 'development') {
  const logger = require('koa-logger'); // eslint-disable-line global-require
  app.use(logger());
}

app.use(compress());
app.use(bodyParser());
app.use(mount('/static', serve(path.join(__dirname, '..', 'public'))));

app.use(async (ctx) => {
  await ctx.render('index.html');
});

export default app;
