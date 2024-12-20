function buildGameCard(game) {
    let gameCard = document.createElement('div')
    gameCard.setAttribute('class', 'gameCard')


    let gameScore = document.createElement('div')
    gameScore.setAttribute('class', 'gameScore')
    gameScore.innerHTML = `
        <p class="teamName">${game.away_team}</p>
        <p class="teamName">${game.home_team}</p>
        <p class="score">${game.away_points ? game.away_points : 0} : ${game.home_points ? game.home_points : 0}</p>
    `

    // Make card clickable to show more details
    gameScore.addEventListener('click', () => {
        const moreGameDetails = document.querySelector('#moreGameDetails')

        const startTime = new Date(game.start_date)

        moreGameDetails.innerHTML = `
            <button id='closeModal'>X</button>
            <h2>${game.away_team} at ${game.home_team}</h2>
            <p>${game.season} - Week ${game.week}</p>
            <p><span class="label">Venue: </span>${game.venue}</p>
            <p><span class="label">Start Time: </span>${startTime.toLocaleString()}</p>
        `

        moreGameDetails.showModal()

        document
            .querySelector('#closeModal')
            .addEventListener('click', () => {
                moreGameDetails.close()
            })
    })

    gameCard.appendChild(gameScore) 

    // Add prediction form if game hasn't started yet
    const today = new Date()
    const gameStart = new Date(game.start_date)
    if (today < gameStart) {
        let predictionForm = document.createElement('form');
        predictionForm.setAttribute('class', 'scorePrediction');
        predictionForm.innerHTML = `
            <h3>Prediction</h3>
            <div>
                <label for="awayScore${game.id}">Away Score: </label>
                <input type="number" name="awayScore${game.id}" id="awayScore${game.id}" required>
            </div>

            <div>
                <label for="homeScore${game.id}">Home Score: </label>
                <input type="number" name="homeScore${game.id}" id="homeScore${game.id}" required>                
            </div>

            <div class="predictionButton">
                <p>You can only place one prediction</p>
                <button type="button" id="predictScoreButton-${game.id}">Predict Score</button>
            </div>
        `;

        gameCard.appendChild(predictionForm);
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
        games.innerHTML = ''
        this.gamesData.forEach(game => {
            games.appendChild(buildGameCard(game))

            const predictScoreButton = document.querySelector(`#predictScoreButton-${game.id}`)
            if (predictScoreButton) {
                predictScoreButton.addEventListener('click', () => this.addPrediction(game))
            }

            this.getPrediction(game)
        });

        if (this.gamesData.length === 0) {
            games.innerHTML = '<p>No games this week</p>'
        }
    }

    addPrediction(game) {
        const scores = JSON.parse(localStorage.getItem('scores')) || []
        const awayScore = document.querySelector(`#awayScore${game.id}`)
        const homeScore = document.querySelector(`#homeScore${game.id}`)
        const predictionButton = document.querySelector(`#predictScoreButton-${game.id}`)

        if (awayScore.value !== '' && homeScore.value !== '') {
            const scoreItem = {
                id: game.id,
                away_score: awayScore.value,
                home_score: homeScore.value
            }
    
            scores.push(scoreItem)
            localStorage.setItem(`scores`, JSON.stringify(scores))
    
            // Hide button and make inputs readonly
            predictionButton.classList.add('hidden')
            awayScore.readOnly = true
            awayScore.classList.add('hideBorder')
            homeScore.readOnly = true  
            homeScore.classList.add('hideBorder')
        }
    }

    getPrediction(game) {
        const scores = JSON.parse(localStorage.getItem('scores')) || []

        scores.forEach(score => {
            if (score.id === game.id) {
                const awayScore = document.querySelector(`#awayScore${game.id}`)
                const homeScore = document.querySelector(`#homeScore${game.id}`)
                const predictionButton = document.querySelector(`#predictScoreButton-${game.id}`)

                awayScore.value = score.away_score
                homeScore.value = score.home_score

                // Hide button and make inputs readOnly
                predictionButton.classList.add('hidden')
                awayScore.readOnly = true
                awayScore.classList.add('hideBorder')
                homeScore.readOnly = true  
                homeScore.classList.add('hideBorder')
            }
        })
    }
}