function isObject(obj) {
  var type = typeof obj;
  return type === 'object' && !!obj;
}

export  {
  isObject
}