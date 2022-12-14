const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

let state = {};

function startGame() {
    // set up the game to the states it needs to be in to begin fresh
    state = {}
    showTextNode(1);
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option));
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
    if (nextTextNodeId <= 0) {
        return startGame()
    }
}

const textNodes = [
    {
        id: 1,
        text: "You wake up in a strange place and see a jar of blue goo in front of you.",
        options: [
            {
                text: "Take goo",
                setState: {
                    blueGoo: true
                },
                nextText: 2
            },
            {
                text: "Leave the goo",
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'You venture forth in searh of answers and come across a merchant.',
        options: [
            {
                text: "Trade the goo for a sword.",
                requiredState: (currentState) => currentState.blueGoo,
                setState: {
                    blueGoo: false,
                    sword: true
                },
                nextText: 3
            },
            {
                text: "Trade the goo for a shield.",
                requiredState: (currentState) => currentState.blueGoo,
                setState: {
                    blueGoo: false,
                    shield: true
                },
                nextText: 3
            },
            {
                text: "Ignore the merchant",
                nextText: 3
            }
        ]
    }
]

startGame();