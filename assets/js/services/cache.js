class HttpCache {
  cache = {};

  setItem(name, item) {
    this.cache[name] = {
      item,
      cachedAt: new Date().getTime()
    };
  }

  getItem(name) {
    return new Promise(resolve => {
      const item =
        this.cache[name] &&
        this.cache[name].cachedAt + 60000 > new Date().getTime() &&
        this.cache[name].item;
      resolve(item || null);
    });
  }
}

const cache = new HttpCache();

export default cache;
