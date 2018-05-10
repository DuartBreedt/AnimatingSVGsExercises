"use strict";

class FacialFeature {
    constructor(
            element,
            maxDist,
            maxRot,
            maxSkew,
            windowCoords,
            lookAtPolarity,
            rotPolarity,
            skewPolarity,
            transformOrigin) {
        this.element = element;
        this.maxDist = maxDist;
        this.maxRot = maxRot;
        this.maxSkew = maxSkew;
        this.windowCoords = windowCoords;
        this.lookAtPolarity = lookAtPolarity;
        this.rotPolarity = rotPolarity;
        this.skewPolarity = skewPolarity;
        this.transformOrigin = transformOrigin;
        this.newCoords = { x: 0, y: 0 };
        this.newRot = 0;
        this.newSkew = 0;
    }

    update(lookAt) {
        let angle = this.getAngle(this.windowCoords.x, this.windowCoords.y, lookAt.x, lookAt.y);
        this.newCoords = this.getNewCoordinate(angle, this.maxDist.x, this.maxDist.y);

        if (this.maxRot > 0) {
            this.newRot = Math.cos(angle) * this.maxRot;
        }
        if (this.maxSkew > 0) {
            this.newSkew = Math.cos(angle) * this.maxSkew;
        }
    }

    render() {
        let options = {
            x: this.lookAtPolarity.x * this.newCoords.x,
            y: this.lookAtPolarity.y * this.newCoords.y,
            ease: Expo.easeOut
        }
        if (this.maxRot > 0) {
            options.rotation = this.rotPolarity * this.newRot;
        }
        if (this.maxSkew > 0) {
            options.skewX = this.skewPolarity * this.newSkew;
        }
        if (this.transformOrigin != null && this.transformOrigin != '') {
            options.transformOrigin = this.transformOrigin;
        }
        TweenMax.to(this.element, 1, options);
    }

    getAngle(x1, y1, x2, y2) {
        let angle = Math.atan2(y1 - y2, x1 - x2);
        return angle;
    }

    getNewCoordinate(angle, xHypoteneuse, yHypoteneuse) {
        return { x: Math.cos(angle) * xHypoteneuse, y: Math.sin(angle) * yHypoteneuse };
    }
}