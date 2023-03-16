import $api from './http';


export default class UserService {
  static async login(email: string, password: string) {
    return $api.post('/auth/login', {
      email, password,
    });
  }

  static async registration(email: string, password: string) {
    return $api.post('/auth/registration', {
      email, password,
    });
  }

  static async getMe() {
    return $api.get('/accounts/get-me');
  }

  static async getUser(token: string) {
    return $api.post('/users/get-user', {
      token,
    });
  }

  static async createUser(username: string) {
    return $api.post('/users/create-user', {
      username,
    });
  }

  static async updateUser(username: string, userId: number) {
    return $api.put('/users/update-username', {
      username, userId,
    });
  }

  static async deleteUser(id: number) {
    return $api.delete(`/users/delete/${id}`);
  }

  static async updatePin(userId: number, pin: number) {
    return $api.put('/users/update-pin', {
      pin, userId,
    });
  }

  static async deletePin(userId: number) {
    return $api.put('/users/delete-pin', {
      userId,
    });
  }

  static async loginUser(userId: number, pin: number) {
    return $api.post('/users/login-user', {
      userId, pin,
    });
  }

  static async loginTwoFactor(token: string) {
    return $api.post('/auth/login-two-factor', {
      token,
    });
  }
}