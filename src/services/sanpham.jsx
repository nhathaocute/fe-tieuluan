import MilkTeaAPI from ".";
const url = (path) => `/sanpham/${path}`;
class SanPham extends MilkTeaAPI {
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
const sanPhamServices = new SanPham();
export default sanPhamServices;
