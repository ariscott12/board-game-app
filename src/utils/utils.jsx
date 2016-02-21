module.exports = {
	updateName(name) {
    	switch (name) {
			case 'boardgamecategory':
				return 'Category';
			case 'boardgamemechanic':
				return 'Mechanism';
			case 'boardgamefamily':
				return 'Family';
			case 'boardgamedesigner':
				return 'Designer';
			case 'boardgameartist':
				return 'Artist';
			case 'boardgamepublisher':
				return 'Publisher';
			case 'boardgameimplementation':
				return 'Reimplements';
			default:
			return name;
    	}
  	},
  	replaceSpaces(string) {
  		string = string.replace(/\s*$/,"");
  		string = string.replace(/ /g,"+");

  		return string;
  	}
}