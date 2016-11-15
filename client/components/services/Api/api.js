
PICKNGO.factory('Api', function ($http, Api_main, Notification, FileUploader) {
  Api_main.toast = Notification;
  Api_main.catch = msg => err => {
    console.error(err);
    Notification.error(msg);
  };
  Api_main.newUploader = (extensions) => {
    extensions = '|' + extensions.join('|') + '|';
    var uploader = new FileUploader({
      url: '/api/renglon/imagen'
    });
    uploader.filters.push({
      name: 'extensionsFilter',
      fn: function(item/*, options*/) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return extensions.indexOf(type) !== -1;
      }
    });
    return uploader;
  };
  return Api_main;
});