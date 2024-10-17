const mockApiCall = (success: boolean = true, timeout: number = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve({message: 'Success'});
      } else {
        reject({message: 'Error'});
      }
    }, timeout);
  });
};

export default mockApiCall;
