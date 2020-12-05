export function someMutation(/* state */) {}
export const addToBag = (state, response) => {
  state.bag.push(response);
};
export const removeFromBag = (state, item) => {
   const findingitem = state.bag.indexOf(item);
    state.bag.splice(findingitem, 1);
};

