import $api from './http';


export default class FilmsService {
  static async getRandomFilm() {
    return $api.get('/content/get-random-film');
  }
}