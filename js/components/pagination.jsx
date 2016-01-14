/**
 * Pagination View
 *
 * A single note within a list of notes.
 */

var Pagination = React.createClass({


    // Go to the previous page
    prevPage: function(){
        if(this.props.page - 1 > 0){
            this.props.changePage(this.props.page - 1);
        }
    },

    // Go to the next page
    nextPage: function(){
        if(this.props.page + 1 <= this.props.numPages){
            this.props.changePage(this.props.page + 1);    
        }
    },

    render: function () {
        // The data attributes for the <figure> tags are for the circleProgess plugin
        return (
            <div className='pagination'>
                <a onClick={this.prevPage} className={'previous' + (this.props.page <= 1 ? ' disabled' : '')}>
                    Previous Page
                </a>
                <span>
                    Page {this.props.page} of {this.props.numPages}
                </span>
                <a onClick={this.nextPage} className={'next' + (this.props.page >= this.props.numPages ? ' disabled' : '')}>
                    Next Page
                </a>
            </div>
        );
    }
});

module.exports = Pagination;