/**
 * Created by everton on 03/02/16.
 */

var app = angular.module('website');

app.service('serviceGlobalVariables', function(){

    var userData = undefined;

    return{

        setUserData: function(user){
            userData = user;
        },

        getUserData: function(){
            return userData;
        }
    }
});
