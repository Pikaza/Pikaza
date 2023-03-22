
// import subject from '';

// describe('', () => {
//   let state: {};

//   beforeEach(() => {
//     state = {
//       // OG state
//     };
//   });

//   it('Does this', () => {
//   expect().toEqual();
//   });

//   it('Does this', () => {
//   });

//   it('Does this', () => {
//   });
// });


// // describe('MegaMarkets reducer', () => {
// //   let state;

// //   beforeEach(() => {
// //     state = {
// //       // OG state
// //     };
// //   });

// //   describe('default state', () => {
// //     it('should return a default state when given an undefined input', () => {
// //       expect(subject(undefined, { type: undefined })).toEqual(state);
// //     });
// //   });

// //   describe('unrecognized action types', () => {
// //     it('should return the original without any duplication', () => {
// //       const action = { type: 'aajsbicawlbejckr' };
// //       expect(subject(state, action)).toBe(state);
// //     });
// //   });
 
// //   // Crud
// //   describe('ADD_MARKET', () => {
// //     const action = {
// //       type: 'ADD_MARKET',
// //       payload: 'Azkaban',
// //     };

// //     it('adds a market', () => {
// //       const { marketList } = subject(state, action);
// //       expect(marketList[0]).toEqual({
// //         location: 'Azkaban',
// //         cards: 0,
// //       });
// //     });

// //     it('increases total market count by 1', () => {
// //       const { totalMarkets } = subject(state, action);
// //       const oldTotalMarkets = state.totalMarkets;
// //       expect(totalMarkets).toEqual(oldTotalMarkets + 1);
// //     });

// //     // Remember that in Redux we never mutate. If something changes, we copy
// //     // the data structure! Hint: `.toBe` or `.not.toBe` are your questions.
// //     it('returns a state object not strictly equal to the original', () => {
// //       const newState = subject(state, action);
// //       expect(newState).not.toBe(state);
// //     });

// //     it('includes a marketList not strictly equal to the original', () => {
// //       const newState = subject(state, action);
// //       expect(newState.marketList).not.toBe(state.marketList);
// //     });

// //     it('clears the newLocation field', () => {
// //       state.newLocation = 'Azkaban';
// //       const newState = subject(state, action);
// //       expect(newState.newLocation).toBe('');
// //     });
// //   });
// // });





