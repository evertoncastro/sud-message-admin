/**
 * Created by everton on 03/02/16.
 */

app.service('serviceConstants', function(){

    return{
        URL_LOGIN: 'http://sudmural.appspot.com/doLogin',
        URL_REGISTER_MESSAGE: 'http://sudmural.appspot.com/registerMessage',
        URL_LOAD_MESSAGE_BY_USER: 'http://sudmural.appspot.com/loadMessageByUser',


        MSG_ALERT_FAIL_LOGIN: {
            title: "E-mail ou senha foram informados incorretamente.",
            text: "Tente novamente!",
            showCancelButton: false, cancelButtonText: 'Não', confirmButtonColor: "#DD6B55", confirmButtonText: "Ok"
        },

        MSG_ALERT_SUCCESS_REGISTER_MESSAGE: {
            title: "Mensagem criada com sucesso!",
            text: "Parabéns :)",
            showCancelButton: false, cancelButtonText: 'Não', confirmButtonColor: "#DD6B55", confirmButtonText: "Ok"
        },

        MSG_ALERT_FAILURE_REGISTER_MESSAGE: {
            title: "Houve um erro ao criar mensagem!",
            text: "Tente novamente!",
            showCancelButton: false, cancelButtonText: 'Não', confirmButtonColor: "#DD6B55", confirmButtonText: "Ok"
        }

    }
});
