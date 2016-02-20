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
        },


        parseToString: function (valDate, options, dateTime) {
            if (!valDate) return valDate; // skip...

            // skip 2...
            if (!valDate instanceof Date) return valDate;

            // skip 3
            if (!options) return valDate;

            var result = '';

            try {
                // get token to format date....
                var resultOpt = options.split(/[^A-Za-z]/);
                var token = options.replace(/m/g, '');
                token = token.replace(/d/g, '');
                token = token.replace(/a/g, '');
                if (token.length > 1) token = token.charAt(0);
                //console.log('TOKEN: ' + token);

                // check first option....
                for (var i = 0; i < resultOpt.length; i++) {
                    var optTemp = resultOpt[i];
                    //console.log(optTemp);


                    if (optTemp.indexOf('d') != -1) {
                        result += this.formatDecimal(valDate.getDate(), optTemp.length, '0') + token;
                    } else if (optTemp.indexOf('m') != -1) {
                        result += this.formatDecimal((valDate.getMonth() + 1), optTemp.length, '0') + token;
                    } else if (optTemp.indexOf('a') != -1 && optTemp.length != 2) {
                        result += valDate.getFullYear() + token;
                    } else if (optTemp.indexOf('a') != -1) {
                        var fullDate = valDate.getFullYear();
                        var cropDate = fullDate.toString().substr(2, 2);
                        result += cropDate + token;
                    }
                }

                // remove last position of token....
                if (result.length > 0)
                    result = result.substr(0, result.length - 1);
            } catch (e) {
                console.error(e.message);
                //return valueDt;
            }
            if(dateTime){
                return result + ' 23:59:59';
            }else{
                return result;
            }

        },

        formatDecimal: function (value1, size, char) {
            if (value1 == undefined) return value1; // skip...

            var value2 = String(value1);

            if (value2 != undefined) {
                while (value2.length < size) {
                    value2 = char + value2;
                }
            }

            return value2;
        }



    }
});
