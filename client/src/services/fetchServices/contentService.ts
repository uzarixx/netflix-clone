import $api from './http';


export default class ContentService {
  static async getContentAll() {
    return $api.get('/content');
  }

  static async fetchSeries(id: string) {
    return $api.get(`/content/get-content/${id}`);
  }
}