var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var EventSchema = new Schema({
    received_at : { type : Date, default: Date.now }
  },
  {
    strict : false
  }
);

EventSchema.pre('save', function(next) {
  console.log('Saving Event', this);
  next();
});

/**
 * Statics
 *
 * @type {{load: Function, list: Function}}
 */
EventSchema.statics = {

  /**
   * Find event by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */
  load: function (id, cb) {
    this.findOne({ _id : id })
      .exec(cb)
  },

  /**
   * Get a list of events based on criteria
   *
   * @param options
   * @param cb
   */
  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .sort({'received_at': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  }
}

EventSchema.plugin(require('mongoose-lifecycle'));
module.exports = mongoose.model('Event', EventSchema);