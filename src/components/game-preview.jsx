"use strict";

const React = require('react');
const Reflux = require('reflux');
const gameDetailStore = require('../stores/game-detail-store');
const Actions = require('../actions');
const Router = require('react-router');
const Link = Router.Link;  
const Scorebar = require('./score-bar');  


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
  averageRating(stats) {
    let rating = parseFloat(stats[0].ratings[0].average[0].$.value);
    rating = rating.toFixed(2);
    if(rating == 0.00) {
      return null;
    } else {
      return <Scorebar color= "yellow" score = {rating} />
    }
    
  },
  geekRating(stats) {
    let rating = parseFloat(stats[0].ratings[0].bayesaverage[0].$.value);
    rating = rating.toFixed(2);
    if(rating == 0.00) {
      return null;
    } else {
      return <Scorebar color= "red" score = {rating} />
    }
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
      if(this.geekRating(content.statistics) != null && this.averageRating(content.statistics) != null) {
      
      return <div className = "game-preview"> 
        <Link to = {'boardgame/'+ content.$.id} key = {content.$.id}> 
          <h2 className = "title">{content.name[0].$.value}</h2>
          <div className = "inner-wrapper clearfix">
            <div className = "image-wrapper">
              {this.image(content)}
            </div>
            <div className = "bg-rankings">
              <h3 className = "score-label">Average Rating</h3>
              {this.averageRating(content.statistics)}
              <h3 className = "score-label">Geek Rating</h3>
              {this.geekRating(content.statistics)}
              </div>
          </div>
          <ul className = "statistics">
            <li>{content.yearpublished[0].$.value}<span className = "label">Year Published</span></li>
            <li>{content.maxplayers[0].$.value}<span className = "label">Num of Players: </span></li>
            <li>{this.rank(content.statistics)}<span className = "label">Board Game Rank</span></li>
          </ul> 
        </Link>
        </div>
      }
    });
  }
});



