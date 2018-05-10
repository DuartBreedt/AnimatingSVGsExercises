$(document).ready(() => {

    tweens = {}
    paused = true;
    populateTweens();

    $("svg").on("click", function() {
        if(paused) {
            if ($("video").is(":hidden")) {
                $("video").fadeIn(250);
            }
            tweens["leftPlayToPause"].start();
            tweens["rightPlayToPause"].start();
            $("video").get(0).play();
        } else {
            tweens["leftPauseToPlay"].start();
            tweens["rightPauseToPlay"].start();
            $("video").get(0).pause();
        }
        paused = !paused;
    });

    function populateTweens() {
        tweens["leftPauseToPlay"] = KUTE.fromTo('#play-left',
            { path: '#pause-left' },
            { path: '#play-left' },
            { easing: 'easingCubicOut' });
        tweens["rightPauseToPlay"] = KUTE.fromTo('#play-right',
            { path: '#pause-right' },
            { path: '#play-right' },
            { easing: 'easingCubicOut' });
        tweens["leftPlayToPause"] = KUTE.fromTo('#play-left',
            { path: '#play-left' },
            { path: '#pause-left' },
            { easing: 'easingCubicOut' });
        tweens["rightPlayToPause"] = KUTE.fromTo('#play-right',
            { path: '#play-right' },
            { path: '#pause-right' },
            { easing: 'easingCubicOut' });
    }
    
});