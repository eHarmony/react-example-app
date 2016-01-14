(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var DataCollection = __webpack_require__(1),
	    DataView = __webpack_require__(2);
	
	var myCollection = new DataCollection();
	var myView = new DataView({ collection: myCollection });
	
	// Fetch The collection and then render it
	myCollection.fetch().then(function () {
	    myView.render();
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	var DataCollection = Backbone.Collection.extend({
	
	    url: 'http://www.eharmony.com/lane/api.php?type=success_stories',
	
	    initialize: function () {
	        this.page = 1;
	    },
	
	    parse: function (data) {
	        data = data || [];
	        var rows = data.map(function (obj) {
	            // get rid of data we don't need
	            obj = _.omit(obj, ['category_id', 'status']);
	
	            // Add a proper image path
	            obj.image = 'http://static.eharmony.com/assets/success/couples/thumbs/' + obj.image;
	            return obj;
	        });
	        return rows;
	    },
	    loadMore: function () {
	        this.page++;
	        // Fetch the next page and add it to the list
	        this.fetch({
	            data: { page: this.page },
	            remove: false
	        });
	    }
	});
	module.exports = DataCollection;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var DataViewer = __webpack_require__(3);
	var DataView = Backbone.View.extend({
	    el: '#data-viewer',
	    initialize: function () {
	        // Only allow the following filter options
	        this.filterBy = 'category';
	        this.contentKey = 'excerpt';
	        this.titleKey = 'heading';
	    },
	    render: function () {
	        this.reactView = React.createElement(DataViewer, { collection: this.collection, view: this });
	        ReactDOM.unmountComponentAtNode(this.el);
	        ReactDOM.render(this.reactView, this.el);
	    }
	});
	module.exports = DataView;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Dat Viewer
	 */
	var Pagination = __webpack_require__(4);
	var List = __webpack_require__(5);
	var Filters = __webpack_require__(6);
	
	var DataViewer = React.createClass({
	    displayName: 'DataViewer',
	
	    // This happens before the initial render of the component
	    componentWillMount: function componentWillMount() {
	        var that = this;
	        // NOTE: When the collection updates, force a re-render
	        this.props.collection.on('update', function () {
	            that.forceUpdate();
	        });
	    },
	    /**
	     * The initial state of this page
	     * @method getInitialState
	     */
	    getInitialState: function getInitialState() {
	        return {
	            filter: 'all',
	            filterBy: this.props.view.filterBy,
	            page: 1,
	            perPage: 5
	        };
	    },
	
	    // Go to a different page
	    changePage: function changePage(newPage) {
	        this.setState({ page: newPage });
	    },
	
	    loadMore: function loadMore() {
	        // NOTE: direct communication with the backbone collection
	        this.props.collection.loadMore();
	
	        var parentElement = ReactDOM.findDOMNode(this).parentNode,
	            topOffset = $(parentElement).offset().top - 60;
	        $('body,html').animate({ scrollTop: topOffset + 'px' });
	    },
	
	    // When the filters are updated, change the state of the component
	    onUpdateFilter: function onUpdateFilter(filter) {
	        this.setState({
	            page: 1,
	            filter: filter
	        });
	    },
	
	    /**
	     * Get the filtered questions for use when rendering
	     * @method getFilteredQuestions
	     * @return {array}
	     */
	    getFilteredModels: function getFilteredModels() {
	        var filterBy = this.state.filterBy,
	            currentFilter = this.state.filter,
	            filteredModels = [];
	
	        if (this.state.filter === 'all') {
	            filteredModels = this.props.collection.models;
	        } else {
	            filteredModels = this.props.collection.filter(function (model) {
	                return model.get(filterBy) === currentFilter;
	            });
	        }
	        return filteredModels;
	    },
	    /**
	     * Render the collection
	     * @method render
	     */
	    render: function render() {
	        var startIdx = (this.state.page - 1) * this.state.perPage,
	            endIdx = this.state.page * this.state.perPage,
	            rows = this.getFilteredModels(),
	            displayItems = rows.slice(startIdx, endIdx),
	            numPages = Math.ceil(rows.length / this.state.perPage);
	
	        // NOTE: the updateFilter and updateFilterBy callbacks are passed into the Filters component for the communication between components
	        return React.createElement(
	            'section',
	            null,
	            React.createElement(Filters, { collection: this.props.collection, filterOptions: this.props.view.filterOptions, filter: this.state.filter, filterBy: this.state.filterBy, updateFilter: this.onUpdateFilter, updateFilterBy: this.onUpdateFilterBy }),
	            React.createElement(List, { collection: displayItems, titleKey: this.props.view.titleKey, contentKey: this.props.view.contentKey }),
	            React.createElement(Pagination, { changePage: this.changePage, page: this.state.page, numPages: numPages }),
	            React.createElement(
	                'a',
	                { className: 'loadmore', onClick: this.loadMore },
	                'Load More'
	            )
	        );
	    }
	});
	module.exports = DataViewer;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Pagination View
	 *
	 * A single note within a list of notes.
	 */
	
	var Pagination = React.createClass({
	    displayName: 'Pagination',
	
	    // Go to the previous page
	    prevPage: function prevPage() {
	        if (this.props.page - 1 > 0) {
	            this.props.changePage(this.props.page - 1);
	        }
	    },
	
	    // Go to the next page
	    nextPage: function nextPage() {
	        if (this.props.page + 1 <= this.props.numPages) {
	            this.props.changePage(this.props.page + 1);
	        }
	    },
	
	    render: function render() {
	        // The data attributes for the <figure> tags are for the circleProgess plugin
	        return React.createElement(
	            'div',
	            { className: 'pagination' },
	            React.createElement(
	                'a',
	                { onClick: this.prevPage, className: 'previous' + (this.props.page <= 1 ? ' disabled' : '') },
	                'Previous Page'
	            ),
	            React.createElement(
	                'span',
	                null,
	                'Page ',
	                this.props.page,
	                ' of ',
	                this.props.numPages
	            ),
	            React.createElement(
	                'a',
	                { onClick: this.nextPage, className: 'next' + (this.props.page >= this.props.numPages ? ' disabled' : '') },
	                'Next Page'
	            )
	        );
	    }
	});
	
	module.exports = Pagination;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Data View
	 *
	 * The list of items
	 */
	
	var List = React.createClass({
	    displayName: 'List',
	
	    render: function render() {
	        var titleKey = this.props.titleKey,
	            contentKey = this.props.contentKey;
	
	        // Loop through the collection to get each display item
	        var list = this.props.collection.map(function (model) {
	            var content = '',
	                title = model.get(titleKey),
	                content = model.get(contentKey),
	                tableRows = [],
	                value;
	
	            return React.createElement(
	                'article',
	                { key: model.attributes.id, className: model.attributes.type },
	                React.createElement(
	                    'h4',
	                    null,
	                    title
	                ),
	                React.createElement('img', { src: model.attributes.image }),
	                React.createElement(
	                    'blockquote',
	                    null,
	                    content
	                )
	            );
	        });
	        return React.createElement(
	            'div',
	            { className: 'list' },
	            list
	        );
	    }
	});
	
	module.exports = List;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Filters View
	 */
	
	var _require = __webpack_require__(7);
	
	var nicename = _require.nicename;
	
	var Filters = React.createClass({
	    displayName: 'Filters',
	
	    /**
	     * Click handler for changing the filter
	     * @method changeFilter
	     * @param  {Event}     evt  
	     * @return {[type]}
	     */
	    changeFilter: function changeFilter(evt) {
	        var filter = $(evt.currentTarget).data('filter');
	
	        // Communicate with the parent component to update the filter
	        this.props.updateFilter(filter);
	    },
	
	    render: function render() {
	        var navElements = [],
	            navOptions = [],
	            filterTitle,
	            filterCount,
	            filterClassName;
	
	        // This is for displaying the options you can filter by
	        var filters = this.props.collection.groupBy(this.props.filterBy);
	        for (var filterKey in filters) {
	            filterTitle = nicename(filterKey);
	            filterCount = filters[filterKey].length;
	            filterClassName = this.props.filter === filterKey ? 'active' : '';
	
	            navElements.push(React.createElement(
	                'a',
	                { key: filterKey, onClick: this.changeFilter, className: filterClassName, 'data-filter': filterKey },
	                filterTitle,
	                ' ',
	                React.createElement(
	                    'strong',
	                    null,
	                    filterCount
	                )
	            ));
	        }
	
	        return React.createElement(
	            'section',
	            { className: 'filters' },
	            React.createElement(
	                'nav',
	                null,
	                React.createElement(
	                    'label',
	                    null,
	                    'Filter :'
	                ),
	                React.createElement(
	                    'a',
	                    { onClick: this.changeFilter, className: this.props.filter === 'all' ? 'active' : '', 'data-filter': 'all' },
	                    'All ',
	                    React.createElement(
	                        'strong',
	                        null,
	                        this.props.collection.length
	                    )
	                ),
	                navElements
	            )
	        );
	    }
	});
	
	module.exports = Filters;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = {
	    nicename: function (str) {
	        str = str.replace(/-/, ' ').toLowerCase();
	        return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function (s) {
	            return s.toUpperCase();
	        });
	    }
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=../../build/data-viewer.map?_v=c521524b9fae8cd6aad9