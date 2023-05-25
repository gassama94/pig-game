import random

# Selecting players
player0El = None  # Replace None with the appropriate player element
player1El = None  # Replace None with the appropriate player element

# Scores
score0El = None  # Replace None with the appropriate score element
score1El = None  # Replace None with the appropriate score element

# Current score
current0El = None  # Replace None with the appropriate current score element
current1El = None  # Replace None with the appropriate current score element

# The dice image
diceEl = None  # Replace None with the appropriate dice element

# Buttons
btnNew = None  # Replace None with the appropriate new game button element
btnRoll = None  # Replace None with the appropriate roll button element
btnHold = None  # Replace None with the appropriate hold button element

# Starting conditions
score0El.textContent = 0
score1El.textContent = 0
diceEl.classList.add("hidden")

scores = [0, 0]
currentScore = 0
activePlayer = 0
playing = True

def switchPlayer():
    global currentScore, activePlayer
    document.getElementById(f"current--{activePlayer}").textContent = 0
    currentScore = 0
    activePlayer = 1 if activePlayer == 0 else 0
    player0El.classList.toggle("player--active")
    player1El.classList.toggle("player--active")

def rollDice():
    if playing:
        dice = random.randint(1, 6)
        diceEl.classList.remove("hidden")
        diceEl.src = f"dice-{dice}.png"
        if dice != 1:
            currentScore += dice
            document.getElementById(f"current--{activePlayer}").textContent = currentScore
        else:
            switchPlayer()

def holdScore():
    if playing:
        scores[activePlayer] += currentScore
        document.getElementById(f"score--{activePlayer}").textContent = scores[activePlayer]
        if scores[activePlayer] >= 20:
            playing = False
            diceEl.classList.add("hidden")
            if scores[activePlayer] >= 20:
                document.getElementById(f"name--{activePlayer}").textContent = "WINNER 🏆"
                document.getElementById(f"name--{1 - activePlayer}").textContent = "LOSER 😭"
            else:
                document.getElementById(f"name--{activePlayer}").textContent = "LOSER 😭"
                document.getElementById(f"name--{1 - activePlayer}").textContent = "WINNER 🏆"
            document.querySelector(f".player--{activePlayer}").classList.add("player--winner")
            document.querySelector(f".player--{activePlayer}").classList.remove(".player--active")
        else:
            switchPlayer()

def newGame():
    global scores, currentScore, activePlayer, playing
    scores = [0, 0]
    currentScore = 0
    activePlayer = 0
    playing = True

    score0El.textContent = 0
    score1El.textContent = 0
    current0El.textContent = 0
    current1El.textContent = 0

    diceEl.classList.add("hidden")

    player0El.classList.remove("player--winner")
    player1El.classList.remove("player--winner")

    document.getElementById("name--1").textContent = "Player 2"
    document.getElementById("name--0").textContent = "Player 1"

    player1El.classList.remove("player--active")
    player0El.classList.add("player--active")

btnRoll.addEventListener("click", rollDice)
btnHold.addEventListener("click", holdScore)
btnNew.addEventListener("click", newGame)
