/**
 * Created by evertondecastro on 1/6/16.
 */

var callSweetAlert = function(title, text){
    var objectMessage = {
        title: title,
        text: text,
        showCancelButton: false, cancelButtonText: 'Não', confirmButtonColor: "#DD6B55", confirmButtonText: "Ok"
    };
    swal(objectMessage);
};

var callSweetConfirm = function(title, text){
    var objectMessage = {
        title: title,
        text: text,
        showCancelButton: true, cancelButtonText: 'Não', confirmButtonColor: "#DD6B55", confirmButtonText: "Ok"
    };
    swal(objectMessage);
};