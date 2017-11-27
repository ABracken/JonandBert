$(function () {
    $('#rsvpForm').on('submit', function (e) {
        e.preventDefault();
        if ($("#rsvpForm").valid()) {

            $('#rsvp-form-submit').button('loading');

            $.ajax({
                url: "/api/rsvp",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({
                    name: $("input[name=name]").val(),
                    email: $("input[name=email]").val(),
                    song: $("input[name=song]").val(),
                    comments: $("textarea[name=comments]").val()
                }),

                success: function (response) {
                    $('#submitMessage').empty("");
                    $('#submitMessage').show();
                    $('#submitMessage').html("<div class='alert alert-success'>");
                    $('#submitMessage > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                    $('#submitMessage > .alert-success').append("<strong>Your message has been sent. </strong>");
                    $('#submitMessage > .alert-success').append('</div>');
                    $('#submitMessage').delay(8000).fadeOut();

                    $('#rsvp-form-submit').button('reset');
                },
                error: function (err) {
                    $('#submitMessage').empty("");
                    $('#submitMessage').show();
                    $('#submitMessage').html("<div class='alert alert-danger'>");
                    $('#submitMessage > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");

                    switch (err.status) {
                        case 400:
                            $('#submitMessage > .alert-danger').append("<strong>" + err.responseJSON + "</strong>");
                            break;
                        default:
                            $('#submitMessage > .alert-danger').append("<strong>It seems that our website is trying to interfere with our love. So sorry about that!</strong>");
                            break;
                    }

                    $('#submitMessage > .alert-danger').append('</div>');
                    $('#submitMessage').delay(8000).fadeOut();

                    $('#rsvp-form-submit').button('reset');
                }
            })
        }

        return false;
    });
});