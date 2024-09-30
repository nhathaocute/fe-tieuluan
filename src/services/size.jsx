import MilkTeaAPI from ".";
const url = (path) => `/size/${path}`;
class Size extends MilkTeaAPI {
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
const sizeServices = new Size();
export default sizeServices;
