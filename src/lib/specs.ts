// information taken from https://docs.google.com/spreadsheets/d/1jbE0vujOeOzc4oSfkqbOxmL9IiEaln2w_IOkmN60rQY/edit

// cards

function generateTimeBonus(id: number, minutes: number): TimeCard {
  return {
    id,
    type: 'time',
    title: `${minutes} Minute Bonus`,
    duration: minutes,
  }
}

function repeat(card: GameCard, times: number) {
  return Array.from({ length: times }).map((_, i) => ({
    ...card,
    id: card.id + i,
  }))
}

const RANDOMIZE: GameCard = {
  id: 56,
  type: 'powerup',
  title: 'Randomize',
  description:
    'When a question is asked, you may play this card. The seekers must choose another question from the same category at random and ask it instead. The original question is NOT considered asked.',
}

const VETO: GameCard = {
  id: 60,
  type: 'powerup',
  title: 'Veto',
  description:
    'When a question is asked, you may play this card instead of providing an answer. The question IS considered asked, but you may not draw cards.',
}

const DUPLICATE: GameCard = {
  id: 64,
  type: 'powerup',
  title: 'Duplicate',
  description: 'You may play this card as an exact copy of another card in your hand.',
}

const MOVE: GameCard = {
  id: 66,
  type: 'powerup',
  title: 'Move',
  description:
    'Discard your hand and send the hiders the location of your transit station. You get 60 minutes to hide somewhere else on the game map. The seeker(s) are frozen and your timer is paused in this time. This card cannot be played during the endgame.',
}

const DISCARD1: GameCard = {
  id: 67,
  type: 'powerup',
  title: 'Discard 1, Draw 2',
  description: 'You discard 1 card and draw 2 cards.',
}

const DISCARD2: GameCard = {
  id: 71,
  type: 'powerup',
  title: 'Discard 2, Draw 3',
  description: 'You discard 2 cards and draw 3 cards.',
}

const EXPAND: GameCard = {
  id: 75,
  type: 'powerup',
  title: 'Draw 1, Expand 1',
  description: 'You draw 1 card and expand your hand size by 1.',
}

