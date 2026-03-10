const SHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTmg7-kN-jfhTuVKWkoNlCixPf4-iukEwbSkqwI0n-D1Tr9Wo1kGsEjJ-l8hUz0qk1Bq_9vwwRQUIjv/pub?output=csv"

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