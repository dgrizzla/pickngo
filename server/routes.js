/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app, passport) {
  
  // Insert routes below
  app.use('/components/upload', require('./components/upload'));
  app.use('/api/productos', require('./api/producto'));
  app.use('/api/subcategorias', require('./api/subcategoria'));
  app.use('/api/categorias', require('./api/categoria'));
  app.use('/api/tipos', require('./api/tipo'));
  app.use('/api/departamentos', require('./api/departamento'));
  app.use('/api/usuarios', require('./api/usuario'));
  app.use('/api/things', require('./api/thing'));
  app.use('/auth', require('./api/session'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
