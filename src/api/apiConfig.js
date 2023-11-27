const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "b74f9c483bb58bce1bc4b4f7dc6d67de",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