function generateCurses(size: 'small' | 'medium' | 'large'): GameCard[] {
  return [
    {
      id: 77,
      type: 'curse',
      title: 'Curse of the Zoologist',
      description:
        'Take a photo of a wild fish, bird, mammal, reptile, amphibian or bug. The seeker(s) must take a picture of a wild animal in the same category before  asking another question.',
      cost: 'A photo of an animal',
    },
    {
      id: 78,
      type: 'curse',
      title: 'Curse of the Unguided Tourist',
      description:
        'Send the seeker(s) an unzoomed google Street View image from a street within 500ft (152m) of where they are now. The shot has to be parallel to the horizon and include at least one human-built structure other than a road. Without using the internet for research, they must find what you sent them in real life before they can use transportation or ask another question. They must send a picture the hiders for verification.',
      cost: 'Seeker(s) must be outside',
    },
    {
      id: 79,
      type: 'curse',
      title: 'Curse of the Endless Tumble',
      description: `Seeker(s) must roll a die at least 100ft (30m) and have it land on a 5 or a 6 before they can ask another question. The die must roll the full distance, unaided, using only the momentum from the initial throw and gravity to travel the 100ft (30m). If the seeker(s) accidentally hit someone with a die you are awarded a ${{ small: 10, medium: 20, large: 30 }[size]} minute bonus.`,
      cost: 'Roll a die. If its 5 or 6 this card has no effect.',
    },
    {
      id: 80,
      type: 'curse',
      title: 'Curse of the Hidden Hangman',
      description:
        'Before asking another question or boarding another form of transportation, seeker(s) must be the hider(s) in game of hangman.',
      cost: 'Discard 2 cards',
    },
    {
      id: 81,
      type: 'curse',
      title: 'Curse of the Overflowing Chalice',
      description:
        'For the next three questions, you may draw (not keep) an additional card when drawing from the hider deck.',
      cost: 'Discard a card',
    },
    {
      id: 82,
      type: 'curse',
      title: 'Curse of the Mediocre Travel Agent',
      description: `Choose any publicly-accessible place within ${{ small: 0.25, medium: 0.25, large: 0.5 }[size]}mi ${{ small: 0.4, medium: 0.4, large: 0.5 }[size]}km of the seeker(s) current location. They cannot currently be on transit. They must go there, and spend at least ${{ small: 5, medium: 5, large: 10 }[size]} minutes there, before asking another question. They must send you at least three photos of them enjoying their vacation, and procure an object to bring you as souvenir. If this souvenir is lost before they can get to you, you are awarded and extra ${{ small: 30, medium: 45, large: 60 }[size]} minutes.`,
      cost: 'Their vacation destination must be further from you than their current location',
    },
    {
      id: 83,
      type: 'curse',
      title: 'Curse of the Luxury Car',
      description:
        'Take a photo of a car. The seekers must take a photo of a more expensive car before asking another question.',
      cost: 'A photo of a car',
    },
    {
      id: 84,
      type: 'curse',
      title: 'Curse of the U-Turn',
      description: `Seeker(s) must disembark their current mode of transportation at the next station (as long as that station is served by another form of transit in the next ${{ small: 0.5, medium: 0.5, large: 1 }[size]} hour(s)) and take at least one stop in the opposite direction.`,
      cost: 'Seekers must be heading the wrong way. (Their next station is further from you then they are.)',
    },
    {
      id: 85,
      type: 'curse',
      title: 'Curse of the Bridge Troll',
      description: 'The seekers must ask their next question from under a bridge.',
      cost: `Seekers Must be at least ${{ small: 1, medium: 5, large: 30 }[size]}mi ${{ small: 0.3, medium: 1.5, large: 9.1 }[size]}km from you`,
    },
    {
      id: 86,
      type: 'curse',
      title: 'Curse of Water Weight',
      description: `Seeker(s) must acquire and carry at least 2 liters of liquid per seeker for the rest of your run. They cannot ask another question until they have acquired the liquid. The water may be distributed between seeker as they see fit. If the liquid is lost or abandoned at any point the hider is awarded a ${{ small: 30, medium: 30, large: 60 }[size]} minute bonus.`,
      cost: 'Seekers must be within 1,000ft (300 meters) of a body of water',
    },
    {
      id: 87,
      type: 'curse',
      title: 'Curse of the Jammed Door',
      description: `For the next ${{ small: 0.5, medium: 1, large: 3 }[size]} hours, whenever the seeker(s) want to pass through a doorway into a building, business, train, or other vehicle they must first roll 2 dice. If they do not roll a 7 or higher they cannot enter that space (including through other doorways) any given doorway can be reattempted after ${{ small: 5, medium: 10, large: 15 }[size]} minutes.`,
      cost: 'Discard 2 cards',
    },
    {
      id: 88,
      type: 'curse',
      title: 'Curse of the Cairn',
      description:
        'You have one attempt to stack as many rocks on top of each other as you can in a freestanding tower. Each rock may only touch one other rock. Once you have added a rock to the tower it may not be removed. Before adding another rock, the tower must stand for at least 5 seconds. If at any point any rock other then the base rock touches the ground, your tower has fallen. Once your tower falls tell the seekers how many rocks high your tower was when it last stood for five seconds. The seekers must then construct a rock tower of the same number of rucks, under the same parameters before asking another question. If their tower falls they must restart. The rocks must be found in nature and both teams must disperse the rocks after building.',
      cost: 'Build a rock tower',
    },
    {
      id: 89,
      type: 'curse',
      title: 'Curse of the Urban Explorer',
      description:
        'For the rest of the run seekers cannot ask question when they are on transit or in a train station.',
      cost: 'Discard 2 cards',
    },
    {
      id: 90,
      type: 'curse',
      title: 'Curse of the Impressionable Consumer',
      description:
        'Seekers must enter and gain admission (if applicable) to a location or buy a product that they saw an advertisement for before asking another question. This advertisement musts be found out in the world and must be at least 100ft (30m) from the product or location itself.',
      cost: "The seekers' next question is free",
    },
    {
      id: 91,
      type: 'curse',
      title: 'Curse of the Egg Partner',
      description: `Seeker(s) must acquire an egg before asking another question. This egg is now treated as an official team member of the seekers. If any team members are abandoned or killed (defined as crack in the eggs case) before the end of your run you are awarded an extra ${{ small: 30, medium: 45, large: 60 }[size]} minutes. This curse cannot be played during the endgame.`,
      cost: 'Discard 2 cards',
    },
    {
      id: 92,
      type: 'curse',
      title: 'Curse of the Distant Cuisine',
      description:
        'Find a restaurant within your zone that explicitly serves food from a specific foreign country. The seekers must visit a restaurant serving food from a country that is equal or great distance away before asking another question.',
      cost: 'You must be at the restaurant',
    },
    {
      id: 93,
      type: 'curse',
      title: 'Curse of the Right Turn',
      description: `For the next ${{ small: 20, medium: 40, large: 60 }[size]} minutes the seekers can only turn right at any street intersection. If at any point they find themselves in dead end where they cannot continue forward or turn right for another 1,000ft (304m) they must do a full 180. A right turn is defined as a road at any angle that veers to the right of the seekers.`,
      cost: 'Discard a card',
    },
    {
      id: 94,
      type: 'curse',
      title: 'Curse of the Labyrinth',
      description: `Spend up to ${{ small: 10, medium: 20, large: 30 }[size]} minutes drawing a solvable maze and send a photo of it to the seekers. You cannot use the internet to research maze designs. The seekers musts solve the maze before asking another question.`,
      cost: 'Draw a maze',
    },
    {
      id: 95,
      type: 'curse',
      title: 'Curse of the Bird Guide',
      description: `You have one chance to film a bird for as long as possible. Up to ${{ small: 5, medium: 10, large: 15 }[size]} minutes straight, if at any point the bird leaves the frame your timer is stopped. The seekers must then film a bird for the same amount of time or longer before asking another question.`,
      cost: 'Film a bird',
    },
    {
      id: 96,
      type: 'curse',
      title: 'Curse of Spotty Memory',
      description:
        'For the rest of the run, one random category of questions will be disabled at all times. After this curse is played seeker(s) must roll a die to determine the category of questions to be disabled. The catergy remain disabled until the next question is asked at which point a die is rolled again to choose an e category. The same category can be disabled multiple times in a row.',
      cost: 'Discard a time bonus card',
    },
    {
      id: 97,
      type: 'curse',
      title: 'Curse of the Lemon Phylactery',
      description: `Before asking another question the seeker(s) must each find a lemon and affix it to their outermost layer of their clothes or skin. If at any point one of these lemons is no longer touching a seeker you are awarded ${{ small: 30, medium: 45, large: 60 }[size]} minutes. This curse cannot be played during the endgame.`,
      cost: 'Discard a powerup card',
    },
    {
      id: 98,
      type: 'curse',
      title: 'Curse of the Drained Brain',
      description:
        'Choose three questions in different categories. The seekers cannot ask those questions for the rest of the run.',
      cost: 'Discard your hand',
    },
    {
      id: 99,
      type: 'curse',
      title: 'Curse of the Ransom Note',
      description:
        'The next question that the seekers ask must be composed of words and letters cut out of any printed material. The question must be coherent and include at least 5 words.',
      cost: 'Spell out "Ransom Note" as a ransom note (without using this card)',
    },
    {
      id: 100,
      type: 'curse',
      title: "Curse of the Gambler's Feet",
      description: `For the next ${{ small: 20, medium: 40, large: 60 }[size]} minutes seekers must roll a die before they take any steps in any direction. They may take that many steps before rolling again`,
      cost: "Roll a die; if it's a even number, this curse has no effect",
    },
  ]
}

