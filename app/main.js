angular.module('AddressBook', [])
  .service('contactService', function($http){
    this.contacts = [];
    var contactService = this;
    console.log('contacts init');
    $http.get("http://localhost:9001/contacts").then(
      function (res) {
        console.log(res);
        while(res.data[0]){
          contactService.contacts.push(res.data.pop());
        }
      }
    )
  })
  .controller('contactController', function(contactService, $scope){
    $scope.contacts = contactService.contacts
  })
  .filter('proper', function () {
    return function (res) {
      var type = typeof res;
      if (type !== 'number' && type !== 'string') throw new Error();
      return res.toString().split(' ').map(function (word) {
        return word[0].toUpperCase().concat(word.slice(1));
      }).join(' ');
    }
  })
