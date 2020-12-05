export function someMutation(/* state */) {}
export const addToBag = (state, response) => {
  state.bag.push(response);
};
export const removeFromBag = (state, item) => {
   const findingItem = state.bag.indexOf(item);
    state.bag.splice(findingItem, 1);
};