// questions

const MATCHING: GameQuestion = {
  id: 1,
  name: 'Matching',
  question: 'Is your nearest _____ the same as my nearest _____?',
  draw: 3,
  keep: 1,
  time: 5,
  options: [
    { id: 1, text: 'Commercial Airport' },
    { id: 2, text: 'Transit Line' },
    { id: 3, text: "Station's Name Length" },
    { id: 4, text: 'Street or Path' },
    { id: 5, text: '1st Admin (State)' },
    { id: 6, text: '2nd Admin (County)' },
    { id: 7, text: '3rd Admin (Municipality | City | Town)' },
    { id: 8, text: '4th Admin (Borough)' },
    { id: 9, text: 'Mountain' },
    { id: 10, text: 'Landmass' },
    { id: 11, text: 'Park' },
    { id: 12, text: 'Amusement Park' },
    { id: 13, text: 'Zoo' },
    { id: 14, text: 'Aquarium' },
    { id: 15, text: 'Golf Course' },
    { id: 16, text: 'Museum' },
    { id: 17, text: 'Movie Theatre' },
    { id: 18, text: 'Hospital' },
    { id: 19, text: 'Library' },
    { id: 20, text: 'Foreign Consulate' },
  ],
}

const MEASURING: GameQuestion = {
  id: 2,
  name: 'Measuring',
  question: 'Compared to me, are you closer to or further from _____?',
  draw: 3,
  keep: 1,
  time: 5,
  options: [
    { id: 1, text: 'A Commercial Airport' },
    { id: 2, text: 'A High Speed Train Line' },
    { id: 3, text: 'A Rail Station' },
    { id: 4, text: 'An International Border' },
    { id: 5, text: 'A 1st Admin Border (State)' },
    { id: 6, text: 'A 2nd Admin Border (County)' },
    { id: 7, text: 'A 3rd Admin Border (Municipality | City | Town)' },
    { id: 8, text: 'A 4th Admin Border (Borough)' },
    { id: 9, text: 'Sea Level' },
    { id: 10, text: 'A Body of Water' },
    { id: 11, text: 'A Coastline' },
    { id: 12, text: 'A Mountain' },
    { id: 13, text: 'A Park' },
    { id: 14, text: 'Amusement Park' },
    { id: 15, text: 'Zoo' },
    { id: 16, text: 'Aquarium' },
    { id: 17, text: 'Golf Course' },
    { id: 18, text: 'Museum' },
    { id: 19, text: 'Movie Theatre' },
    { id: 20, text: 'Hospital' },
    { id: 21, text: 'Library' },
    { id: 22, text: 'Foreign Consulate' },
  ],
}

