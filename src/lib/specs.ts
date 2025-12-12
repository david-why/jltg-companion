const specs: GameSpec[] = [
  {
    id: 'test',
    name: 'Test Game',
    deck: [
      {
        id: 1,
        type: 'curse',
        title: 'Curse of the Test',
        description:
          'The chaser(s) must escape the testing facility before asking another question.',
        cost: 'A picture of your portal gun',
      },
      {
        id: 1001,
        type: 'powerup',
        title: 'Veto',
        description: 'You refuse to answer the current question.',
      },
      {
        id: 2001,
        type: 'time',
        title: '30 Minute Bonus',
        duration: 30,
      },
    ],
  },
]

export default specs
