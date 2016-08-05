
require('./app/app.styl');
window.moment = require('moment');
window.angular = require('angular');

require('./app/app.js');

// injector
require('./app/administracion/administracion.controller.js');
require('./app/administracion/administracion.js');
require('./app/administracion/roles/roles.controller.js');
require('./app/administracion/roles/roles.js');
require('./app/administracion/usuarios/usuarios.controller.js');
require('./app/administracion/usuarios/usuarios.js');
require('./app/app.constant.js');
require('./app/app.js');
require('./app/app.run.js');
require('./app/dashboard/dashboard.controller.js');
require('./app/dashboard/dashboard.js');
require('./app/main/main.controller.js');
require('./app/main/main.js');
require('./app/panelAdmin/panelAdmin.controller.js');
require('./app/panelAdmin/panelAdmin.js');
require('./app/producto/crearProducto/crearProducto.controller.js');
require('./app/producto/crearProducto/crearProducto.js');
require('./app/producto/editarProducto/editarProducto.controller.js');
require('./app/producto/editarProducto/editarProducto.js');
require('./app/producto/productoUsuario/productoUsuario.controller.js');
require('./app/producto/productoUsuario/productoUsuario.js');
require('./components/directives/isNumber/isNumber.directive.js');
require('./components/directives/ngThumb/ngThumb.directive.js');
require('./components/footer/footer.directive.js');
require('./components/modal/categoria/agregarCategoria.controller.js');
require('./components/modal/categoria/editarCategoria.controller.js');
require('./components/modal/chat/chat.controller.js');
require('./components/modal/confirm/confirm.controller.js');
require('./components/modal/departamento/agregarDepartamento.controller.js');
require('./components/modal/departamento/editarDepartamento.controller.js');
require('./components/modal/loginModal/loginModal.controller.js');
require('./components/modal/modal.service.js');
require('./components/modal/registroModal/registroModal.controller.js');
require('./components/modal/subcategoria/agregarSubCat.controller.js');
require('./components/modal/subcategoria/editarSubCat.controller.js');
require('./components/navbar/navbar.controller.js');
require('./components/navbar/navbar.directive.js');
require('./components/services/Api/api.js');
require('./components/services/Api/apiMain.js');
require('./components/services/Api/apiUsuarios.js');
require('./components/services/Api/apiUtils.js');
require('./components/services/Auth.service.js');
require('./components/services/session/session.service.js');
require('./components/services/user/User.service.js');
require('./components/util/util.module.js');
require('./components/util/util.service.js');
// endinjector