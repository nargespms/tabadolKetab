export function someMutation(/* state */) {}
export const userEnter = (state, response) => {
  state.userInfo = response;
};
export const unreadTicketCal = (state, response) => {
  state.unreadTickets = response;
};
export const unreadBookReqCal = (state, response) => {
  state.unreadBookReq = response;
};
export const unreadMessagesCal = (state, response) => {
  state.unreadMessages = response;
};
export const loggedIn = (state, response) => {
  state.loggedIn = response;
};
export const clearBag = state => {
  state.bag = [];
};
export const addToBag = (state, response) => {
  const findingItem = state.bag.findIndex(book => book.id === response.id);

  if (findingItem === -1) {
    state.bag.push(response);
  }
};
export const removeFromBag = (state, item) => {
  const findingItem = state.bag.indexOf(item);
  state.bag.splice(findingItem, 1);
};
