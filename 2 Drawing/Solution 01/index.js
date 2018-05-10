$(document).ready(() => {

    $('[data-toggle="tooltip"]').tooltip();

    let one = KUTE.allFromTo(
        ".arcs",
        { draw: "100% 100%" },
        { draw: "0% 50%" },
        { duration: 250, easing: 'linear', delay: 250 }
    );
    let two = KUTE.allFromTo(
        ".arcs",
        { draw: "0% 50%" },
        { draw: "0% 0%" },
        { duration: 250, easing: 'linear' }
    );
    let three = KUTE.allFromTo(
        ".arcs",
        { draw: "100% 100%" },
        { draw: "0% 100%" },
        { duration: 500, easing: 'easingCubicOut' }
    );

    one.chain(two.chain(three));

    one.start();
});