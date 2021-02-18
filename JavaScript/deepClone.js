const resource = {
  string: "string",
  number: 123,
  _undefined: undefined,
  _null: null,
  bool: false,
  array: [1, 2, 3],
  func: function fn(n) {
    console.log(n);
  },
  obj: {
    key: "value",
  },
  date: new Date(),
  exp: /.js$/,
  circle: {},
};

resource.circle.self = resource.circle;

const cache = [];

function findCache(target) {
  for (let i = 0; i < cache.length; i++) {
    console.log(cache);
    if (target === cache[i][0]) {
      return cache[i][1];
    }
  }
  return 0;
}

function deepClone(target) {
  if (!(target instanceof Object)) return target;
  const findRes = findCache(target);
  console.log(findRes);
  if (findRes) {
    return findRes;
  }

  let dist = {};

  if (target instanceof Array) {
    dist = [];
  }

  if (target instanceof Function) {
    dist = function (...args) {
      return target.call(this, ...args);
    };
  }

  if (target instanceof Date) {
    dist = new Date(target);
  }

  if (target instanceof RegExp) {
    dist = new RegExp(target.source, target.flags);
  }

  cache.push([target, dist]);
  for (let key in target) {
    if (!target.hasOwnProperty(key)) return;
    dist[key] = deepClone(target[key]);
  }
  return dist;
}

const copy = deepClone(resource);
console.log(resource);
console.log(copy);
console.log(copy.string === resource.string);
console.log(copy.array === resource.array);
copy.func.prototype.name = "copy";
console.log(
  "拷贝函数：",
  copy.func.prototype.name,
  resource.func.prototype.name
);
let timer = setTimeout(() => {
  clearTimeout(timer);
  console.log(copy.date);
});