var DataCollection = require('./collections/DataCollection'),
    DataView = require('./views/DataView');
    
var myCollection = new DataCollection();
var myView = new DataView({collection:myCollection});

// Fetch The collection and then render it
myCollection.fetch().then(function(){
    myView.render();
});