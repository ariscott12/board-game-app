var React = require('react');
var HotGames = require('./hot-games');
var Header = require('./header');  

module.exports = React.createClass({
  render: function() {
    return <div>
      <Header />
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





