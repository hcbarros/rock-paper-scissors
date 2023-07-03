
const players = ['Rock','Paper','Scissors']
const playersPoints = {Rock: 0, Paper: 0, Scissors: 0}


function getComputerChoice() {
    return players[Math.floor(Math.random() * 3)]
}


function playRound(playerSelection, computerSelection) {

    playerSelection = playerSelection.toLowerCase()
    computerSelection = computerSelection.toLowerCase()
    for (const key in playersPoints){
        
        if(key.toLowerCase() == playerSelection) {
            playersPoints[key] += 1
            console.log(`${key} made 01 point. Total: ${playersPoints[key]} points`)
        }
        if(key.toLowerCase() == computerSelection) {
            playersPoints[key] += 1
            console.log(`${key} made 01 point. Total: ${playersPoints[key]} points`)
        }

        if(key.toLowerCase() == playerSelection && playersPoints[key] == 5) {
            return `You won! ${key} beats ${computerSelection}`    
        }
        else if(key.toLowerCase() == computerSelection && playersPoints[key] == 5) {
            return `You lose! ${key} beats ${playerSelection}`
        }
    }
    return null
}


(function game() {
    let computerSelection = getComputerChoice()
    let playerSelection = ''

    console.log(`The computer chose ${computerSelection}`)

    while(true) {
        playerSelection = prompt('Enter player name: ')
        if(playerSelection == null) continue
        const array = players.filter(p => p.toLowerCase() == playerSelection.toLowerCase())
        if(array.length === 0 || (array.length > 0 && playerSelection.toLowerCase() == computerSelection.toLowerCase())) {
            const options = players.filter(p => p.toLowerCase() != computerSelection.toLowerCase()) 
            console.log('There is only two options: '+ options)
            continue
        }
        break
    }

    let response = null
    while(response == null) {
        response = playRound(playerSelection, computerSelection)
    }
    console.log(response)

}
())

