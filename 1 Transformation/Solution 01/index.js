$(document).ready(function () {

    isOpen = false;

    $("svg").on("click", function () {
        if (isOpen) {
            $("svg").removeClass("open-svg");
            $("input").removeClass("open-input");
        } else {
            $("svg").addClass("open-svg");
            $("input").addClass("open-input");
        }

        isOpen = !isOpen;
    });
});