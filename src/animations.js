let introText = "Hi, I'm Andrew".split("");
const introHolder = document.getElementById('intro');
const introTextElement = document.getElementById("intro-text-holder");
const hand = document.getElementById('hand');

let introDelay = 500;
let introTimeout = 50;


function addChar(i, timeout) {
    if (i < introText.length) {
        char = introText[i];
        introTextElement.innerHTML += introText[i];
        i++;
        setTimeout(addChar, timeout, i, timeout);
    } else {
        hand.classList.remove('hidden')
        introHolder.classList.add('animate-cursorBlink');
        setTimeout(waveHand, 2000);
    }
}

function animateTypeWriter() {
    let i = 0;
    introTextElement.innerHTML = "";
    hand.classList.add('hidden');
    hand.classList.remove('animate-waving');
    introHolder.classList.add('border-r-4');
    introHolder.classList.remove('animate-cursorBlink')
    setTimeout(addChar, introDelay, i, introTimeout);
}

function waveHand() {
    hand.classList.add('animate-waving');
    setTimeout(animateTypeWriter, 3000);
}


animateTypeWriter();