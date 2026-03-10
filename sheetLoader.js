const SHEET_URL =
    "https://docs.google.com/spreadsheets/d/1uKdDpa3K1OxaTgexyih7flEi1Ter8L7XrAEsdeakqfE/export?format=csv&gid=0"

async function loadSheet(){

    const res = await fetch(SHEET_URL)
    const text = await res.text()

    const rows = text.split("\n").map(r => r.split(","))

    const headers = rows[0]

    const data = rows.slice(1).map(row => {

        let obj = {}

        headers.forEach((h,i)=>{
            obj[h.trim()] = row[i]
        })

        return obj

    })

    return data
}