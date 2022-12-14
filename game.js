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
        text: "You wake up on the forest floor, lying on your back. It is mid afternoon, and the foliage is orange and yellow. What do you do next?",
        options: [
            {
                text: "Check your pockets.",
                setState: {
                    cellPhone: true
                },
                nextText: 2
            },
            {
                text: "Slowly stand.",
                nextText: 5
            }
        ]
    },
    {
        id: 2,
        text: 'In your right pocket is your Nokia flip phone. A voicemail message blinks at you from the screen.',
        options: [
            {
                text: "Play the message.",
                requiredState: (currentState) => currentState.cellPhone,
                setState: {
                    cellPhone: true,
                    sword: true
                },
                nextText: 3
            },
            {
                text: "Drop the phone and stand up slowly.",
                requiredState: (currentState) => currentState.cellPhone,
                setState: {
                    cellPhone: false
                },
                nextText: 5
            }
        ]
    },
    {
        id: 3,
        text: "The message plays: 'Hey honey. Don't stay out too late, okay? I already headed home and started on dinner. Love you!' then ends. The contact is listed as 'Ray' in your phone.",
        options: [
            {
                text: "Send a text message to Ray: 'On my way!'",
                requiredState: (currentState) => currentState.cellPhone,
                setState: {
                    cellPhone: true
                },
                nextText: 4
            },
            {
                text: "Drop the phone and stand up slowly.",
                requiredState: (currentState) => currentState.cellPhone,
                setState: {
                    cellPhone: false
                },
                nextText: 5
            }
        ]
    },
    {
        id: 4,
        text: "Once you hit 'send,' you pull yourself to your feet. A weird feeling washes over you; a pounding at the back of your head. Someone calls your name.",
        options: [
            {
                text: "Ignore the voice and take in your surroundings.",
                nextText: 7
            }
        ]
    },
    {
        id: 5,
        text: "As you stand, you feel your head pounding. It seems like you have an injury; maybe a concussion. Your vision swims and you a hear an oddly familiar voice call your name.",
        options: [
            {
                text: "Look around for the voice.",
                nextText: 6
            }
        ]
    },
    {
        id: 6,
        text: "You're not sure where the voice came from, but when you turn around you see a blurry figure. You struggle to focus. When you realize what you're looking at, you wonder if you're staring into the mirror, or if you hit your head harder than you thought.",
        options: [
            {
                text: "Ask, 'what are you?'",
                nextText: ""
            },
            {
                text: "Try to fight the mysterious figure.",
                nextText: ""
            }
        ]
    },
    {
        id: 7,
        text: "Littering the ground are various and sundry notebooks, tools, and scientific-looking apparatus. A broken specimen jar to one side seemed to have once housed some kind of organic matter.",
        options: [
            {
                text: "Pick up the jar.",
                setState: {
                    specimenJar: true
                },
                nextText: ""
            },
            {
                text: "Open one of the notebooks.",
                setState: {
                    noteBook: true
                },
                nextText: ""
            }
        ]
    }
]

startGame();