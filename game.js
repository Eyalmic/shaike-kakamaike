function renderButtons(row){

    if(!row.buttons || !row.buttonLinks) return ""

    const buttons = row.buttons.split(",").map(b=>b.trim())
    const links = row.buttonLinks.split(",").map(l=>l.trim())

    let html = `<div class="buttons">`

    buttons.forEach((text,i)=>{

        const link = links[i] || "#"

        html += `
            <a href="${link}" class="action-button">
                ${text}
            </a>
        `
    })

    html += "</div>"

    return html
}

function showContent(row){

    if(!row){
        document.getElementById("content").innerHTML =
            "<div class='quote'>Content not found</div>"
        return
    }

    document.getElementById("content").innerHTML = `
        <div class="quote">${row.quote || ""}</div>

        ${row.image ? `
        <div class="image-container">
            <img src="${row.image}">
        </div>
        ` : ""}

        ${renderButtons(row)}
    `
}

async function loadMemes(){

    const data = await loadSheet()

    console.log("sheet data:", data)

    const memes = data.filter(
        r => r.type && r.type.toLowerCase() === "meme"
    )

    console.log("memes:", memes)

    if(memes.length === 0){
        document.getElementById("content").innerHTML =
            "<div class='quote'>No memes found in sheet</div>"
        return
    }

    const meme = weightedRandom(memes)

    showContent(meme)
}

async function loadTasks(){

    const data = await loadSheet()

    const tasks = data.filter(
        r => r.type && r.type.trim().toLowerCase() === "task"
    )

    const task = tasks[Math.floor(Math.random()*tasks.length)]

    showContent(task)
}

async function loadStep(){

    const params = new URLSearchParams(window.location.search)
    const stepId = params.get("step")

    const data = await loadSheet()

    const step = data.find(
        r => r.type && r.type.trim().toLowerCase() === "step"
            && r.step === stepId
    )

    showContent(step)
}

function weightedRandom(items){

    const total = items.reduce((sum,item)=> sum + (parseFloat(item.chance) || 1),0)

    let r = Math.random() * total

    for(const item of items){

        const weight = parseFloat(item.chance) || 1

        if(r < weight) return item

        r -= weight
    }

    return items[0]
}

async function loadGame(){

    const params = new URLSearchParams(window.location.search)

    const page = params.get("page") || "memes"

    const data = await loadSheet()

    const rows = data.filter(r => r.page === page)

    if(rows.length === 0){
        showContent({quote:"Nothing found for page: " + page})
        return
    }

    const row = weightedRandom(rows)

    showContent(row)
}