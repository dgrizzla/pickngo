
PICKNGO.factory('Api', function ($http, Api_main, Notification) {
  Api_main.toast = Notification;
  return Api_main;
});