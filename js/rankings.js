import ExternalServices from "./externalServices.mjs";
import RankingDetails from "./RankingDetails.mjs"

const externalServices = new ExternalServices()

// Load week 1 on page load
let dataSource = await externalServices.getRankings(1)
let rankingDetails = new RankingDetails(dataSource)
rankingDetails.init()

// Get the week for scores
document
    .querySelector('button')
    .addEventListener('click', async () => {
        const selectElement = document.querySelector('#week')
        const selectedWeek = selectElement.value
        
        dataSource = await externalServices.getRankings(selectedWeek)
        rankingDetails = new RankingDetails(dataSource)
        rankingDetails.init()
    })