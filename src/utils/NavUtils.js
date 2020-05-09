function getParam(props, name) {
  const {route: {params = {}} = {}} = props || {};
  return params[name];
}

export default {
  getParam,
};
