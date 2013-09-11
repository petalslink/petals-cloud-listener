/**
 * We need to define a minimal schema for the Event object in order to be able to retrieve attributes.
 * If not, we are not able to use attributes in templates, ...
 * TODO : Find why logging the event show all attributes but we can not access to them in js nor jade ie undefined.
 *
 * @type {*}
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var EventSchema = new Schema({
    event_id : {type : String},
    group : { type : String},
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
  },

  /**
   * Get a list of events which belongs to the same group
   *
   * @param category
   * @param cb
   */
  group: function(group, cb) {
    this.find({'group' : group})
      .sort({'received_at': -1})
      .exec(cb)
  }
}

EventSchema.plugin(require('mongoose-lifecycle'));
module.exports = mongoose.model('Event', EventSchema);