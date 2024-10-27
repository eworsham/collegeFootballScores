function buildRankingList(poll) {
    let list = document.createElement('div')
    list.setAttribute('class', 'rankingList')
    list.innerHTML = `
        <h3>${poll.poll}</h3>      
    `
    poll.ranks.forEach((team) => {
        list.innerHTML += `
            <div class='rankItem'>
                <p>${team.rank} : ${team.school} - ${team.conference}</p>
                <p>Points: ${team.points}</p>
            </div>
        `
    });
    return list
}

export default class RankingDetails {
    constructor(rankingData) {
        this.rankingData = rankingData
    }

    init() {
        // Hide loading rankings
        document
            .querySelector('#loading')
            .classList.add('hidden')
            
        // Check if rankings are available
        const rankings = document.querySelector('#rankings')
        if (this.rankingData.length === 0) {
            rankings.innerHTML = `<p>Rankings not yet available</p>`
        } else {

            // Filter out polls to only AP Top 25
            const filteredPoll = this.rankingData[0].polls.filter(poll => poll.poll === 'AP Top 25')
            
            // Build ranking list
            rankings.innerHTML = ''
            rankings.appendChild(buildRankingList(filteredPoll[0]))
        }

    }
}