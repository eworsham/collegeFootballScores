import ExternalServices from "./externalServices.mjs";
import GameDetails from "./GameDetails.mjs";

const externalServices = new ExternalServices()

// Load week 1 on page load
let dataSource = await externalServices.getScores(1)
let gameDetails = new GameDetails(dataSource)
gameDetails.init()

// Get the week for scores
document
    .querySelector('button')
    .addEventListener('click', async () => {
        const selectElement = document.querySelector('#week')
        const selectedWeek = selectElement.value
        
        dataSource = await externalServices.getScores(selectedWeek)
        gameDetails = new GameDetails(dataSource)
        gameDetails.init()
    })
