const SHEET_ID = "1uKdDpa3K1OxaTgexyih7flEi1Ter8L7XrAEsdeakqfE"
const SHEET_NAME = "Sheet1"

const SHEET_URL =
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_NAME}&tqx=out:json`

async function loadSheet(){

    const res = await fetch(SHEET_URL)
    const text = await res.text()

    const json = JSON.parse(text.substring(47).slice(0,-2))

    const headers = json.table.cols.map(col => col.label)

    const data = json.table.rows.map(row => {

        const obj = {}

        headers.forEach((header,i)=>{
            obj[header] = row.c[i] ? row.c[i].v : ""
        })

        return obj
    })

    return data
}