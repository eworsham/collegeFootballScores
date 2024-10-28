// external api datasource is api.collegefootballdata.com
// server proxy is used to bypass CORS error (I didn't know another way around this CORS error)
const baseURL = 'https://collegefootballproxyserver.onrender.com'

export default class ExternalServices {

    // Get the scores by week
    async getScores(week) {
        const url = `${baseURL}/games?year=2024&week=${week}&seasonType=regular&division=fbs`

        try {
            const res = await fetch(url)
            const data = await res.json()
            return data
        } catch (error) {
            console.error('getData Error: ', error)
        }
    }

    // Get the rankings by week
    async getRankings(week) {
        const url = `${baseURL}/rankings?year=2024&week=${week}&seasonType=regular`

        try {
            const res = await fetch(url)
            const data = await res.json()
            return data
        } catch (error) {
            console.error('getRankings Error: ', error)
        }
    }
}