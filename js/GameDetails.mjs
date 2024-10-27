function buildGameCard(game) {
    let gameCard = document.createElement('div')
    gameCard.setAttribute('class', 'gameCard')
    gameCard.innerHTML = `
        <p class="teamName">${game.home_team}</p>
        <p class="teamName">${game.away_team}</p>
        <p class="score">${game.home_points ? game.home_points : 0} : ${game.away_points ? game.away_points : 0}</p>
    `

    // Add prediction form if game hasn't started yet
    const today = new Date()
    const gameStart = new Date(game.start_date)
    if (today < gameStart) {
        gameCard.innerHTML += `
            <form class="scorePrediction">
                <div>
                    <label for="homeScore">Home Score: </label>
                    <input type="number" name="homeScore" id="homeScore" required>                
                </div>

                <div>
                    <label for="awayScore">Away Score: </label>
                    <input type="number" name="awayScore" id="awayScore">
                </div>

                <button type="button">Predict Score</button>
            </form>
        `
    }

    return gameCard
}


export default class GameDetails {
    constructor(gamesData) {
        this.gamesData = gamesData
    }

    init() {
        // Hide loading games
        document
            .querySelector('#loading')
            .classList.add('hidden')

        // Buld game cards
        const games = document.querySelector('#games')
        games.innerHTML = '';
        this.gamesData.forEach(game => {
            games.appendChild(buildGameCard(game))
        });
    }
}