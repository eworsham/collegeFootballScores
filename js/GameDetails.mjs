function buildGameCard(game) {
    
    console.log(game)


    const gameCard = document.createElement('div')
    gameCard.setAttribute('class', 'gameCard')
    gameCard.innerHTML = `
        <p>${game.home_team}</p>
        <p>${game.away_team}</p>
        <p class="score">${game.home_points ? game.home_points : 0} : ${game.away_points ? game.away_points : 0}</p>
    `
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