import ExternalServices from "./externalServices.mjs";
import GameDetails from "./GameDetails.mjs";
import { getCurrentWeek } from './utils.mjs'

const externalServices = new ExternalServices()
const selectElement = document.querySelector('#week')

// Load current week on page load
const currentWeek = getCurrentWeek()
let dataSource = await externalServices.getScores(currentWeek)
selectElement.value = currentWeek
let gameDetails = new GameDetails(dataSource)
gameDetails.init()

// Get the week for scores
selectElement.addEventListener('change', async (event) => {
    const selectedWeek = event.target.value

    dataSource = await externalServices.getScores(selectedWeek)
    gameDetails = new GameDetails(dataSource)
    gameDetails.init()
})