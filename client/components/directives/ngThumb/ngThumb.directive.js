
PICKNGO.directive('ngThumb', function($window) {
  var helper = {
    support: !!($window.FileReader && $window.CanvasRenderingContext2D),
    isFile: function(item) {
      return angular.isObject(item) && item instanceof $window.File;
    },
    isImage: function(file) {
      var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }
  };

  function link(scope, element, attributes) {
    if (!helper.support) return;

    var params = scope.$eval(attributes.ngThumb);
    var canvas = element.find('canvas');

    if (params.url) {
      var img = new Image();
      img.onload = onLoadImage;
      img.src = params.url;
    } else {
      if (!helper.isFile(params.file)) return;
      if (!helper.isImage(params.file)) return;
      
      var reader = new FileReader();

      reader.onload = onLoadFile;
      reader.readAsDataURL(params.file);

    }


    function onLoadFile(event) {
      var img = new Image();
      img.onload = onLoadImage;
      img.src = event.target.result;
    }

    function onLoadImage() {
      var width, height, drawWidth, drawHeight;
      var offsetX = 0;
      var offsetY = 0;

      if (params.width || params.height) {
        drawWidth = width = params.width || this.width / this.height * params.height;
        drawHeight = height = params.height || this.height / this.width * params.width;
      } else {
        width = height = params.max;
        let size = getSize(this, params.max);
        drawWidth = size.width;
        drawHeight = size.height;
        offsetX = size.offsetX;
        offsetY = size.offsetY;
      }
      canvas.attr({ width, height });
      canvas[0].getContext('2d')
        .drawImage(this, offsetX, offsetY, drawWidth, drawHeight);
    }
  }
  function getSize({width, height}, max) {
    if (width > height) {
      let newHeight = height * (max / width);
      return {
        width: max,
        height: newHeight,
        offsetY: (max - newHeight) / 2,
        offsetX: 0
      };
    }
    let newWidth = width * (max / height);
    return {
      height: max,
      width: newWidth,
      offsetX: (max - newWidth) / 2,
      offsetY: 0
    };
  }

  return {
    restrict: 'A',
    template: '<canvas/>',
    link
  };
});