async function startGame(){

    const res = await fetch("config.json")
    const config = await res.json()

    const step = getStep()

    const roll = Math.random()

    if(roll < config.clueChance){

        showClue(config, step)

    } else {

        showMeme(config)

    }
}

function getStep(){

    const params = new URLSearchParams(window.location.search)

    return params.get("step") || "1"
}

function showClue(config, step){

    const clue = config.steps[step] || "Clue missing."

    document.getElementById("content").innerHTML = `
        <div class="clue">
            ${clue}
        </div>
    `
}
function showMeme(config){

    const memes = config.memes
    const meme = memes[Math.floor(Math.random() * memes.length)]

    document.getElementById("content").innerHTML = `
        <div class="quote">
            ${meme.quote}
        </div>

        <div class="image-container">
            <img src="${meme.image}">
        </div>
    `
}

startGame()