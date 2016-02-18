/**
 * Created by everton on 03/02/16.
 */

var app = angular.module('website');

app.service('serviceUtil', function(){

    return{

        isEmpty: function(data){
            if(!data || data == ''){
                return true;
            }else{
                return false;
            }
        }

    }
});
