const {RESTDataSource} = require('apollo-datasource-rest');

class Base extends RESTDataSource {
  constructor(model) {
    super();
    this._model = model;
    this.params = {
      keyword: null,
      offset: 0,
      limit: 10
    }
  }

  find(params) {
    return this._model.find({
      $or: [
        {
          name: {$regex: this.params.keyword, $options: 'i'}
        }
      ],
    })
      .skip(this.params.offset)
      .limit(this.params.limit);
  }
}

module.exports = Base;