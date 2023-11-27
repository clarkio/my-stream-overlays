"use strict";
const captains = console;
const DEFAULT_COLOR = 'deepskyblue';
const STORE_OVERLAY_COLOR_NAME = 'streamOverlayColor';
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

$(document).ready(function() {
    // file:///Users/bc/Dev/stream-overlay/index.html?sceneName=main-scene&color=deepskyblue
    setScene(params.sceneName);
    const overlayColor = params.color || DEFAULT_COLOR;
    setOverlayColor(overlayColor);
})

function setIframeSource(sourceUrl = '') {
    $('#overlay-embed').attr('src', sourceUrl);
}

function setScene(sceneName = 'starting-soon') {
    console.log(sceneName);
    const sceneUrl = scenes[sceneName];
    setIframeSource(sceneUrl);
    // const sceneImageSource = `./assets/${sceneName}.png`;
    // $('#scene-image').attr('src', sceneImageSource);
}

function startOverlayEffect(colors) {
    const originalColor = String(localStorage.getItem(STORE_OVERLAY_COLOR_NAME));
    let counter = 0;
    let colorIndex = 0;
    let effectColor = colors[colorIndex];
    const overlayEffectInterval = setInterval(() => {
        counter += 1;
        if (counter === 10) {
            setOverlayColor(originalColor);
            clearInterval(overlayEffectInterval);
        }
        else {
            setOverlayColor(effectColor);
            colorIndex = colorIndex === colors.length - 1 ? 0 : ++colorIndex;
            effectColor = colors[colorIndex];
        }
    }, 1000);
}

function setOverlayColor(color) {
    localStorage.setItem(STORE_OVERLAY_COLOR_NAME, color);
    // const [redDegreeRotation, redSaturation, redLightness] = chroma("red").hsl();
    const hexColor = chroma(color).hex();
    const hslColor = chroma(hexColor).hsl();
    let [degRotation] = hslColor;
    // const [, saturation, lightness, alpha] = hslColor;
    degRotation = Number.isNaN(degRotation) ? 0 : degRotation;
    // const convertedDegRotation = degRotation - redDegreeRotation;
    // const convertedSaturation = 100 + (saturation - redSaturation);
    // const convertedLightness = 100 + (lightness - redLightness);
    // const correctedLightness = lightness * 200;
    /* 
    * Still figuring out the best way to get the true colors with hue-rotate from a red base
    * The hue-rotate is not working as expected for example when trying to produce yellow or brown
    * So far just doing the degree rotation produces the best results for most colors
    */
   $('#container').css('-webkit-filter', `hue-rotate(${degRotation}deg)`);
    // $('#container').css('-webkit-filter', `hue-rotate(${degRotation}deg) saturate(${saturation})`);
    // $('#container').css('-webkit-filter', `hue-rotate(${degRotation}deg) saturate(100) brightness(${lightness}) opacity(${alpha})`);
    // $('#container').css('-webkit-filter', `hue-rotate(${degRotation}deg) sepia() saturate(10000)`);
    // $('#container').css('-webkit-filter', `hue-rotate(${convertedDegRotation}deg) saturate(100) brightness(${convertedLightness})`);
    // $('#container').css('-webkit-filter', `invert(10%) sepia(99%) saturate(6498%) hue-rotate(247deg) brightness(89%) contrast(147%)`);
}

const scenes = {
    "talk": "<update to hosted service overlay url>",
    "starting-soon": "<update to hosted service overlay url>",
    "brb": "<update to hosted service overlay url>",
    "ending": "<update to hosted service overlay url>",
    "main-scene": "<update to hosted service overlay url>",
    "alerts": "<update to hosted service overlay url>"
}