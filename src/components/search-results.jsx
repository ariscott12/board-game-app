const React = require('react');
const Reflux = require('reflux');
const Actions = require('../actions');
const searchStore = require('../stores/search-store');
const GamePreview = require('./game-preview');


module.exports = React.createClass({
	mixins: [
    	// listens for any events that are coming from TopicStore, 
    	// call onChange function when event triggered by store
    	Reflux.listenTo(searchStore, 'onChange'),
  	],
  	getInitialState:function() {
    	return {
      		gameIds: null
    	}
  	},
	componentWillMount: function() {
    //	Actions.getSearchResults(this.props.params.query);    
    //	this.gameIds = [];
  	},
  	//shouldComponentUpdate: function(nextProps, nextState) {
    	//console.log(nextProps.params.query);
    //	return false;
	//},
  	componentWillReceiveProps(newProps) {
  		console.log(newProps.params.query);
  		this.setState({
         gameIds: null
       });
    	Actions.getSearchResults(newProps.params.query);  
    	
  	},
  	onChange(event, searchResults) {
  	   var gameIds = [];
       searchResults.map(function(content) {
         gameIds.push(content.$.id);
       }.bind(this));  
       
       this.setState({
         gameIds: gameIds
       });
     //  console.log(gameIds);
  	},
  render: function() {
    return <div>
      {this.state.gameIds ? this.content() : null}       
    </div>
  },
  content:function() {
  	//console.log(this.state.gameIds);
    return <GamePreview ids = {this.state.gameIds} />
  } 
});