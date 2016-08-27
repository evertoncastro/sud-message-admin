/**
 * Created by everton on 03/02/16.
 */

app.service('serviceConstants', function(){

    //var URL_BASE = 'localhost:8080';
    var URL_BASE = 'http://sudmural.appspot.com';

    return{
        URL_LOGIN: URL_BASE+'/doLogin',
        URL_REGISTER_MESSAGE: URL_BASE+'/registerMessage',
        URL_UPDATE_MESSAGE: URL_BASE+'/updateMessage',
        URL_LOAD_MESSAGE: URL_BASE+'/loadMessage?unityNumber=',
        URL_DELETE_MESSAGE: URL_BASE+'/deleteMessage',
        URL_REGISTER_EVENT: URL_BASE+'/registerEvent',
        URL_UPDATE_EVENT: URL_BASE+'/updateEvent',
        URL_LOAD_EVENT: URL_BASE+'/loadEvent?unityNumber=',
        URL_DELETE_EVENT: URL_BASE+'/deleteEvent',
        URL_LOAD_PERSON_LIST: URL_BASE+'/loadPersonList?unityNumber=',
        URL_LOAD_MISSIONARY_LIST: URL_BASE+'/loadMissionaryList',
        URL_LOAD_PERSON_BY_UNITY: URL_BASE+'/loadPersonByUnit',
        URL_UPDATE_PERSON: URL_BASE+'/updatePerson',
        URL_REGISTER_PERSON: URL_BASE+'/registerPerson',
        URL_DELETE_PERSON: URL_BASE+'/deletePerson',
        URL_UNITY_LIST  : URL_BASE+'/loadUnityList?unityNumber=',
        URL_FULL_UNITY_LIST  : URL_BASE+'/loadFullUnityList',
        URL_REGISTER_MISSIONARY: URL_BASE+'/registerMissionary',
        URL_UPDATE_MISSIONARY: URL_BASE+'/updateMissionary',
        URL_DELETE_MISSIONARY: URL_BASE+'/deleteMissionary',

        CLOUD_UPLOAD_PRESET: 'bfpxfykl',

        MSG_DEFAULT_ERROR: {
            text: "Houve um erro de comunicação com o servidor",
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
        MSG_EMPTY_MESSAGE_DISPLAY: {
            text: "Selecione um modo de exibição para a mensagem",
            title: "Tente novamente!"
        },

        MSG_EMPTY_EVENT_TITLE: {
            text: "Informe o título da mensagem!",
            title: "Tente novamente!"
        },
        MSG_EMPTY_EVENT_PLACE: {
            text: "Informe o local do evento.",
            title: "Tente novamente!"
        },
        MSG_EMPTY_EVENT_DESCRIPTION: {
            text: "Forneça uma descrição para o evento.",
            title: "Tente novamente!"
        },
        MSG_EMPTY_EVENT_DATE: {
            text: "Informe a data do evento.",
            title: "Tente novamente!"
        },
        MSG_EMPTY_EVENT_TIME: {
            text: "Informe o horário do evento.",
            title: "Tente novamente!"
        },

        MSG_EMPTY_EVENT_DISPLAY: {
            text: "Selecione um modo de exibição para o evento.",
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

        MSG_CONFIRM_MESSAGE_DELETE: {
            text: "Tem certeza que deseja excluir esta mensagem?",
            title: "Confirmação"
        },

        MSG_DELETE_SUCESS: {
            text: "Mensagem excluída com sucesso.",
            title: "Aviso"
        },

        MSG_ALERT_SUCCESS_REGISTER_EVENT: {
            text: "Evento criado com sucesso!",
            title: "Parabéns :)"
        },

        MSG_ALERT_FAILURE_REGISTER_EVENT: {
            text: "Houve um erro ao criar o evento!",
            title: "Tente novamente!"
        },

        MSG_ALERT_SUCCESS_UPDATE_EVENT: {
            text: "Dados atualizados com sucesso!",
            title: "Parabéns :)"
        },

        MSG_ALERT_FAILURE_UPDATE_EVENT: {
            text: "Houve um erro atualizar dados!",
            title: "Tente novamente!"
        },

        MSG_DELETE_EVENT_SUCESS: {
            text: "Evento excluído com sucesso.",
            title: "Aviso"
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

        MSG_DELETE_PERSON_SUCESS: {
            text: "Pessoa excluída com sucesso.",
            title: "Aviso"
        },

        MSG_NO_PERSON_FOR_UNITY: {
            text: "Não há pessoas cadastradas nesta unidade",
            title: "Alerta!"
        },

        MSG_ALERT_SUCCESS_REGISTER_MISSIONARY: {
            text: "Missionário criado com sucesso!",
            title: "Parabéns :)"
        },

        MSG_ALERT_FAILURE_REGISTER_MISSIONARY: {
            text: "Houve um erro ao criar missionário!",
            title: "Tente novamente!"
        },

        MSG_ALERT_SUCCESS_UPDATE_MISSIONARY: {
            text: "Dados atualizados com sucesso!",
            title: "Parabéns :)"
        },

        MSG_ALERT_FAILURE_UPDATE_MISSIONARY: {
            text: "Houve um erro ao atualizar dados!",
            title: "Tente novamente!"
        },

        MSG_DELETE_MISSIONARY_SUCESS: {
            text: "Missionário excluído com sucesso.",
            title: "Aviso"
        },

        INCOMPLETE_MISSIONARY_DATA: {
            text: "Antes de continuar verifique se todas as informações do missionário foram preenchidas!",
            title: "Ops!"
        },


        LIST_UNITY: ['Magine', 'Parque das Américas', 'Pilar']


    }
});
