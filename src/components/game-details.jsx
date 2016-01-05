"use strict";

const React = require('react');
const Reflux = require('reflux');
const Actions = require('../actions');  
const gameDetailStore = require('../stores/game-detail-store');

module.exports = React.createClass({
  mixins: [
    // listens for any events that are coming from TopicStore, 
    // call onChange function when event triggered by store
    Reflux.listenTo(gameDetailStore, 'onChange'),
  ],
  componentWillMount() {
    Actions.getGameDetails([this.props.params.id]);    
  },
  // componentWillReceiveProps(newProps) {
  //   console.log('thisisit');
  //   Actions.getGameDetails([newProps.params.id]);  
  // },
  getInitialState() {
    return {
      data: null
    }
  },
  onChange() {
      let data = gameDetailStore.findGame(this.props.params.id);
      this.setState({
        data: data
      });
  },
  render() {
    return <div>
     {this.state.data ? this.content() : null}      
    </div>
  },
  content() {
    return this.state.data.map((content) => {
      return <div key = {content.$.id}> 
          <h2>{content.name[0].$.value}</h2>
          <img src = {content.thumbnail[0]} />
        </div>
      ;
    });
  } 
});



