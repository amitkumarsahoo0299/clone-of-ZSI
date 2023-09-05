function redirect_url(page_url) {
    if (page_url != '') {
        $(location).attr('href', page_url);
    } else {
        return false;
    }
}

function change_language(lang_code, curr_code, page_uri) {
    if (lang_code != '') {
        var page_url = BASE_URL + "lang/" + lang_code + '?curr_code=' + curr_code + (page_uri != '' ? '&page_uri=' + page_uri : '');
        redirect_url(page_url);
    }
}

function loadMoreRecords(obj) {
    $(obj).html($(obj).data('loading-text')).prop('disables', true);
    $.ajax({
        type: "POST",
        url: $(obj).data('url'),
        data: 'p_func=LOAD_MORE&p_page=' + (parseInt($(obj).data('page')) + 1),
        success: function(response) {
            $(obj).html($(obj).data('default-text')).prop('disables', true);
            var result_ary = response.split("||||");
            if (result_ary[0] == 'SUCCESS') {
                $($(obj).data('con')).append(result_ary[1]);
                if (result_ary.length > 2) {
                    $(obj).data('page', result_ary[2]);
                } else {
                    $(obj).parent().parent().remove();
                }
            } else {
                czaAlert(result_ary[1]);
            }
        },
        error: function() {
            $(obj).html($(obj).data('default-text')).prop('disables', true);
            czaAlert('Something went wrong, please try again after some time.');
        }
    });
}