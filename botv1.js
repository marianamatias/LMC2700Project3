
// DEBUG
var debug = true;		// if we don't want it to post to Twitter! Useful for debugging!

// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));


// Databases
var win = ['be the victor', 'gain victory', 'win', 'triumph', 'rise above all', 'destroy all enemies in', 'savor the sweet taste of triumph']

var battle = ['rap', 'stand up comedy', 'Pokemon', 'lip sync', 'coding', 'jam project', 'dad jokes', 'trivia bowl', 'pie eating']

var competition = ['Shark Tank', 'Dance Dance Revolution', 'Cupcake Wars', 'American Idol', 'The Voice', 'Food Network Chopped',
'Biggest Loser', 'Project Runway', 'Dancing with the Stars', 'Freshman Cake Race', 'a GT Hackathon', 'The Bachelor', 'America\'s Next Top Model', 'The Hunger Games',
'Iron Chef America', 'The X Factor', 'The Bachelorette']

var characters = ['Beyonce', 'Hillary Clinton', 'Bernie Sanders', 'Lebron James', 'Emma Stone', 'Tom Hanks', 'Leonardo DiCaprio',
'Taylor Swift', 'Bruno Mars', 'Katy Perry', 'Chef Gordon Ramsay', 'Simon Cowell', 'Mark Zuckerberg', 'Lilly Singh', 'Colleen Ballinger',
'Liza Koshy', 'Kim Kardashian', 'Gigi Hadid', 'Trump', 'Obama', 'Justin Bieber', 'Selena Gomez', 'Miley Cyrus', 'Thor', 'Oprah',
'Ellen DeGeneres', 'Ian Bogost', 'The Hulk', 'Iron Man', 'Iron Man','Ron Weasley', 'Katniss Everdeen', 'Blair Waldorf', 'Serena Van der Woodsen', 'Buzz', 'Bud Peterson',
'Phineas and Ferb', 'Elle Woods', 'Homer Simpson', 'Minions', 'Pocahontas', 'Mulan', 'Scooby Doo', 'Alvin and the Chipmunks',
'The PowerPuff Girls', 'Kim Possibile', 'Joey Tribiani', 'Timmy Turner', 'Kermit the Frog', 'Leslie Knope',
'Mike Wazowski', 'Andy Dwyer', 'Superman', 'Ross Geller', 'Spiderman', 'Spongebob Squarepants', 'Carrie Bradshaw', 'Kendrick Lamar',
'Squidward Tentacles', 'Rachel Green', 'Michael Scott', 'Jimmy Neutron', 'The Pink Panther', 'Patrick Star', 'Dr. Gregory House',
'Harry Potter', 'Hermione Granger', 'Bridget Jones', 'DJ Khaled', 'Dr. Derek Shepherd', 'Zendaya']

options = ['text1', 'text2'];

// Helper functions for arrays, picks a random thing
function randInt(alist) {
	return Math.floor(Math.random() * (alist).length);
}

function removeSpaces(stringers) {
	for (i = 0; i < 5; i++) {
		stringers = stringers.replace(" ", "");
	}
	return stringers;
}

function text1() {
	var text = "Who would win in a " + battletype + " battle? ";
	text += characterOne + " or " + characterTwo;

	text += " #" + removeSpaces(battletype);
	text += " #" + removeSpaces(characterOne)
	text += " #" + removeSpaces(characterTwo);

	return text.trim();
}

function text2() {

}

function duel()
{
	// Choose the randints
	var int1 = randInt(characters);
	var int2 = randInt(characters);
	if (int1 == int2) {
		int2 = randInt(characters);
	}
	var int3 = randInt(battle);
	var int4 = randInt(win);
	var int5 = randInt(competition);

	characterOne = characters[int1];
	characterTwo = characters[int2];
	battletype = battle[int3];
	winning = win[int4];
	competitiontype = competition[int5];

	return text1();
}

function tweet() {
	var tweetText = duel();

	if (debug)
		console.log(tweetText);
	else
		T.post('statuses/update', {status: tweetText }, function(err, reply) {
			if (err !== null) {
				console.log('Error: ', err);
			}
			else {
				console.log('Tweeted: ', tweetText);
			}
		});
}

function runBot() {
	console.log(" "); // just for legible logs
	var d=new Date();
	var ds = d.toLocaleDateString() + " " + d.toLocaleTimeString();
	console.log(ds);  // date/time of the request
	tweet();
}

// Run the bot
runBot();

// And recycle every hour
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(runBot, 1000 * 60 * 60 * 60 * 60);