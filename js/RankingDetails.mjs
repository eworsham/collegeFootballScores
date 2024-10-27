export default class RankingDetails {
    constructor(rankingData) {
        this.rankingData = rankingData
    }

    init() {
        // Hide loading rankings
        document
            .querySelector('#loading')
            .classList.add('hidden')

        // Build ranking list
        const rankings = document.querySelector('#rankings')
        rankings.innerHTML = ''
        console.log(this.rankingData)
        
    }
}