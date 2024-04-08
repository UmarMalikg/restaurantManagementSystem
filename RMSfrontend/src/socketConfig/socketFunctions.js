export const emitOrderChange = (socket) => {
  if (socket) {
    socket.emit("orderChanged");
  }
};

export const changeViaSocket = (socket, emitMessage, changeFunction) => {
  if (socket) {
    socket.on(`${emitMessage}`, changeFunction);
  }
  return () => {
    if (socket) {
      socket.off(`${emitMessage}`, changeFunction);
    }
  };
};
