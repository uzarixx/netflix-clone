export interface ISeries {
  id: number;
  description: string;
  createdAt: string;
  isFilm: boolean;
  name: string;
  previewImage: string;
  previewVideo: string;
  publicationDate: string;
  rating: 0;
  updateAt: string;
  yearCategory: number;

  films: [{
    contentId: number,
    id: number,
    length: number,
    videoLink: string;
  }];
  seasons: [{
    id: number, name: string, numberSeason: number, contentId: number, episodes: [{
      id: number,
      description: string,
      imageLink: string,
      length: number,
      name: string,
      numberEpisode: number,
      numberSeason: number,
      seasonId: number,
      videoLink: number
    }]
  }] | null;
}

export interface IMoreInfo {
  previewVideo: string;
  createdAt: string;
  description: string;
  id: number;
  isFilm: boolean;
  name: string;
  previewImage: string;
  publicationDate: string;
  rating: number;
  yearCategory: number;
}


export interface IUser {

  user: {
    id: number,
    accountId: number,
    username: string,
    avatar: string,
    pin: null | number,
    isPin: boolean
  }

}