function buildGameCard(game) {
    let gameCard = document.createElement('div')
    gameCard.setAttribute('class', 'gameCard')
    gameCard.innerHTML = `
        <p class="teamName">${game.away_team}</p>
        <p class="teamName">${game.home_team}</p>
        <p class="score">${game.away_points ? game.away_points : 0} : ${game.home_points ? game.home_points : 0}</p>
    `

    // Add prediction form if game hasn't started yet
    const today = new Date()
    const gameStart = new Date(game.start_date)
    if (today < gameStart) {
        gameCard.innerHTML += `
            <form class="scorePrediction">
                <h3>Prediction</h3>
                <div>
                    <label for="awayScore">Away Score: </label>
                    <input type="number" name="awayScore" id="awayScore${game.id}">
                </div>

                <div>
                    <label for="homeScore">Home Score: </label>
                    <input type="number" name="homeScore" id="homeScore${game.id}" required>                
                </div>

                <div class="predictionButton">
                    <p>You can only place one prediction</p>
                    <button type="button" id="predictScoreButton-${game.id}">Predict Score</button>
                </div>
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

            const predictScoreButton = document.querySelector(`#predictScoreButton-${game.id}`)
            if (predictScoreButton) {
                predictScoreButton.addEventListener('click', () => this.addPrediction(game))
            }

            this.getPrediction(game)
        });
    }

    addPrediction(game) {
        const scores = JSON.parse(localStorage.getItem('scores')) || []

        const scoreItem = {
            id: game.id,
            away_score: document.querySelector(`#awayScore${game.id}`).value,
            home_score: document.querySelector(`#homeScore${game.id}`).value
        }

        scores.push(scoreItem)
        localStorage.setItem(`scores`, JSON.stringify(scores))

        document
            .querySelector(`#predictScoreButton-${game.id}`)
            .classList.add('hidden')
    }

    getPrediction(game) {
        const scores = JSON.parse(localStorage.getItem('scores')) || []

        scores.forEach(score => {
            if (score.id === game.id) {
                document.querySelector(`#awayScore${game.id}`).value = score.away_score
                document.querySelector(`#homeScore${game.id}`).value = score.home_score

                document
                    .querySelector(`#predictScoreButton-${game.id}`)
                    .classList.add('hidden')
            }
        })
    }
}