
(function () {

  /**
   * The Util service is for thin, globally reusable, utility functions
   */
  function UtilService($window) {
    var Util = {
      /**
       * Return a callback or noop function
       *
       * @param  {Function|*} cb - a 'potential' function
       * @return {Function}
       */
      safeCb(cb) {
        return (angular.isFunction(cb)) ? cb : angular.noop;
      },

      /**
       * Parse a given url with the use of an anchor element
       *
       * @param  {String} url - the url to parse
       * @return {Object}     - the parsed url, anchor element
       */
      urlParse(url) {
        var link = document.createElement('a');
        link.href = url;

        // Special treatment for IE, see http://stackoverflow.com/a/13405933 for details
        if (link.host === '') {
          link.href = link.href;
        }

        return link;
      },

      /**
       * Test whether or not a given url is same origin
       *
       * @param  {String}           url       - url to test
       * @param  {String|String[]}  [origins] - additional origins to test against
       * @return {Boolean}                    - true if url is same origin
       */
      isSameOrigin(url, origins) {
        url = Util.urlParse(url);
        origins = (origins && [].concat(origins)) || [];
        origins = origins.map(Util.urlParse);
        origins.push($window.location);
        origins = origins.filter(function (origin) {
          return url.hostname === origin.hostname &&
            url.port === origin.port &&
            url.protocol === origin.protocol;
        });
        return (origins.length >= 1);
      }
    };

    return Util;
  }

  angular.module('pickngoApp')
    .factory('Util', UtilService);

})();
