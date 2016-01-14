var DataCollection = Backbone.Collection.extend({
    
    url: 'http://www.eharmony.com/lane/api.php?type=success_stories',
    
    initialize: function(){
        this.page = 1;
    },
    
    parse: function(data){
        data = data || [];
        var rows = data.map(function(obj){
            // get rid of data we don't need
            obj = _.omit(obj,['category_id','status']);

            // Add a proper image path
            obj.image = 'http://static.eharmony.com/assets/success/couples/thumbs/' + obj.image;
            return obj;
        })
        return rows;
    },
    loadMore: function(){
        this.page++;
        // Fetch the next page and add it to the list
        this.fetch({
            data: { page: this.page },
            remove:false
        });
    }
});
module.exports = DataCollection;
