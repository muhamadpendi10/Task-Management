// Password Correct Length For Validation
export const passwordCorrectLength = 3;
// Task List Page max Limit
export const pageMaxLimit = 10;

// Example List
export const tempList = [
  {
    id: 1,
    name: 'Test Task',
    desc: 'We’ve created actionTypes object, where a key is our action type and value is a function. Then we check, if such a key exists - we execute the function, else - we just return the initial state. I personally like this approach. It looks elegant and easy to read.',
    place: { value: 'Work', name: 'work' },
    finishStatus: {
      value: 'In Progress',
      name: 'progress',
      color: 'rgb(255,132,1)',
    },
    finishDate: new Date(),
  },
  {
    id: 2,
    name: 'Test Task',
    desc: 'We’ve created actionTypes object, where a key is our action type and value is a function. ',
    finishStatus: {
      value: 'Finished',
      name: 'finished',
      color: 'rgb(50,174,14)',
    },
    place: { value: 'In Street', name: 'street' },
    finishDate: new Date(),
  },
  {
    id: 3,
    name: 'This is very long name for task',
    desc: 'Short desc',
    finishStatus: {
      value: 'Created',
      name: 'created',
      color: 'rgb(84,84,232)',
    },
    place: { value: 'Home', name: 'home' },
    finishDate: new Date(),
  },
];
