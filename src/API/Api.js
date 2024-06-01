import axios from "axios";

export default class Api {
  static async getAll() {
    const response = await axios.get(
      "https://1912e4188940f0c9.mokky.dev/products/",
    );
    return response;
  }

  static async getByCategory(category) {
    const response = await axios.get(
      `https://1912e4188940f0c9.mokky.dev/products/?category=${category}`,
    );
    return response;
  }

  static async getById(id) {
    const response = await axios.get(
      `https://1912e4188940f0c9.mokky.dev/products/?id=${id}`,
    );
    return response;
  }

  static async getProductByLink(category, linked) {
    const response = await axios.get(
      `https://1912e4188940f0c9.mokky.dev/products/?category=${category}&link=${linked}`,
    );
    return response;
  }

  static async getAllCategories() {
    const response = await axios.get(
      "https://1912e4188940f0c9.mokky.dev/categories",
    );
    return response;
  }

  static async getCategory(link) {
    const response = await axios.get(
      `https://1912e4188940f0c9.mokky.dev/categories/?link=${link}`,
    );
    return response;
  }

  static async getUserInfo(token, email) {
    const response = await axios.get(
      `https://1912e4188940f0c9.mokky.dev/dataUsers?email=${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  }

  static async getOrderById(id, token) {
    const response = await axios.get(
      `https://1912e4188940f0c9.mokky.dev/orders?id=${id}`,
    );
    return response;
  }

  static async getItemsForRec(category, max) {
    const response = await axios.get(
      `https://1912e4188940f0c9.mokky.dev/products?category=${category}&limit=${max}`,
    );
    return response;
  }
}
