/**
 * Filters View
 */
var { nicename } = require('../utils');
var Filters =  React.createClass({
    /**
     * Click handler for changing the filter
     * @method changeFilter
     * @param  {Event}     evt  
     * @return {[type]}
     */
    changeFilter: function(evt){
        var filter = $(evt.currentTarget).data('filter');

        // Communicate with the parent component to update the filter
        this.props.updateFilter(filter);
    },

    render: function () {
        var navElements = [],
            navOptions = [],
            filterTitle,
            filterCount,
            filterClassName;


        // This is for displaying the options you can filter by
        var filters = this.props.collection.groupBy(this.props.filterBy);            
        for(var filterKey in filters){
            filterTitle= nicename(filterKey);
            filterCount = filters[filterKey].length;
            filterClassName = this.props.filter === filterKey ? 'active' : '';

            navElements.push(
                <a key={filterKey} onClick={this.changeFilter} className={filterClassName} data-filter={filterKey}>{filterTitle} <strong>{filterCount}</strong></a>
            );
        }

        return (
            <section className='filters'>
                <nav>
                    <label>Filter :</label>
                    <a onClick={this.changeFilter} className={this.props.filter === 'all' ? 'active' : ''} data-filter='all'>All <strong>{this.props.collection.length}</strong></a>
                    { navElements }
                </nav>
            </section>
        );
  }
});

module.exports = Filters;