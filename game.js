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
        text: "You arrive in Twin Peaks, a small town in Washington, population 51,000. The dual spires from which the town earned its namesake loom in the distance, framed by lush douglas firs. You have been ordered to investigate the murder of high school senior Laura Palmer. Where do you start?",
        options: [
            {
                text: "The Roadhouse.",
                // setState: {
                //     cellPhone: true
                // },
                nextText: 2
            },
            {
                text: "The RR Diner.",
                nextText: 3
            },
            {
                text: "The Sheriff's Station",
                nextText: 4
            },
            {
                text: "The Great Northern Hotel",
                nextText: 5
            }
        ]
    },
    {
        id: 2,
        text: 'At the Road House, a man with a vaguely French accent polishes the counter. He does not greet you, but you catch his attention and speak to him despite his glower.',
        options: [
            {
                text: "'I'll take a whiskey, neat.'",
                // requiredState: (currentState) => currentState.cellPhone,
                // setState: {
                //     cellPhone: true,
                //     sword: true
                // },
                nextText: 6
            },
            {
                text: "'I'm looking for the Sheriff's office.'",
                // requiredState: (currentState) => currentState.cellPhone,
                // setState: {
                //     cellPhone: false
                // },
                nextText: 7
            },
            {
                text: "'You look like you're hiding a secret.'",
                nextText: 8
            }
        ]
    },
    {
        id: 3,
        text: "At the RR Diner, an attractive blonde woman approaches to take your order. She has an air of regret to her. You speak to her:",
        options: [
            {
                text: "'Cherry pie and a coffee, please.'",
                // requiredState: (currentState) => currentState.cellPhone,
                // setState: {
                //     cellPhone: true
                // },
                nextText: 9
            },
            {
                text: "'Where's the best place in town to stay?'",
                // requiredState: (currentState) => currentState.cellPhone,
                // setState: {
                //     cellPhone: false
                // },
                nextText: 10
            },
            {
                text: "'You look like you're hiding a secret.'",
                nextText: 11
            }
        ]
    },
    {
        id: 4,
        text: "The Sheriff's station is quaint but neat, and a diligent young woman with a nasal voice welcomes you in at the front.",
        options: [
            {
                text: "Introduce yourself and ask, 'Where can I find Sheriff Truman?'",
                nextText: 12
            },
            {
                text: "Ignore her and proceed toward the back of the building.",
                nextText: 13
            }
        ]
    },
    {
        id: 5,
        text: "The roar of a waterfall rushes in the distance behind the rustic Great Northern. Inside, the lobby, exposed beams and timber extend the rustic feel, along with primitive murals. To your right, you see a dark-haired girl peering around the corner. To your left, a businessman in a suit strides purposefully into the room. Directly ahead of you is the front desk.",
        options: [
            {
                text: "Accost the businessman and introduce yourself.",
                nextText: 14
            },
            {
                text: "Follow the dark-haired girl.",
                nextText: 15
            },
            {
                text: "Check into your room.",
                nextText: 16
            }
        ]
    },
    {
        id: 6,
        text: "The man silently pours your drink and watches as you down it in one go. The liquid is bracing. Glancing around, you notice a young, square-jawed man in a leather jacket sitting in the corner.",
        options: [
            {
                text: "Approach the young man.",
                nextText: 17
            },
            {
                text: "Leave the Roadhouse and head back to the main road.",
                nextText: 1
            }
        ]
    },
    {
        id: 7,
        text: "The man gives you directions from beneath surly eyebrows. As you turn to leave, he mutters under his breath about law enforcement types.",
        options: [
            {
                text: "Thank him and go on your way",
                // setState: {
                //     specimenJar: true
                // },
                nextText: 4
            },
            {
                text: "Ask him, 'Got something to hide?'",
                // setState: {
                //     noteBook: true
                // },
                nextText: 8
            },
        ]
    },
    {
        id: 8,
        text: "He stiffens and lowers his hands beneath the counter. Your hand goes to your hip, ready to draw your firearm, poised to respond at any sudden move. Suddenly, the man turns and runs toward the back.",
        options: [
            {
                text: "Draw your gun and order him to stop.",
                // requiredState: (currentState) => currentState.specimenJar,
                // setState: {

                // },
                nextText: 18
            },
            {
                text: "Run after him.",
                // setState: {
                //     specimenJar: false
                // }
                nextText: 19
            },
            {
                text: "Let him go -- he's not worth running after.",
                nextText: 20
            }
        ]
    },
    {
        id: 9,
        text: "She smiles pleasantly and returns in a few minutes with a decadent slice of pie and a cup of steaming hot coffee. “You're new around here,” she says.",
        options: [
            {
                text: "'I'm investigating the murder of one Laura Palmer.'",
                nextText: 21
            },
            {
                text: "'Yes, and I hear a girl named Laura Palmer was tragically murdered. Did you know her?'",
                nextText: 22
            },
            {
                text: "Sip your coffee enigmatically.",
                nextText: 23
            }
        ]
    },
    {
        id: 10,
        text: "'Oh, that'll be the Great Northern Hotel,' the woman says. 'Mr. Horne is the owner -- he's a prominent figure in Twin Peaks. And his daughter is the same age as poor --' she breaks off, as if she said too much.",
        options: [
            {
                text: "Thank her and leave for the hotel.",
                nextText: 5
            },
            {
                text: "'What was that about his daughter?'",
                nextText: 24
            },
            {
                text: "'Tell me more about Mr. Horne.'",
                nextText: 25
            }
        ]
    },
    {
        id: 11,
        text: "She looks startled, then embarrassed. She takes in your attire. 'You must be the FBI agent everyone is talking about. I guess it must be obvious to you. Well, it so happens that I'm anxious about my husband returning from prison this week.'",
        options: [
            {
                text: "Press her. 'I think there's more to it than that.",
                nextText: 26
            },
            {
                text: "'That seems perfectly understandable.'",
                nextText: 27
            },
        ]
    },
    {
        id: 12,
        text: "The young woman, whose name card reads 'Lucy,' smiles officiously. 'Sheriff Truman, there's someone here to see you. It's an FBI agent. I think it's about the Laura Palmer case.' At this, a dark-haired man in a tan uniform appears around the corner, hands perched on his belt.",
        options: [
            {
                text: "Ask him to review the details of the case.",
                nextText: 28
            },
            {
                text: "Request that he take you to the morgue to see Laura Palmer's body.",
                nextText: 29
            },
        ]
    },
    {
        id: 13,
        text: "At the rear of the station, you find a curly-haired man in uniform leaning over a conference table spread with donuts. He is accompanied by a similarly uniformed man with long black hair.",
        options: [
            {
                text: "Demand to know why they are snacking when a girl has been murdered.",
                nextText: 30
            },
            {
                text: "Help yourself to a donut.",
                nextText: ""
            },
        ]
    },
    {
        id: 14,
        text: "The harried businessman, whom you presume is Mr. Horne himself, almost charges into you in his haste. He apologizes but seems preoccupied still. In his hand, he holds a poker chip that he turns over and over in a nervous habit.",
        options: [
            {
                text: "Ask for information on Laura Palmer.",
                nextText: 31
            },
            {
                text: "Question him as to his role in the town.",
                nextText: 32
            },
            {
                text: "Leave him to his business, but pay attention when he disappears down the hall.",
                nextText: 33
            }
        ]
    },
    {
        id: 15,
        text: "The dark-haired girl flits off into a hallway. When you turn a corner, she's waiting for you. She smiles like an old-time movie starlet, and whispers conspiratorially. 'You're here about Laura Palmer, aren't you?'",
        options: [
            {
                text: "'I'm afraid I can't discuss federal investigations.'",
                nextText: 34
            },
            {
                text: "'Did you know Laura?'",
                nextText: 35
            }
        ]
    },
    {
        id: 16,
        text: "You check in at the desk and make your way to room 315. It's comfortable, decorated with the same rustic style-- antlers, timber, and lamplight-- and through the window you can just see the waterfall outside. The first thing you do is",
        options: [
            {
                text: "Place a call to the sheriff to schedule a time for the autopsy.",
                nextText: ""
            },
            {
                text: "Order room service",
                nextText: ""
            },
            {
                text: "Go to bed -- although it's mid-afternoon, you could use a nap.",
                nextText: ""
            }
        ]
    },
    {
        id: 17,
        text: "The young man visibly recoils when he sees you coming his way. He's obviously been crying, and seems to be hiding something. Maybe everyone in this town is hiding something.",
        options: [
            {
                text: "'No need to be worried, son. Maybe you can help me. Did you know a Miss Laura Palmer?'",
                nextText: 36
            },
            {
                text: "'Young man, I'm with the FBI. I need to ask you some questions about the murder of Laura Palmer.'",
                nextText: 37
            }
        ]
    },
    {
        id: 18,
        text: "The man doesn't listen, but bursts through a back door, leaving you stuck on the other side of the bar.",
        options: [
            {
                text: "head back to the main road.",
                nextText: 1
            }
        ]
    },
    {
        id: 19,
        text: "You leap over the bar as he runs toward the back door, and just barely miss him when he squeaks through, out of your grasp. You notice that he has dropped something. It is a poker chip that reads 'One Eyed Jacks.'",
        options: [
            {

            }
        ]
    },
    {
        id: 20,
        text: "You leave the man for now, and consider your next move.",
        options: [
            {
                text: "Speak to the young man in the corner.",
                nextText: 17
            },
            {
                text: "Head back to the main road",
                nextText: 1
            },
            {
                text: "Go to the morgue.",
                nextText: 29
            }
        ]
    },
    {
        id: 21,
        text: "The woman casts her gaze down sadly. 'We were all so sad to hear about Laura. What a tragic event. Everyone loved her. She was a volunteer for Meals on Wheels with Shelly, one of the servers here, and had such a generous spirit.'",
        options: [
            {
                text: "Ask for a list of the Meals on Wheels customers.",
                nextText: ""
            },
            {
                text: "Order another slice of pie.",
                nextText: ""
            }
        ]
    },
    {
        id: 22,
        text: "She swallows. 'Well, I wasn't exactly close with her, but she did volunteer for Meals on Wheels regularly. Shelly probably knew her better. She won't be in for her shift for another few hours, but I can tell you where she lives.'",
        options: [
            {
                text: "Go to Shelly's house.",
                nextText: ""
            }
        ]
    },
    {
        id: 23,
        text: "Watching you from the corner of her eye, the woman continues puttering around the diner, greeting the other customers by name. A lean, older man with greying brown hair wanders in and her smile warms. 'Hi there, Ed. The usual?' You observe them chatting personably for a couple of minutes.",
        options: [
            {
                text: "Leave a tip and head for the morgue.",
                nextText: 29
            },
            {
                text: "Talk to Ed.",
                nextText: ""
            }
        ]
    },
    {
        id: 24,
        text: "She regains her composure quickly. 'Audrey Horne -- Ben Horne's daughter -- she's the same age as Laura had been. It's sad to see a life cut short like that. And Audrey has a lot of untapped potential, if only her father would let her be more than a spoiled little rich girl.'",
        options: [
            {
                text: "",
                nextText: ""
            }
        ]
    },
    {
        id: 25,
        text: "'Mr. Horne owns the Great Northern, like I said, as well as Horne's Department Store. His latest project is some type of development in Ghostwood National Forest. He's responsible for a lot of the economic growth in town, although I like to think that small businesses like mine play a part, too.'",
        options: [
            {
                text: "'Ghostwood forest?'",
                nextText: ""
            }
        ]
    },
    {
        id: 26,
        text: "She looks down shyly, or perhaps ashamedly. 'I'm partly anxious because Hank doesn't have the best track record -- he's in prison for murder, after all -- and because of some unresolved feelings I have from before my marriage to Hank.'",
        options: [
            {
                text: "",
                nextText: ""
            }
        ]
    },
    {
        id: 27,
        text: "'Thanks for listening,' she says. 'Have a piece of pie to go, on me.'",
        options: [
            {
                text: "Head out to the main road.",
                nextText: 1
            }
        ]
    },
    {
        id: 28,
        text: "Sheriff Truman leads you to a conference room in the back, where two of his deputies -- Hawk and Andy -- join you. 'What we know so far is that Laura was found in the early morning hours by Pete Martell at the Packard Sawmill. She was naked, wrapped in plastic.'",
        options: [
            {
                text: "",
                nextText: ""
            }
        ]
    },
    {
        id: 29,
        text: "The Sheriff and his two deputies meet you at Calhoun Memorial Hospital, where Doctor Hayward awaits to perform the autopsy. He notes the bite marks, lesions on her wrists and ankles, and explains that she had sex with several people prior to her death.",
        options: [
            {
                text: "",
                nextText: ""
            }
        ]
    }
]

startGame();