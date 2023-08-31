const axios = require('axios');

class DataModelAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://us-west2-giftkard-d0bf1.cloudfunctions.net'; // Replace 
with your Cloud Functions base URL
  }

  // Users Collection
  async addUser(user) {
    return this.sendRequest('POST', '/addUser', user);
  }

  async getUser(userID) {
    return this.sendRequest('GET', `/getUser?userID=${userID}`);
  }

  async updateUser(userID, updatedData) {
    return this.sendRequest('PUT', `/updateUser?userID=${userID}`, updatedData);
  }

  async deleteUser(userID) {
    return this.sendRequest('DELETE', `/deleteUser?userID=${userID}`);
  }

  // GiftCards Collection
  async addGiftCard(giftCard) {
    return this.sendRequest('POST', '/addGiftCard', giftCard);
  }

  async getGiftCard(cardID) {
    return this.sendRequest('GET', `/getGiftCard?cardID=${cardID}`);
  }

  async updateGiftCard(cardID, updatedData) {
    return this.sendRequest('PUT', `/updateGiftCard?cardID=${cardID}`, 
updatedData);
  }

  async deleteGiftCard(cardID) {
    return this.sendRequest('DELETE', `/deleteGiftCard?cardID=${cardID}`);
  }

  // Orders Collection
  async createOrder(order) {
    return this.sendRequest('POST', '/createOrder', order);
  }

  async getOrder(orderID) {
    return this.sendRequest('GET', `/getOrder?orderID=${orderID}`);
  }

  async updateOrderStatus(orderID, updatedData) {
    return this.sendRequest('PUT', `/updateOrderStatus?orderID=${orderID}`, 
updatedData);
  }

  async deleteOrder(orderID) {
    return this.sendRequest('DELETE', `/deleteOrder?orderID=${orderID}`);
  }

  // Businesses Collection
  async addBusiness(business) {
    return this.sendRequest('POST', '/addBusiness', business);
  }

  async getBusiness(businessID) {
    return this.sendRequest('GET', `/getBusiness?businessID=${businessID}`);
  }

  async updateBusiness(businessID, updatedData) {
    return this.sendRequest('PUT', `/updateBusiness?businessID=${businessID}`, 
updatedData);
  }

  async deleteBusiness(businessID) {
    return this.sendRequest('DELETE', `/deleteBusiness?businessID=${businessID}`);
  }

  // Transactions Collection
  async createTransaction(transaction) {
    return this.sendRequest('POST', '/createTransaction', transaction);
  }

  async getTransaction(transactionID) {
    return this.sendRequest('GET', 
`/getTransaction?transactionID=${transactionID}`);
  }

  async deleteTransaction(transactionID) {
    return this.sendRequest('DELETE', 
`/deleteTransaction?transactionID=${transactionID}`);
  }

  // ExchangeListings Collection
  async listGiftCardForExchange(listing) {
    return this.sendRequest('POST', '/listGiftCardForExchange', listing);
  }

  async getExchangeListing(listingID) {
    return this.sendRequest('GET', `/getExchangeListing?listingID=${listingID}`);
  }

  async updateExchangeListingStatus(listingID, updatedData) {
    return this.sendRequest('PUT', 
`/updateExchangeListingStatus?listingID=${listingID}`, updatedData);
  }

  async deleteExchangeListing(listingID) {
    return this.sendRequest('DELETE', 
`/deleteExchangeListing?listingID=${listingID}`);
  }

  // GroupGifts Collection
  // ...

  // Helper method to send requests
  async sendRequest(method, path, data = {}) {
    try {
      const response = await axios({
        method,
        url: `${this.baseURL}${path}`,
        data,
        headers: { Authorization: `Bearer ${this.apiKey}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DataModelAPI;

