info: [libs/mongoose.js] Connected to DB!
info: [NodeAPI/dataGen.js] New user - oceane:voluptas
info: [NodeAPI/dataGen.js] New user - tomas:nihil
info: [NodeAPI/dataGen.js] New user - marilyne:non
info: [NodeAPI/dataGen.js] New user - lucious:illum
info: [NodeAPI/dataGen.js] New user - andrey:simplepassword
info: [NodeAPI/dataGen.js] New client - mobileV1:abc123456

http POST http://localhost:1337/oauth/token grant_type=password client_id=mobileV1 client_secret=abc123456 username=andrey password=simplepassword


HTTP/1.1 200 OK
Cache-Control: no-store
Connection: keep-alive
Content-Type: application/json
Date: Sun, 05 Oct 2014 10:15:43 GMT
Pragma: no-cache
Transfer-Encoding: chunked
X-Powered-By: Express

{
    "access_token": "SIfGG9FP2IJ0axXGriPvYLvNkz58YWhuF5LQakQi2jk=", 
    "expires_in": 3600, 
    "refresh_token": "RfiIUouwFMHCsjb7KlSkHgNeT6KPvRsEVH9KfLxfAE4=", 
    "token_type": "bearer"
}

http POST http://localhost:1337/oauth/token grant_type=refresh_token client_id=mobileV1 client_secret=abc123456 refresh_token=TOKEN

-----------------------------
Mongoose

Populate - DBRef-like behavior

ObjectIds can now refer to another document in a collection within our database and be populate()d when querying. An example is helpful:

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var PersonSchema = new Schema({
    name    : String
  , age     : Number
  , stories : [{ type: Schema.ObjectId, ref: 'Story' }]
});

var StorySchema = new Schema({
    _creator : { type: Schema.ObjectId, ref: 'Person' }
  , title    : String
  , fans     : [{ type: Schema.ObjectId, ref: 'Person' }]
});

var Story  = mongoose.model('Story', StorySchema);
var Person = mongoose.model('Person', PersonSchema);
So far we've created two models. Our Person model has it's stories field set to an array of ObjectIds. The ref option is what tells Mongoose in which model to look, in our case the Story model. All _ids we store here must be document _ids from the Story model. We also added a _creator ObjectId to our Story schema which refers to a single Person.

Saving a ref (to the parent)

Below you can see how we "save" a ref in 'story1' back to the _creator. This 
is usually all you need to do.

var aaron = new Person({ name: 'Aaron', age: 100 });

aaron.save(function (err) {
  if (err) ...

  var story1 = new Story({
      title: "A man who cooked Nintendo"
    , _creator: aaron._id
  });

  story1.save(function (err) {
    if (err) ...
  });
})
Populating the refs (to the parent)

So far we haven't done anything special. We've merely created a Person and a Story. Now let's take a look at populating our story's _creator:

Story
.findOne({ title: /Nintendo/i })
.populate('_creator') // <--
.exec(function (err, story) {
  if (err) ..
  console.log('The creator is %s', story._creator.name);
  // prints "The creator is Aaron"
})
Yup that's it. We've just queried for a Story with the term Nintendo in it's title and also queried the Person collection for the story's creator. Nice!

Arrays of ObjectId refs work the same way. Just call the populate method on the query and an array of documents will be returned in place of the ObjectIds.

What if we only want a few specific fields returned for the query? This can be accomplished by passing an array of field names to the populate method:

Story
.findOne({ title: /Nintendo/i })
.populate('_creator', ['name']) // <-- only return the Persons name
.exec(function (err, story) {
  if (err) ..

  console.log('The creator is %s', story._creator.name);
  // prints "The creator is Aaron"

  console.log('The creators age is %s', story._creator.age)
  // prints "The creators age is null'
})
Now this is much better. The only property of the creator we are using is the name so we only returned that field from the db. Efficiency FTW!

Great, but what if we wanted to populate our fans array based on their age, and return, at most, any 5 of them?

Story
.find(...)
.populate('fans', null, { age: { $gte: 21 }}, { limit: 5 })
Done. Conditions and options are the third and fourth arguments respectively.

References to the children

You may find however, if you use the aaron object, you are unable to get a list of the stories. This is because no story objects were ever 'pushed' on to aaron.stories.

There are two perspectives to this story. First, it's nice to have aaron know which are his stories.

  aaron.stories.push(story1);
  aaron.save();
This allows you do a find & populate like:

Person
.findOne({ name: 'Aaron' })
.populate('stories') // <-- only works if you pushed refs to children
.exec(function (err, person) {
  if (err) ..

  console.log('JSON for person is: ', person);
})
However, it is debatable that you really want two sets of pointers as they may get out of sync. So you could instead merely find() the documents you are interested in.

Story
.find({ _creator: aaron._id })
.populate('_creator') // <-- not really necessary
.exec(function (err, stories) {
  if (err) ..

  console.log('The stories JSON is an array: ', stories);
})
Updating

Now that we have a story we realized that the _creator was incorrect. We can update ObjectId refs the same as any other property through the magic of Mongooses internal casting:

var guille = new Person({ name: 'Guillermo' });
guille.save(function (err) {
  if (err) ..

  story._creator = guille; // or guille._id

  story.save(function (err) {
    if (err) ..

    Story
    .findOne({ title: /Nintendo/i })
    .populate('_creator', ['name'])
    .exec(function (err, story) {
      if (err) ..

      console.log('The creator is %s', story._creator.name)
      // prints "The creator is Guillermo"
    })

  })
})
Note:

The documents returned from calling populate become fully functional, removeable, saveable documents. Do not confuse them with embedded docs. Take caution when calling its remove method because you'll be removing it from the database, not just the array.


