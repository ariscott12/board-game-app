"use strict";

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
  componentWillMount() {
    Actions.getGameDetails(this.props.ids);    
  },
  getInitialState() {
    return {
      data: null
    }
  },
  onChange(event, gamePreview) {
      this.setState({
        data: gamePreview
      });  
   },
  render() {
    return <div>
       {this.state.data ? this.content() : null}       
    </div>
  },
  statistics(stats) {
    let rating = parseFloat(stats[0].ratings[0].average[0].$.value);
    rating = rating.toFixed(2);
    if(rating == 0.00) {
      return 'N/A';
    }
    return rating;
  },
  rank(ranks) {
    return ranks[0].ratings[0].ranks[0].rank[0].$.value;
  },
  image(content) {
    if(content.thumbnail) {
      return  <img src = {content.thumbnail[0]} />
    }
  },
  content() {
    return this.state.data.map((content) => {
      return <Link to = {'boardgame/'+ content.$.id} key = {content.$.id}> 
          <h2>{content.name[0].$.value}</h2>
          {this.image(content)}
          <ul>
            <li>Max Players: {content.maxplayers[0].$.value}</li>
            <li>Average Rating: {this.statistics(content.statistics)}</li>
            <li>Board Game Rank: {this.rank(content.statistics)}</li>
          </ul>
        </Link>
      ;
    });
  }
});



