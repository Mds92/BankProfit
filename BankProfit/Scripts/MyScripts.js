function AddCommas(nStr) {
    nStr += '';
    nStr = nStr.replace(/,/img, '');
    var x = nStr.split('.'),
        x1 = x[0],
        x2 = x.length > 1 ? '.' + x[1] : '',
        rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    return x1 + x2;
}

(function ($) {

    function isNumberKey(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        if (charCode >= 65 || charCode >= 90) {
            evt.preventDefault();
            return false;
        }
        return true;
    }

    $('input[data-type="numeric"]').on('keydown', function (evt) {
        if (!isNumberKey(evt)) return false;
        $(this).val(AddCommas(this.value));
        return true;
    });

})(jQuery);