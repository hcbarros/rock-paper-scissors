
const players = ['Rock','Paper','Scissors']
const playersPoints = {Rock: 0, Paper: 0, Scissors: 0}
let playerSelection = null
let computerSelection = null


function getComputerChoice() {
    return players[Math.floor(Math.random() * 3)]
}

function shuffle() {
    return [true, false].sort(() => .2 - Math.random())
}


function playRound(computer, h2) {
    const selection = computer ? computerSelection : playerSelection
    playersPoints[selection] += 1
    console.log(`${selection} made 01 point. Total: ${playersPoints[selection]} points`)
    h2.textContent = playerSelection + ' ' + playersPoints[playerSelection] + ' X ' + 
                     computerSelection + ' ' + playersPoints[computerSelection]  
    if(playersPoints[selection] == 5 && computer) {
        createElement('h3', `${'\n'}You lose! ${selection} beats ${playerSelection}`, h2, '')
    }
    else if(playersPoints[selection] == 5 && !computer) {
        createElement('h3', `${'\n'}You won! ${selection} beats ${computerSelection}`, h2, '')
    }
    return playersPoints[selection]
}


(function game() {
    computerSelection = getComputerChoice()

    addElements()

    console.log(`The computer chose ${computerSelection}`)
}())


function createButtons(containerButtons) {
    return players.map(p => {
        const textContent = p + ((computerSelection == p) ? ' (computer)' : '')
        const style = `color: #fff; font-weight: bold; font-size: 17px; min-width: 75px; width: 17vw; height: 50px; outline: none;
                border-radius: 5px; background: blue; cursor:${computerSelection == p ? 'not-allowed' : 'pointer'}; opacity:${computerSelection == p ? 0.5 : 1}`
        const btn = createElement('button', textContent, containerButtons, style)
        btn.disabled = computerSelection == p
        return btn
    })
}


function actionPlayers(containerButtons, h2) {
    
    const buttons = createButtons(containerButtons)
      
    buttons.map(button => {

        button.addEventListener('click', (e) => {

            e.target.disabled = true
            e.target.style.opacity = 0.5
            playerSelection = e.target.textContent    

            let computer
            buttons.map(b => {
                if(b.textContent != playerSelection) {
                    b.disabled = true
                    b.style.cursor = 'not-allowed'
                    b.style.opacity = 0.5
                    if(b.textContent.includes   ('computer')) computer = b
                }
            })
            
            const sort = shuffle()    

            const points = playRound(sort[0], h2)
            if(points == 5) {
                return 
            }
            
            computer.textContent = 'loading...'

            setTimeout(() => {      
                computer.textContent = computerSelection + ' (computer)'
                playRound(sort[1], h2)
                e.target.disabled = false
                e.target.style.opacity = 1
            }, 1000)
        })
    })
}


function addElements() {

    let style = 'margin:auto; display:flex; align-items:center; justify-content:center; flex-direction: column; ' +
        'border: 2px #000 solid; border-radius: 10px; width: 70vw; min-width: 230px; height: 90vh'
    const main = createElement('div', '', document.body, style)

    createElement('h2', 'Choice player name', main, 'text-align: center')

    style = 'display:flex; align-items:center; width: 95%; justify-content: space-between; min-height: 100px'
    
    const containerButtons = createElement('div', '', main, style)

    const h2 = createElement('h2', '', main, 'text-align: center; margin-top: 50px')

    actionPlayers(containerButtons, h2)
}


function createElement(tag, textContent, parent, style) {
    const element = document.createElement(tag)
    element.textContent = textContent
    element.setAttribute('style', style)
    parent.appendChild(element)
    return element
}



