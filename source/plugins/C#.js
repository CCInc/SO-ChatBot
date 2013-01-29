$.ajax({
            type: "GET",
            url: "example.com/script.php?currentValue="+currentValue ,
            dataType: "json",
            statusCode: {
                200: function (result)
                {
                    $("#output").html(result.value);
                }
            }
        });
