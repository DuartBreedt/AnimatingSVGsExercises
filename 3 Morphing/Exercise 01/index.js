$(document).ready(() => {

    tweens = {}
    paused = true;
    populateTweens();

    $("svg").on("click", function() {
        if(paused) {
            if ($("video").is(":hidden")) {
                $("video").fadeIn(250);
            }

            // INSERT JS HERE

            $("video").get(0).play();
        } else {

            // INSERT JS HERE

            $("video").get(0).pause();
        }
        paused = !paused;
    });

    function populateTweens() {
        
        // INSERT JS HERE

    }
    
});