import MilkTeaAPI from ".";

const url = (path) => `/gia/${path}`;

class Gia extends MilkTeaAPI {
  async create(data) {
    try {
      return await this.post(url("create"), data);
    } catch (error) {
      console.error("Error creating data:", error);
      throw error; // Rethrow if you want to handle it upstream
    }
  }

  async getAll() {
    try {
      return await this.get(url("all"));
    } catch (error) {
      console.error("Error fetching all data:", error);
      throw error;
    }
  }

  async getOne(id) {
    try {
      return await this.get(url(`info?id=${id}`));
    } catch (error) {
      console.error(`Error fetching data for ID ${id}:`, error);
      throw error;
    }
  }

  async edit(id, data) {
    try {
      return await this.put(url(`update?id=${id}`), data);
    } catch (error) {
      console.error(`Error editing data for ID ${id}:`, error);
      throw error;
    }
  }
}

const sizeProductServices = new Gia();
export default sizeProductServices;