const THERMOMETER: GameQuestion = {
  id: 3,
  name: 'Thermometer',
  question: 'I just traveled (at least) _____. Am I hotter or colder?',
  draw: 2,
  keep: 1,
  time: 5,
  options: [
    { id: 1, text: '805m (0.5mi)' },
    { id: 2, text: '4.8km (3mi)' },
  ],
}

const THERMOMETER2: GameQuestion = {
  ...THERMOMETER,
  options: [...THERMOMETER.options, { id: 3, text: '16km (10mi)' }],
}

const THERMOMETER3: GameQuestion = {
  ...THERMOMETER2,
  options: [...THERMOMETER2.options, { id: 4, text: '80km (50mi)' }],
}

const RADAR: GameQuestion = {
  id: 4,
  name: 'Radar',
  question: 'Are you within _____ of me?',
  draw: 2,
  keep: 1,
  time: 5,
  options: [
    { id: 1, text: '402m (0.25mi)' },
    { id: 2, text: '805m (0.5mi)' },
    { id: 3, text: '1.6km (1mi)' },
    { id: 4, text: '4.8km (3mi)' },
    { id: 5, text: '8km (5mi)' },
    { id: 6, text: '16km (10mi)' },
    { id: 7, text: '40km (25mi)' },
    { id: 8, text: '80.5km (50mi)' },
    { id: 9, text: '160.9km (100mi)' },
  ],
}

const TENTACLES2: GameQuestion = {
  id: 5,
  name: 'Tentacles',
  question: 'Of all the _____ within _____ of me, which are you closest to?',
  draw: 4,
  keep: 2,
  time: 5,
  options: [
    { id: 1, text: 'Museums, 1.6km (1mi)' },
    { id: 2, text: 'Libraries, 1.6km (1mi)' },
    { id: 3, text: 'Movie Theatres, 1.6km (1mi)' },
    { id: 4, text: 'Hospitals, 1.6km (1mi)' },
  ],
}

const TENTACLES3: GameQuestion = {
  ...TENTACLES2,
  options: [
    ...TENTACLES2.options,
    { id: 5, text: 'Metro Lines, 24.1km (15mi)' },
    { id: 6, text: 'Zoos, 24.1km (15mi)' },
    { id: 7, text: 'Aquariums, 24.1km (15mi)' },
    { id: 8, text: 'Amusment Parks, 24.1km (15mi)' },
  ],
}

const PHOTOS: GameQuestion = {
  id: 6,
  name: 'Photo',
  question: 'Send a photo of _____.',
  draw: 1,
  keep: 1,
  time: 10,
  options: [
    { id: 1, text: 'A Tree', description: 'Must include the entire tree' },
    { id: 2, text: 'The Sky', description: 'Place phone on ground and shoot directly up' },
    { id: 3, text: 'You', description: 'Selfie mode, arm parallel to the ground, fully extended' },
    { id: 4, text: 'Widest Street', description: 'Must include both sides of the street' },
    {
      id: 5,
      text: 'Tallest Structure in Your Sightline',
      description:
        'Tallest from your current perspective / sightline. Must include top and both sides. The top must be in the top 1/3rd of frame',
    },
    {
      id: 6,
      text: 'Any Building Visible from Station',
      description:
        'Must stand directly outside transit station entrance. If multiple entrances you may choose. Must include roof, boths sides, with the top of the building in the top 1/3rd of frame',
    },
  ],
}

