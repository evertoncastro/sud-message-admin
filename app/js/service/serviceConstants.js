/**
 * Created by everton on 03/02/16.
 */

app.service('serviceConstants', function(){

    return{
        URL_LOGIN: 'http://sudmural.appspot.com/doLogin',
        URL_REGISTER_MESSAGE: 'http://sudmural.appspot.com/registerMessage',
        URL_UPDATE_MESSAGE: 'http://sudmural.appspot.com/updateMessage',
        URL_LOAD_MESSAGE: 'http://sudmural.appspot.com/loadMessage',
        URL_LOAD_PERSON_LIST: 'http://sudmural.appspot.com/loadPersonList',
        URL_LOAD_PERSON_BY_UNITY: 'http://sudmural.appspot.com/loadPersonByUnit',
        URL_UPDATE_PERSON: 'http://sudmural.appspot.com/updatePerson',
        URL_REGISTER_PERSON: 'http://sudmural.appspot.com/registerPerson',
        URL_UNITY_LIST  : 'http://sudmural.appspot.com/loadUnityList',


        MSG_DEFAULT_ERROR: {
            text: "Houve um erro no aplicativo",
            title: "Tente novamente!"
        },
        MSG_EMPTY_MESSAGE_TITLE: {
            text: "Informe o título da mensagem!",
            title: "Tente novamente!"
        },
        MSG_EMPTY_MESSAGE_TEXT: {
            text: "O texto da mensagem está vazio!",
            title: "Tente novamente!"
        },
        MSG_EMPTY_MESSAGE_PEOPLE: {
            text: "Selecione uma pessoa responsável pela mensagem!",
            title: "Tente novamente!"
        },
        MSG_EMPTY_MESSAGE_STATUS: {
            text: "Selecione um status para a mensagem",
            title: "Tente novamente!"
        },

        MSG_ALERT_FAIL_LOGIN: {
            text: "E-mail ou senha foram informados incorretamente.",
            title: "Tente novamente!"
        },

        MSG_ALERT_SUCCESS_REGISTER_MESSAGE: {
            text: "Mensagem criada com sucesso!",
            title: "Parabéns :)"
        },

        MSG_ALERT_FAILURE_REGISTER_MESSAGE: {
            text: "Houve um erro ao criar mensagem!",
            title: "Tente novamente!"
        },

        MSG_ALERT_SUCCESS_UPDATE_MESSAGE: {
            text: "Dados atualizados com sucesso!",
            title: "Parabéns :)"
        },

        MSG_ALERT_FAILURE_UPDATE_MESSAGE: {
            text: "Houve um erro atualizar dados!",
            title: "Tente novamente!"
        },

        MSG_ALERT_SUCCESS_REGISTER_PERSON: {
            text: "Pessoa criada com sucesso!",
            title: "Parabéns :)"
        },

        MSG_ALERT_FAILURE_REGISTER_PERSON: {
            text: "Houve um erro ao criar pessoa!",
            title: "Tente novamente!"
        },

        MSG_ALERT_SUCCESS_UPDATE_PERSON: {
            text: "Dados atualizados com sucesso!",
            title: "Parabéns :)"
        },

        MSG_ALERT_FAILURE_UPDATE_PERSON: {
            text: "Houve um erro ao atualizar dados!",
            title: "Tente novamente!"
        },

        MSG_NO_PERSON_FOR_UNITY: {
            text: "Não há pessoas cadastradas nesta unidade",
            title: "Alerta!"
        }

    }
});
