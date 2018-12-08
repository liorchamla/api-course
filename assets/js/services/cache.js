class HttpCache {
  cache = {};

  setItem(name, item) {
    this.cache[name] = {
      item,
      cachedAt: new Date().getTime()
    };
  }

  getItem(name) {
    return new Promise((resolve, reject) => {
      const item =
        this.cache[name] &&
        this.cache[name].cachedAt + 60000 > new Date().getTime() &&
        this.cache[name].item;
      if (item) resolve(item);
      else reject(`The '${name}' item does not exist !`);
    });
  }
}

const cache = new HttpCache();

export default cache;
