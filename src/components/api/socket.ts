export function Socket() {
  function init() {
    const url =
      'wss://0obop7y124.execute-api.eu-central-1.amazonaws.com/prod?token=76ad86b2-9ff8-418d-b7e1-2764412fe707';
    return new WebSocket(url);
  }

  return {
    init,
  };
}
