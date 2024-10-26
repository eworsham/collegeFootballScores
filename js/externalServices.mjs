const baseURL = 'https://api.collegefootballdata.com'

async function fetchData(url) {
    try {
        const res = await fetch(url, {
            headers: {
                Authorization: 'Bearer LlcTAT93TGyWJDv1qqPbk2Lm2kEDDASguzDxoiVNn97cjdzAjCeKF7WffxdJniw6'
            }
        })
        return await res.json()
    } catch (error) {
        console.error('fetchData error: ', error)
    }
    
}

export default class ExternalServices {



    async getData() {

        // Need to get the week dynamically

        const week = 9
        const url = `${baseURL}/games?year=2024&week=${week}&seasonType=regular&division=fbs`

        return await fetchData(url)
    }

}