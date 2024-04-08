export const emitSocket = (socket, emitMessage) => {
  if (socket) {
    socket.emit(`${emitMessage}`);
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
