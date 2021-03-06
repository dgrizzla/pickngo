PICKNGO.factory('Modal', function($rootScope, $uibModal) {
  /**
   * Opens a modal
   * @param  {Object} scope      - an object to be merged with modal's scope
   * @param  {String} modalClass - (optional) class(es) to be applied to the modal
   * @return {Object}            - the instance $uibModal.open() returns
   */
  function openModal(scope = {}, modalClass = 'modal-default') {


    //angular.extend(modalScope, scope);

    return $uibModal.open({
      template: require('./modal.jade'),
      windowClass: modalClass
        //scope: modalScope
    });
  }

  // Public API here
  return {

    //Modal de login
    login(/*log = angular.noop*/) {
      return function() {
        $uibModal.open({
          template: require('./loginModal/loginModal.jade')(),
          controller: 'LoginModalCtrl',
          size: 'sm'
        });
      };
    },
    registro(/*reg = angular.noop*/) {
      return function() {
        $uibModal.open({
          template: require('./registroModal/registroModal.jade')(),
          controller: 'RegistroModalCtrl',
          size: 'md'
        });
      };
    },
    /* Confirmation modals */
    confirm: {

      /**
       * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
       * @param  {Function} del - callback, ran when delete is confirmed
       * @return {Function}     - the function to open the modal (ex. myModalFn)
       */
      delete(del = angular.noop) {
        /**
         * Open a delete confirmation modal
         * @param  {String} name   - name or info to show on modal
         * @param  {All}           - any additional args are passed straight to del callback
         */
        return function() {
          var args = Array.prototype.slice.call(arguments),
            name = args.shift(),
            deleteModal;

          deleteModal = openModal({
            modal: {
              dismissable: true,
              title: 'Confirm Delete',
              html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
              buttons: [{
                classes: 'btn-danger',
                text: 'Delete',
                click: function(evt) {
                  deleteModal.close(evt);
                }
              }, {
                classes: 'btn-default',
                text: 'Cancel',
                click: function(evt) {
                  deleteModal.dismiss(evt);
                }
              }]
            }
          }, 'modal-danger');

          deleteModal.result.then(function(event) {
            del.apply(event, args);
          });
        };
      }
    }
  };
});