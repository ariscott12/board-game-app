var React = require('react');
var Reflux = require('reflux');
var hotGameStore = require('../stores/hot-game-store');
var GamePreview = require('./game-preview');
var Actions = require('../actions');  

module.exports = React.createClass({
  mixins: [
    // listens for any events that are coming from TopicStore, 
    // call onChange function when event triggered by store
    Reflux.listenTo(hotGameStore, 'onChange'),
  ],
  componentWillMount: function() {
    Actions.getHotGames();    
    this.gameIds = [];
  },
  getInitialState:function() {
    return {
      gameIds: null
    }
  },
  onChange: function(event, hotGames) {
      hotGames.map(function(content) {
        this.gameIds.push(content.$.id);
      }.bind(this));  
      this.setState({
        gameIds: this.gameIds
      });
  },
  render: function() {
    return <div>
      {this.state.gameIds ? this.content() : null}       
    </div>
  },
  content:function() {
    return <GamePreview ids = {this.state.gameIds} />
  } 
});



