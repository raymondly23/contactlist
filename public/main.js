'use strict'

var app = angular.module('myApp', []);

app.controller('mainCtrl', function($scope, $http) {

  $scope.contacts = [];

  $http({
    url: '/contacts'
  })
  .then(function(res){
    console.log('data', res.data[0])
    var obj = res.data;
    obj.forEach(function(contact){
      $scope.contacts.push(contact);
    });
  }, function(err) {
    console.log(err)
  });

  $scope.addContact = function(){
    var contact = angular.copy($scope.newContact);
    $scope.contacts.push(contact);
    $scope.newContact = {};
    $http({
      method: 'POST',
      url: '/contacts',
      data: {
        name: contact.name,
        number: contact.number,
        email: contact.email
      }
    })
    .then(function(res){
      console.log(res)
    }, function(err) {
      console.log(err)
    });
  }

  $scope.deleteContact = function(contact){
    $scope.contacts.splice(this.$index, 1);
    console.log(this)
    $http({
      method: 'DELETE',
      url: `/contacts/${this.$index}`
    })
    .then(function(res){
      console.log(res)
    }, function(err){
      console.log(err)
    });
  }

  $scope.editContact = function(contact){
    $http({
      method: 'PUT',
      url: `/contacts/${this.$index}`

    })
    .then(function(res){
      console.log(res)
    }, function(err){
      console.log(err)
      }
    )};




});
  
