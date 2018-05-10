$(document).ready(function () {
    KUTE.defaultOptions.duration = 500;
    KUTE.defaultOptions.delay = 250;
    KUTE.defaultOptions.easing = "easingSinusoidalOut";
    menuIsOpen = false;

    tweens = {};
    populateTweens();

    $("svg").on("click", function () {
        if (menuIsOpen) {
            
            // INSERT JS HERE

            $(".menu").removeClass("menu-open");
            $(".title").removeClass("title-open");
        } else {
            
            // INSERT JS HERE

            $(".menu").addClass("menu-open");
            $(".title").addClass("title-open");
        }

        menuIsOpen = !menuIsOpen;
    });

    function populateTweens() {
        
        // INSERT JS HERE

    }
});