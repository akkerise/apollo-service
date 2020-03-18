const {RESTDataSource, RequestOptions} = require('apollo-datasource-rest');

class Base extends RESTDataSource {
  constructor(model) {
    super();
    this.setModel(model);
    this.query = null;
    this.instance = [];
    this.params = {
      keyword: "",
      offset: 0,
      limit: 10
    }
  }

  willSendRequest(req) {
    req.params.set('access_token', this.context.token);
    req.params.set('environment', this.context.env);
  }

  find() {
    return this._model.find({
      $or: [
        {
          name: { $regex: this.params.keyword, $options: 'i' }
        }
      ],
     });
  }

  withWhere(params) {
    return this.find().where(params);
  }

  withPopulate() {
     this.find().populate(this.instance);
  }

  withPaginate() {
     this._model.skip(this.params.offset).limit(this.params.limit);
  }

  setModel(model) {
    this._model = model;
    return this;
  }

}

module.exports = Base;