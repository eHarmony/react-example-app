/**
 * Data View
 *
 * The list of items
 */

var List = React.createClass({
    render: function () {
        var titleKey = this.props.titleKey,
            contentKey = this.props.contentKey;

        // Loop through the collection to get each display item
        var list = this.props.collection.map(function(model){
            var content = '',
                title = model.get(titleKey),
                content = model.get(contentKey),
                tableRows = [],
                value;
            
            return (
            <article key={model.attributes.id} className={model.attributes.type}>
                <h4>{title}</h4>
                <img src={model.attributes.image}/>
                <blockquote>
                    {content}
                </blockquote>
            </article>
            );
        });
        return (
            <div className='list'>
            {list}
            </div>
        );
    }
});

module.exports = List;