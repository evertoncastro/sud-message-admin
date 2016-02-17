/**
 * Created by everton on 03/02/16.
 */

app.service('serviceConstants', function(){

    return{
        URL_LOGIN: 'http://sudmural.appspot.com/doLogin',
        URL_REGISTER_MESSAGE: 'http://sudmural.appspot.com/registerMessage',
        URL_LOAD_MESSAGE: 'http://sudmural.appspot.com/loadMessage',
        URL_LOAD_PERSON_LIST: 'http://sudmural.appspot.com/loadPersonList',
        URL_UPDATE_PERSON: 'http://sudmural.appspot.com/updatePerson',
        URL_REGISTER_PERSON: 'http://sudmural.appspot.com/registerPerson',


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
        },

        MSG_ALERT_SUCCESS_REGISTER_PERSON: {
            title: "Pessoa criada com sucesso!",
            text: "Parabéns :)",
            showCancelButton: false, cancelButtonText: 'Não', confirmButtonColor: "#DD6B55", confirmButtonText: "Ok"
        },

        MSG_ALERT_FAILURE_REGISTER_PERSON: {
            title: "Houve um erro ao criar pessoa!",
            text: "Tente novamente!",
            showCancelButton: false, cancelButtonText: 'Não', confirmButtonColor: "#DD6B55", confirmButtonText: "Ok"
        },

        MSG_ALERT_SUCCESS_UPDATE_PERSON: {
            title: "Pessoa criada com sucesso!",
            text: "Parabéns :)",
            showCancelButton: false, cancelButtonText: 'Não', confirmButtonColor: "#DD6B55", confirmButtonText: "Ok"
        },

        MSG_ALERT_FAILURE_UPDATE_PERSON: {
            title: "Houve um erro ao criar pessoa!",
            text: "Tente novamente!",
            showCancelButton: false, cancelButtonText: 'Não', confirmButtonColor: "#DD6B55", confirmButtonText: "Ok"
        }

    }
});
