var React = require('react');
var HotGames = require('./hot-games');  

module.exports = React.createClass({
  render: function() {
    return <div>
       {this.content()}
    </div>
  },
  content: function() {
    if(this.props.children) {
      return this.props.children;
    } else {
      return <HotGames />
    }
  
  }
});





