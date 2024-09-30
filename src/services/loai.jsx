import MilkTeaAPI from ".";
const url = (path) => `/loai/${path}`;
class Loai extends MilkTeaAPI {
  async create(data) {
    return await this.post(url("create"), data);
  }
  async getAll() {
    return await this.get(url("all"));
  }
  async getOne(id) {
    return await this.get(url(`info?id=${id}`));
  }
  async edit(id, data) {
    return await this.put(url(`update?id=${id}`), data);
  }
}
const loaiServices = new Loai();
export default loaiServices;
