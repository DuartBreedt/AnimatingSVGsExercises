$(document).ready(function () {

    signupIsOpen = false;

    $("svg").on("click", function () {
        if (signupIsOpen) {
            $("svg").removeClass("rotated-svg");
            $("input").removeClass("open");
        } else {
            $("svg").addClass("rotated-svg");
            $("input").addClass("open");
        }

        signupIsOpen = !signupIsOpen;
    });
});