const React = require('react');
const Reflux = require('reflux');
const gameDetailStore = require('../stores/game-detail-store');
const Actions = require('../actions');
const Router = require('react-router');
const Link = Router.Link;  

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
      this.setState({
        data: gamePreview
      });  
   },
  render: function() {
    return <div>
       {this.state.data ? this.content() : null}       
    </div>
  },
  statistics: function(stats) {
    // stats[0].ratings.map(function(content) {
    //   console.log(content.average[0].$.value);
    // });
    return stats[0].ratings[0].average[0].$.value;
  },
  content: function() {
    //console.log(this.state.data);
    return this.state.data.map(function(content) {
      return <Link to = {'boardgame/'+ content.$.id} key = {content.$.id}> 
          <h2>{content.name[0].$.value}</h2>
          <img src = {content.thumbnail[0]} />
          <ul>
            <li>Max Players {content.maxplayers[0].$.value}</li>
            <li>{this.statistics(content.statistics)}</li>
          </ul>
        </Link>
      ;
    }.bind(this));
  }
});



