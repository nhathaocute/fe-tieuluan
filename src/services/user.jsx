import MilkTeaAPI from ".";
const url = (path) => `/user/${path}`;
class User extends MilkTeaAPI {
  async register(data) {
    return await this.post(url("register"), data);
  }
  async login(data) {
    return await this.post(url("login"), data);
  }
  async update(id, data) {
    return await this.put(url(`update?id=${id}`), data);
  }
}
const userServices = new User();
export default userServices;
