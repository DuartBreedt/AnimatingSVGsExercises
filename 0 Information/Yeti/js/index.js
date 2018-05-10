let email = 		document.querySelector('#email');
let password = 		document.querySelector('#password');
let svgContainer = 	document.querySelector('.svgContainer');
let armL = 			document.querySelector('#armL');
let armR = 			document.querySelector('#armR');
let eyes = 			document.querySelector('#eyes');
let nose = 			document.querySelector('#nose');
let mouth = 		document.querySelector('#mouth');
let chin = 			document.querySelector('#chin');
let face = 			document.querySelector('#face');
let eyebrow = 		document.querySelector('#eyebrow');
let outerEarL = 	document.querySelector('#earL #outerEar');
let outerEarR = 	document.querySelector('#earR #outerEar');
let earHairL = 		document.querySelector('#earL #earHair');
let earHairR = 		document.querySelector('#earR #earHair');
let hair = 			document.querySelector('#hair');
let yeti = 			document.querySelector('#yeti');

let caretDiv = 		document.querySelector('#caretDiv');
let emailClone = 	document.querySelector('#caretDiv #emailClone');
let caret = 		document.querySelector('#caretDiv #caret');

caretDiv.style.cssText = document.defaultView.getComputedStyle(email).cssText;
// @todo Fix
// caretDiv.style.width = '1920px';
caretDiv.style.visibility = 'hidden';
caretDiv.style.position = 'absolute';

let keyValueArray = [['large', '#mouthLargeBG'], ['medium', '#mouthMediumBG'], ['small', '#mouthSmallBG']];
let mouths = new Map(keyValueArray);

let commonMaxDist = { x: 20, y: 10 };
let eyesMaxDist = { x: 15, y: 5 };
let earsMaxDist = { x: 4, y: 4 };
let hairMaxDist = { x: 6, y: 0 };
let chinMaxDist = { x: 16, y: 10 };
let faceMaxDist = { x: 6, y: 8 };
let commonMaxRot = 10;
let faceMaxSkew = 5;
let eyebrowMaxSkew = 25;
let mouthStatus = 'small';
let emailInputYOffset = 25;

let svgCoords = getPosition(svgContainer);
let emailCoords = getPosition(email);
let commonCoords = getSVGCoords(svgContainer.offsetWidth / 2, svgContainer.offsetHeight / 2);

let eyesObj = 		new FacialFeature(eyes, eyesMaxDist, commonMaxRot, 0, commonCoords, {x: -1, y: -1}, 1, 0, null);
let noseObj = 		new FacialFeature(nose, commonMaxDist, commonMaxRot, 0, commonCoords, {x: -1, y: -1}, 1, 0, 'center center');
let mouthObj = 		new FacialFeature(mouth, commonMaxDist, commonMaxRot, 0, commonCoords, {x: -1, y: -1}, 1, 0, 'center center');
let chinObj = 		new FacialFeature(chin, chinMaxDist, 0, 0, commonCoords, {x: -1, y: -1}, 1, 0, null);
let faceObj = 		new FacialFeature(face, faceMaxDist, 0, faceMaxSkew, commonCoords, {x: -1, y: -1}, 1, 0, 'center top');
let eyebrowObj = 	new FacialFeature(eyebrow, faceMaxDist, 0, eyebrowMaxSkew, commonCoords, {x: -1, y: -1}, 1, 0, 'center top');
let outerEarLObj = 	new FacialFeature(outerEarL, earsMaxDist, 0, 0, commonCoords, {x: 1, y: 1}, 1, 0, null);
let outerEarRObj = 	new FacialFeature(outerEarR, earsMaxDist, 0, 0, commonCoords, {x: 1, y: 1}, 1, 0, null);
let earHairLObj = 	new FacialFeature(earHairL, earsMaxDist, 0, 0, commonCoords, {x: -1, y: -1}, 1, 0, null);
let earHairRObj = 	new FacialFeature(earHairR, earsMaxDist, 0, 0, commonCoords, {x: -1, y: -1}, 1, 0, null);
let hairObj = 		new FacialFeature(hair, hairMaxDist, 0, 0, commonCoords, { x: 1, y: 0 }, 1, 0, 'center bottom');

function update() {
	emailClone.textContent = email.value.substr(0, email.selectionEnd);
	let caretCoords = getPosition(caret);
	let caretXPos = emailCoords.x + caretCoords.x;
	let lookAt = { x: caretCoords.x, y: emailCoords.y + emailInputYOffset };
	
	// @todo Simplify with array
	eyesObj.update(lookAt);
	noseObj.update(lookAt); 
	mouthObj.update(lookAt);
	chinObj.update(lookAt);
	faceObj.update(lookAt);
	eyebrowObj.update(lookAt);
	outerEarLObj.update(lookAt);
	outerEarRObj.update(lookAt);
	earHairLObj.update(lookAt);
	earHairRObj.update(lookAt);
	hairObj.update(lookAt);

	// @todo Simplify with array
	eyesObj.render();
	noseObj.render();
	mouthObj.render();
	chinObj.render();
	faceObj.render();
	eyebrowObj.render();
	outerEarLObj.render();
	outerEarRObj.render();
	earHairLObj.render();
	earHairRObj.render();
	hairObj.render();
};

