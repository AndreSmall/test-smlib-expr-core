export const contactAndQuestion = [
  {
    condition: {
      op: 'and',
      operands: [
        {
          left: {
            type: 'question',
            id: '87390642',
          },
          op: 'ct',
          right: 'e',
        },
        // {
        //   left: {
        //     value: {
        //       id: 'contact',
        //       type: 'identifier',
        //     },
        //     attr: 'email',
        //     type: 'attribute',
        //   },
        //   op: 'isnot',
        //   right: {
        //     type: 'empty',
        //   },
        // },
      ],
    },
    actions: [
      {
        type: 'showq',
        target: '87732166',
      },
      // duplicate action
      {
        type: 'showq',
        target: '87732166',
      },
      {
        type: 'hideq',
        target: '87732165',
      },
    ],
    enabled: true,
  },
  {
    condition: {
      left: {
        value: {
          id: 'contact',
          type: 'identifier',
        },
        attr: 'email',
        type: 'attribute',
      },
      op: 'ct',
      right: '@example.com$',
    },
    actions: [
      {
        type: 'hiderow',
        targets: {
          question_id: '87732162',
          row_ids: ['561673978', '561673977'],
        },
      },
    ],
    enabled: true,
  },
  {
    condition: {
      left: {
        value: {
          id: 'contact',
          type: 'identifier',
        },
        attr: 'email',
        type: 'attribute',
      },
      op: 'isnot',
      right: {
        type: 'empty',
      },
    },
    actions: [
      {
        type: 'hiderow',
        targets: {
          question_id: '87732162',
          row_ids: ['561673978'],
        },
      },
    ],
    enabled: true,
  },
];
