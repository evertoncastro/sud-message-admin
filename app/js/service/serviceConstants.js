/**
 * Created by everton on 03/02/16.
 */

app.service('serviceConstants', function(){

    return{
        URL_LOGIN: 'http://sudmural.appspot.com/doLogin',


        MSG_ALERT_FAIL_LOGIN: {
            title: "E-mail ou senha foram informados incorretamente.",
            text: "Tente novamente!",
            showCancelButton: false,
            cancelButtonText: 'Não',
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Ok",
            imageUrl: "img/login/broken_key.jpg"
        }

    }
});
