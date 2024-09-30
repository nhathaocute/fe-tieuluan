import api from "../config/api";

class MilkTeaAPI {
  async get(url) {
    try {
      const res = await api.get(url);
      return res.data;
    } catch (err) {
      throw new Error(err);
    }
  }
  async put(url, data) {
    try {
      const res = await api.put(url, data);
      return res.data;
    } catch (err) {
      throw new Error(err);
    }
  }
  async post(url, data) {
    const res = await api.post(url, data);
    return res.data;
  }
  async delete(url) {
    try {
      const res = await api.delete(url);
      return res.data;
    } catch (err) {
      throw new Error(err);
    }
  }
}
export default MilkTeaAPI;
