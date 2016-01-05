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
    console.log('mounted');

    Actions.getGameDetails(this.props.ids);    
  },
  // componentWillReceiveProps(newProps) {
  //   console.log('fired');
  //    //Actions.getGameDetails(newProps.ids);    
  // },
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
    
    return stats[0].ratings[0].average[0].$.value;
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
            <li>Max Players {content.maxplayers[0].$.value}</li>
            <li>{this.statistics(content.statistics)}</li>
          </ul>
        </Link>
      ;
    });
  }
});



