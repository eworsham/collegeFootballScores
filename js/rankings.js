import ExternalServices from "./externalServices.mjs";
import RankingDetails from "./RankingDetails.mjs"
import { getCurrentWeek } from "./utils.mjs";

const externalServices = new ExternalServices()
const selectElement = document.querySelector('#week')

// Load current week on page load
const currentWeek = getCurrentWeek()
let dataSource = await externalServices.getRankings(currentWeek)
selectElement.value = currentWeek
let rankingDetails = new RankingDetails(dataSource)
rankingDetails.init()

// Get the week for rankings
selectElement.addEventListener('change', async (event) => {
    const selectedWeek = event.target.value
    
    dataSource = await externalServices.getRankings(selectedWeek)
    rankingDetails = new RankingDetails(dataSource)
    rankingDetails.init()
})