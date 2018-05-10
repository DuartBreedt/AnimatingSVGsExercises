$(document).ready(function () {
    $("svg").on("click", function () {
        $(this).parents(".friend").remove();
    });
});