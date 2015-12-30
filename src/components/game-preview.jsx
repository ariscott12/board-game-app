var React = require('react');
var Reflux = require('reflux');
var gameDetailStore = require('../stores/game-detail-store');
var Actions = require('../actions');  

module.exports = React.createClass({
  mixins: [
    // listens for any events that are coming from TopicStore, 
    // call onChange function when event triggered by store
    Reflux.listenTo(gameDetailStore, 'onChange'),
  ],
  componentWillMount: function() {
    Actions.getGameDetails(this.props.ids);    
  },
  getInitialState:function() {
    return {
      data: null
    }
  },
   onChange: function(event, gamePreview) {
       // hotGames.map(function(content) {
       //   this.gameIds.push(content.$.id);
       // }.bind(this));
      this.setState({
        data: gamePreview
      }); 
      // gamePreview.map(function(content) {
      //   console.log(content.name[0].$.value);
      // });
      // console.log(gamePreview) 
   },
  render: function() {
    return <div>
       {this.state.data ? this.content() : null}       
       
    </div>
  },
  statistics: function(stats) {
    return stats[0].ratings[0].average[0].$.value;
  },
  content: function() {
    console.log(this.state.data);
    return this.state.data.map(function(content) {
      return <div key = {content.$.id}> 
          <h2>{content.name[0].$.value}</h2>
          <p>{content.description}</p>
          <ul>
            <li>Max Players {content.maxplayers[0].$.value}</li>
            <li>{this.statistics(content.statistics)}</li>
          </ul>
        </div>
      ;
    }.bind(this));
  }
});



