const getTokenExpire = (token: string) => {
  if (!token) return 0;

  try {
    const [, payload] = token.split('.');
    const data = JSON.parse(atob(payload));
    const exp = data ? data.exp : 0;

    return exp;
  } catch {
    return 0;
  }
};

const getSecondsToExpire = (token: string) => {
  const expires = getTokenExpire(token);
  const secondsToExpire = expires - Date.now() / 1000;

  return secondsToExpire;
};

export default getSecondsToExpire;
