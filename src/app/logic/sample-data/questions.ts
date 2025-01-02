const questions = [
  {
    id: '87390642',
    type: {
      family: 'open_ended',
      subtype: 'single',
    },
  },
  {
    id: '87728337',
    type: {
      family: 'single_choice',
      subtype: 'vertical',
    },
    answer_options: {
      rows: [
        {
          id: '561673969',
          position: 0,
          text: 'a1',
          type: 'row',
        },
        {
          id: '561653090',
          position: 1,
          type: 'row',
          text: 'a2',
        },
        {
          id: '561673971',
          position: 2,
          text: 'a3',
          type: 'row',
        },
      ],
    },
  },
  {
    id: '87732160',
    type: {
      family: 'single_choice',
      subtype: 'menu',
    },
    answer_options: {
      rows: [
        {
          id: '561673972',
          position: 0,
          text: 'a1',
          type: 'row',
        },
        {
          id: '561673973',
          position: 1,
          text: 'a2',
          type: 'row',
        },
        {
          id: '561673974',
          position: 2,
          text: 'a3',
          type: 'row',
        },
      ],
    },
  },
  {
    id: '87732162',
    type: {
      family: 'multiple_choice',
      subtype: 'vertical',
    },
    answer_options: {
      rows: [
        {
          id: '561673977',
          position: 0,
          text: 'a1',
          type: 'row',
        },
        {
          id: '561673978',
          position: 1,
          text: 'a2',
          type: 'row',
        },
      ],
    },
  },
  {
    id: '87732163',
    type: {
      family: 'matrix',
      subtype: 'rating',
    },
    answer_options: {
      rows: [
        {
          id: '561673981',
          position: 0,
          text: 'row1',
          type: 'row',
        },
        {
          id: '561673982',
          position: 1,
          text: 'row2',
          type: 'row',
        },
      ],
      cols: [
        {
          id: '561673983',
          position: 0,
          text: 'a',
          type: 'col',
        },
        {
          id: '561673984',
          position: 1,
          text: 'b',
          type: 'col',
        },
        {
          id: '561673985',
          position: 2,
          text: 'c',
          type: 'col',
        },
        {
          id: '561673986',
          position: 3,
          type: 'col',
          text: 'd',
        },
        {
          id: '561673987',
          position: 4,
          text: 'e',
          type: 'col',
        },
      ],
    },
  },
  {
    id: '87732164',
    type: {
      family: 'open_ended',
      subtype: 'single',
    },
  },
  {
    id: '87732165',
    type: {
      family: 'matrix',
      subtype: 'rating',
    },
    answer_options: {
      rows: [
        {
          visible: true,
          description: null,
          position: 1,
          text: '',
          type: 'row',
          id: '3229626982',
        },
      ],
      cols: [
        {
          id: '3229626983',
          position: 0,
          text: 'a1',
          type: 'col',
        },
        {
          id: '3229626984',
          position: 1,
          text: 'a2',
          type: 'col',
        },
        {
          id: '3229626985',
          position: 2,
          text: 'a3',
          type: 'col',
        },
        {
          id: '3229626986',
          position: 3,
          text: 'a4',
          type: 'col',
        },
        {
          id: '3229626987',
          position: 4,
          text: 'a5',
          type: 'col',
        },
      ],
    },
  },
  {
    id: '87732166',
    type: {
      family: 'matrix',
      subtype: 'rating',
    },
    answer_options: {
      rows: [
        {
          visible: true,
          description: null,
          position: 0,
          text: 'Row 1',
          type: 'row',
          id: '3229626996',
        },
      ],
      cols: [
        {
          id: '3229626997',
          position: 0,
          text: '',
          type: 'col',
        },
        {
          id: '3229626998',
          position: 1,
          text: '',
          type: 'col',
        },
        {
          id: '3229626999',
          position: 2,
          text: '',
          type: 'col',
        },
        {
          id: '3229627000',
          position: 3,
          text: '',
          type: 'col',
        },
        {
          id: '3229627001',
          position: 4,
          text: '',
          type: 'col',
        },
      ],
    },
  },
];

// questions on the page
export const pages = {
  sample1: [
    ['87390642', '87728337'],
    ['87732160', '87732162', '87732163'],
    ['87732164'],
    ['87732165', '87732166'],
  ],
};

export const sample1 = questions;
