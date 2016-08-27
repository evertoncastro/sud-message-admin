/**
 * Created by evertondecastro on 1/6/16.
 */

var callSweetAlert = function(title, text, success, failure){
    var objectMessage = {
        title: title,
        text: text,
        showCancelButton: false, cancelButtonText: 'Não', confirmButtonColor: "#DD6B55", confirmButtonText: "Ok"
    };
    swal(objectMessage,
        function(isConfirm){
            if(isConfirm){
                if(success){
                    success()
                }

            }else{
                if(failure){
                    failure();
                }
            }
        }
    );
};

var callSweetConfirm = function(title, text, success){
    var objectMessage = {
        title: title,
        text: text,
        showCancelButton: true, cancelButtonText: 'Não', confirmButtonColor: "#DD6B55", confirmButtonText: "Ok"
    };
    swal(objectMessage,
        function(isConfirm){
            if(isConfirm){
                if(success){
                    success()
                }

            }else{
                if(failure){
                    failure();
                }
            }
        });
};