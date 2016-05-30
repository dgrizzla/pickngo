'use strict';

angular.module('pickngoApp')
  .factory('Session', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return{
      get:function(callback){
        $http.get('/auth/session')
          .then(resp => {
            callback(resp);
          })
          .catch(err =>{
            callback(err);
          });
      },
      delete:function (callback) {
        $http.delete('/auth/logout')
          .then(resp => {
            callback(resp);
          })
          .catch(err => {
            callback(err)
          })
      }
    }
  });
