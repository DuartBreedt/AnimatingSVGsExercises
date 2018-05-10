$(document).ready(function () {
    KUTE.defaultOptions.duration = 500;
    KUTE.defaultOptions.delay = 250;
    KUTE.defaultOptions.easing = "easingSinusoidalOut";
    menuIsOpen = false;

    tweens = {};
    populateTweens();

    $("svg").on("click", function () {
        if (menuIsOpen) {
            tweens["crossOneClose"].start();
            tweens["crossTwoClose"].start();
            tweens["middleLineClose"].start();
            $(".menu").removeClass("menu-open");
            $(".title").removeClass("title-open");
        } else {
            tweens["crossOneOpen"].start();
            tweens["crossTwoOpen"].start();
            tweens["middleLineOpen"].start();
            $(".menu").addClass("menu-open");
            $(".title").addClass("title-open");
        }

        menuIsOpen = !menuIsOpen;
    });

    function populateTweens() {
        tweens["crossOneClose"] = KUTE.fromTo("#crossOne", { draw: "0% 38%" }, { draw: "72.3% 100%" });
        tweens["crossTwoClose"] = KUTE.fromTo("#crossTwo", { draw: "61.5% 100%" }, { draw: "0% 27.5%" });
        tweens["middleLineClose"] = KUTE.fromTo("#middleLine", { opacity: "0" }, { opacity: "1" });
        tweens["crossOneOpen"] = KUTE.fromTo("#crossOne", { draw: "72.3% 100%" }, { draw: "0% 38%" });
        tweens["crossTwoOpen"] = KUTE.fromTo("#crossTwo", { draw: "0% 27.5%" }, { draw: "61.5% 100%" });
        tweens["middleLineOpen"] = KUTE.fromTo("#middleLine", { opacity: "1" }, { opacity: "0" });
    }
});