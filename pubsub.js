function SocketPubSub() {
  const channels = {};

  /**
   * Subscribe to a channel
   * @param {String} channelName Channel Name
   * @param {Function} callback Channel Callback Function
   */
  const subscribe = (channelName, callback) => {
    const currentCbs = channels[channelName] || [];
    currentCbs.push(callback);
    channels[channelName] = currentCbs;
    return {
      unsubscribe: () => {
        unsubscribe(channelName, callback);
      },
    };
  };

  /**
   * Post Message to a channel
   * @param {String} channelName Channel Name
   * @param {String | Obeject} message Message to post to a channel
   */
  const publish = (channelName, message) => {
    if (channels[channelName]) {
      channels[channelName].forEach((fn) => fn(message));
    }
  };

  /**
   * Unsubscribe to a channel
   * @param {String} channelName Channel Name
   * @param {Function} callback Channel Calback Function
   */
  const unsubscribe = (channelName, callback) => {
    const index = (channels[channelName] || []).indexOf(callback);
    if (index >= 0) channels[channelName].splice(index, 1);
  };

  /**
   * Unsubscribe to all channels
   */
  const unsubscribeAll = () => {
    Object.keys(channels).map((channelName) => {
      channels[channelName] = [];
    });
  };

  /**
   * Publish to all channels
   * @param {Object | String} message Message to all channels
   */
  const broadcast = (message) => {
    Object.keys(channels).map((channel) => {
      publish(channel, message);
    });
  };

  return {
    publish,
    subscribe,
    unsubscribeAll,
    broadcast,
  };
}

module.exports = SocketPubSub();
