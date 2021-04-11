export const getToken = ():string|null=> {
  if (typeof window !== 'undefined')
    return localStorage.getItem('token');
  return null;
}


export const setToken = (token: string):string|null => {
  if (typeof window !== 'undefined')
    localStorage.setItem('token', token);
  return null;
}

export const removeToken = ():void=> {
  if (typeof window !== 'undefined' && localStorage.getItem('token')){
    localStorage.removeItem('token');
  }
}