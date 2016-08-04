var assert = chai.assert;
var expect = chai.expect;

describe('adress book app', function () {
  var contactService, $httpBackend;
  describe('the contact service', function () {
    beforeEach(function(){
      module('AddressBook');
      inject(function($injector){
        contactService = $injector.get('contactService');
        $httpBackend = $injector.get('$httpBackend')
      });
    });

    it('sould have a proper contacts, an Array', function () {
        expect(contactService.contacts).to.be.an('array');
    });

    it('should call the backend', function(){
      $httpBackend.expectGET('http://localhost:9001/contacts')
        .respond(200,[])
      $httpBackend.flush();
    })
  });

  describe('the concactController', function () {
    var $scope, $controller;
    beforeEach(function () {
      module('AddressBook');
      inject(function ($injector, $rootScope) {
        $scope = $rootScope.$new();
        contactService = $injector.get('contactService');
        $httpBackend = $injector.get('$httpBackend');
        $controller = $injector.get('$controller')
      })
    })

    it('should store an array of contacts in scope', function(){
      $controller('contactController', {$scope: $scope, contactService: contactService})
      assert.isArray($scope.contacts);
    })
  });

  describe('the proper filter', function () {
    var proper;
    beforeEach(function () {
      module('AddressBook');
      inject(function ($injector) {
        proper = $injector.get('$filter')('proper');
      });

    })
    it('should preper case a string', function () {
      expect(proper('ned stark')).to.equal('Ned Stark');
      expect(proper('ned stark')).to.not.be.equal('ned Stark');
    })
    it('should take a number and return it as a string', function () {
      expect(proper(42)).to.equal('42');
      expect(proper(42)).to.not.be.equal(42);
    })
    it('should throw an Error on an incompatible type', function () {
      assert.throws(function () {
        proper(undefined)
      })
    })
  });

  describe('Avatar', function () {

    beforeEach(function () {
      module('AddressBook')
    })

    it('should display the capitalized first letter of a name', function () {
      inject(function ($rootScope, $compile) {
        $rootScope.contact = {name: 'john arryn'};
        var element = $compile('<avatar name=contact.name>')($rootScope);
        $rootScope.$digest();
        var dirText = element.text();
        expect(dirText).to.equal('J');
      });
    })
  })
})