function changeMouth(mouthInput, morphIndexInput) {
	let mouthOptions = { duration: 300, morphIndex: morphIndexInput, easing: 'easingCubicOut', morphPrecision: 5};
	mouthStatus = mouthInput;
	KUTE.to('#mouthBG', { path: mouths.get(mouthInput) }, mouthOptions).start();
	KUTE.to('#mouthOutline', { path: mouths.get(mouthInput) }, mouthOptions).start();
	KUTE.to('#mouthMaskPath', { path: mouths.get(mouthInput) }, mouthOptions).start();
}

function getPosition(el) { // @todo Understand
	let xPos = 0;
	let yPos = 0;

	while (el) {

		xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
		yPos += (el.offsetTop - el.scrollTop + el.clientTop);

		el = el.offsetParent;
	}
	return {
		x: xPos,
		y: yPos
	};
}

function getSVGCoords(x, y) {
	return { x: svgCoords.x + x, y: svgCoords.y + y };
}

function onEmailInput(e) {
	update();
	let value = e.target.value;
	let curEmailIndex = value.length;

	// @todo Clean Up
	if (mouthStatus == 'large' && !value.includes('@')) {
		if (curEmailIndex <= 0) {
			changeMouth('small', -3);
		} else {
			changeMouth('medium', -3);
		}
	} else if (mouthStatus == 'small' && curEmailIndex > 0) {
		if (value.includes('@')) {
			changeMouth('large', 4);
		} else {
			changeMouth('medium', 1);
		}
	} else if (mouthStatus == 'medium') {
		if (curEmailIndex <= 0) {
			changeMouth('small', -1);
		} else if (value.includes('@')) {
			changeMouth('large', 3);
		}
	}
}

function onEmailFocus(e) {
	e.target.parentElement.classList.add('focusWithText');
	update();
}

function onEmailBlur(e) {
	if (e.target.value == '') {
		e.target.parentElement.classList.remove('focusWithText');
	}
	resetFace();
}

function onPasswordFocus(e) {
	coverEyes();
}

function onPasswordBlur(e) {
	uncoverEyes();
}

function coverEyes() {
	TweenMax.to(armL, .45, { x: -93, y: 2, rotation: 0, ease: Quad.easeOut });
	TweenMax.to(armR, .45, { x: -93, y: 2, rotation: 0, ease: Quad.easeOut, delay: .1 });
}

function uncoverEyes() {
	TweenMax.to(armL, 1.35, { y: 220, ease: Quad.easeOut });
	TweenMax.to(armL, 1.35, { rotation: 105, ease: Quad.easeOut, delay: .1 });
	TweenMax.to(armR, 1.35, { y: 220, ease: Quad.easeOut });
	TweenMax.to(armR, 1.35, { rotation: -105, ease: Quad.easeOut, delay: .1 });
}

function resetFace() {
	// @todo Simplify with array
	TweenMax.to(eyes, 1, { x: 0, y: 0, rotation: 0, ease: Expo.easeOut });
	TweenMax.to(nose, 1, { x: 0, y: 0, scaleX: 1, scaleY: 1, ease: Expo.easeOut });
	TweenMax.to(mouth, 1, { x: 0, y: 0, rotation: 0, ease: Expo.easeOut });
	TweenMax.to(chin, 1, { x: 0, y: 0, scaleY: 1, ease: Expo.easeOut });
	TweenMax.to([face, eyebrow], 1, { x: 0, y: 0, skewX: 0, ease: Expo.easeOut });
	TweenMax.to([outerEarL, outerEarR, earHairL, earHairR, hair], 1, { x: 0, y: 0, scaleY: 1, ease: Expo.easeOut });
}

email.addEventListener('focus', onEmailFocus);
email.addEventListener('blur', onEmailBlur);
email.addEventListener('input', onEmailInput);
password.addEventListener('focus', onPasswordFocus);
password.addEventListener('blur', onPasswordBlur);
TweenMax.set(armL, { x: -93, y: 220, rotation: 105, transformOrigin: 'top left' });
TweenMax.set(armR, { x: -93, y: 220, rotation: -105, transformOrigin: 'top right' });
TweenMax.to(yeti, 0.5, {y: 0, ease: Expo.easeOut, delay: 0.4})