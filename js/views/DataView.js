var DataViewer = require('../components/data-viewer.jsx');
var DataView = Backbone.View.extend({
    el: '#data-viewer',
    initialize: function(){
        // Only allow the following filter options
        this.filterBy = 'category';
        this.contentKey = 'excerpt';
        this.titleKey = 'heading';
    },
    render: function(){
        this.reactView = React.createElement(DataViewer, {collection: this.collection, view: this });
        ReactDOM.unmountComponentAtNode(this.el);        
        ReactDOM.render(this.reactView, this.el);
    }
});
module.exports = DataView;
