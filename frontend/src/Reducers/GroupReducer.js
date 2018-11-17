const initialState = {
  groups: [
    // {
    //   tag: 'Family'
    // },
    // {
    //   tag: 'Friends'
    // },
    // {
    //   tag: 'Gym'
    // },
    // {
    //   tag: 'Work'
    // },
  ],
  form: {
    create: {
      tag: '',
    }
  },
}

// this is not a class, but an object, it's name should be start with lowercase

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_GROUP':
      return {
        ...state,
        groups: [...state.groups, action.payload]
      };

    case 'EDIT_GROUP':
      return {
        ...state,
        groups: [...state.groups.map((group => {
          if (group.id === action.payload) group = action.value;
          return group
        }))],
      };

    case 'DELETE_GROUP':
      return {
        ...state,
        groups: state.groups.filter((g => g.id !== action.payload))
      };

    case 'UPDATE_FORM':
      return {
        ...state,
        form: {
          ...state.form,
          create: {
            ...state.form.create,
            ...action.payload,
          }
        },
      };
    default:
      return state
  };
}