const PHOTOS2: GameQuestion = {
  ...PHOTOS,
  options: [
    ...PHOTOS.options,
    {
      id: 7,
      text: 'Tallest Building Visible from Station',
      description:
        'Tallest from your perspective / sightline.Must stand directly outside transit station entrance. If multiple entrances you may choose. Must include roof, boths sides, with the top of the building in the top 1/3rd of frame',
    },
    {
      id: 8,
      text: 'Trace Nearest Street / Path',
      description:
        'Street / Path must be visible on mapping app. Trace intersection to intersection',
    },
    {
      id: 9,
      text: 'Two Buildings',
      description: "Must include 5'x5' section with three distinct elements",
    },
    {
      id: 10,
      text: 'Restaurant Interior',
      description: 'No zoom, must take photo from outside through window',
    },
    {
      id: 11,
      text: 'Train Platform',
      description: "Must include 5'x5' section with three distinct elements",
    },
    {
      id: 12,
      text: 'Park',
      description:
        "No zoom, phone perpendicular to ground, must stand 5' away from any obstruction",
    },
    {
      id: 13,
      text: 'Grocery Store Aisle',
      description: 'No zoom, stand at the end of the aisle, shoot directly down aisle.',
    },
    {
      id: 14,
      text: 'Place of Worship',
      description: "Must include 5'x5' section with three distinct elements",
    },
  ],
}

const PHOTOS3: GameQuestion = {
  ...PHOTOS2,
  time: 20,
  options: [
    ...PHOTOS2.options,
    {
      id: 15,
      text: '1/2 Mile of Streets Traced',
      description:
        'Must be continuous, include 5 turns, no doubling back, send N-S Oriented, streets must appear on mapping app.',
    },
    {
      id: 16,
      text: 'Tallest Mountain Visible from Station',
      description:
        'Tallest form you perspective / sightline. Must be 3x zoom. Top of mountain must be in top 1/3rd of frame',
    },
    {
      id: 17,
      text: 'Biggest body of water in your zone',
      description: 'Max 3x zoom. Must include either both sides of water OR the horizon.',
    },
    {
      id: 18,
      text: 'Five Buildings',
      description: 'Must include bottom and up to four stories',
    },
  ],
}

const specs: GameSpec[] = [
  {
    id: 'jltg-small',
    name: 'Jet Lag: The Game (small)',
    deck: [
      ...repeat(generateTimeBonus(1, 2), 25),
      ...repeat(generateTimeBonus(26, 4), 15),
      ...repeat(generateTimeBonus(41, 6), 10),
      ...repeat(generateTimeBonus(51, 8), 3),
      ...repeat(generateTimeBonus(54, 12), 2),
      ...repeat(RANDOMIZE, 4),
      ...repeat(VETO, 4),
      ...repeat(DUPLICATE, 2),
      MOVE,
      ...repeat(DISCARD1, 4),
      ...repeat(DISCARD2, 4),
      ...repeat(EXPAND, 2),
      ...generateCurses('small'),
    ],
    questions: [MATCHING, MEASURING, THERMOMETER, RADAR, PHOTOS],
  },
  {
    id: 'jltg-medium',
    name: 'Jet Lag: The Game (medium)',
    deck: [
      ...repeat(generateTimeBonus(1, 3), 25),
      ...repeat(generateTimeBonus(26, 6), 15),
      ...repeat(generateTimeBonus(41, 9), 10),
      ...repeat(generateTimeBonus(51, 12), 3),
      ...repeat(generateTimeBonus(54, 18), 2),
      ...repeat(RANDOMIZE, 4),
      ...repeat(VETO, 4),
      ...repeat(DUPLICATE, 2),
      MOVE,
      ...repeat(DISCARD1, 4),
      ...repeat(DISCARD2, 4),
      ...repeat(EXPAND, 2),
      ...generateCurses('medium'),
    ],
    questions: [MATCHING, MEASURING, THERMOMETER2, RADAR, TENTACLES2, PHOTOS2],
  },
  {
    id: 'jltg-large',
    name: 'Jet Lag: The Game (large)',
    deck: [
      ...repeat(generateTimeBonus(1, 5), 25),
      ...repeat(generateTimeBonus(26, 10), 15),
      ...repeat(generateTimeBonus(41, 15), 10),
      ...repeat(generateTimeBonus(51, 20), 3),
      ...repeat(generateTimeBonus(54, 30), 2),
      ...repeat(RANDOMIZE, 4),
      ...repeat(VETO, 4),
      ...repeat(DUPLICATE, 2),
      MOVE,
      ...repeat(DISCARD1, 4),
      ...repeat(DISCARD2, 4),
      ...repeat(EXPAND, 2),
      ...generateCurses('large'),
    ],
    questions: [MATCHING, MEASURING, THERMOMETER3, RADAR, TENTACLES3, PHOTOS3],
  },
]

export default specs
