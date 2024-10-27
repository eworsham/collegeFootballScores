const baseURL = 'https://collegefootballproxyserver.onrender.com'

export default class ExternalServices {

    async getScores() {

        // FIXME - Need to get the week dynamically
        const week = 9
        const url = `${baseURL}/games?year=2024&week=${week}&seasonType=regular&division=fbs`

        try {

            const res = await fetch(url)
            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.error('getData Error: ', error)
        }


        // return await fetchData(url)
    }

}