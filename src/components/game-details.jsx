"use strict";

const React = require('react');
const Reflux = require('reflux');
const Actions = require('../actions');  
const gameDetailStore = require('../stores/game-detail-store');
const utils = require('../utils/utils')

module.exports = React.createClass({
  mixins: [
    // listens for any events that are coming from TopicStore, 
    // call onChange function when event triggered by store
    Reflux.listenTo(gameDetailStore, 'onChange'),
  ],
  componentWillMount() {
      let data = gameDetailStore.findGame(this.props.params.id); 
      this.setState({
        data: data
      });  
  },
  getInitialState() {
    return {
      data: null
    }
  },
  onChange(event, gameDetails) {
      this.setState({
        data: gameDetails
      });  
  },
  image(content) {
    if(content.thumbnail) {
      return  <img src = {content.thumbnail[0]} />
    }
  },
  gameInfo(content) {
    let data = [];
    let contentArray = [];
    content.map((content) => {
        data[content.$.type] = [];       
    });
    content.map((content) => {
        data[content.$.type].push(<li key = {content.$.id}>{content.$.value}</li>);
    });
    for (var i in data){
      contentArray.push(<li className = "title" key = {i}>{utils.updateName(i)}<ul>{data[i]}</ul></li>);
    }
    return(
      <div>
        <ul>{contentArray}</ul>
      </div>
    );
  },
  players(content) {
    return content.minplayers[0].$.value+ " - "+ content.maxplayers[0].$.value;
  },
  playTime(content) {
    return content.minplaytime[0].$.value+ " - "+ content.playingtime[0].$.value;
  },
  render() {
    return <div>
     {this.state.data ? this.content() : null}      
    </div>
  },
  content() {
    return this.state.data.map((content) => {
      console.log(content);
      return <div key = {content.$.id}> 
          <h2>{content.name[0].$.value}</h2>
          {this.image(content)}
          {this.gameInfo(content.link)}
           <ul>
            <li>Year Published: {content.yearpublished[0].$.value}</li>
            <li># of Players: {this.players(content)}</li>
            <li>Playing Time: {this.playTime(content)}</li>
            <li>Suggested Age: {content.minage[0].$.value}+</li>
            <h3>Description</h3>
            <p>{content.description[0]}</p>
          </ul>

        </div>
      ;
    });
  } 
});



