export const handleError = (statusCode: number, errorCallback?: Function) => {
  if (statusCode === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (errorCallback) errorCallback();
  }
};
