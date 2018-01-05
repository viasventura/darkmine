//Custom functions
/*

*/
(function($) {
    $.fn.appendOption = function(innerVal, innerHTML, helper) {
        if (helper) {
            $(this).append("<option value = '" + innerVal + "' title='' data-toggle='popover' data-placement='top' data-trigger='hover' data-content='" + helper + "'>" + innerHTML + "</option>");
        } else {
            $(this).append("<option value = '" + innerVal + "'>" + innerHTML + "</option>");
        }
        return this;
    };
})(jQuery)

function randomString(length) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

function showToaster(mode, callback) {
    if (mode == 0) {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": 0,
            "extendedTimeOut": 0,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut",
            "tapToDismiss": false
        }
        callback();
    }
}


