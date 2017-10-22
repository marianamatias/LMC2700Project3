/*
Fictional Duels Bot
By: Mariana Matias

(1) My bot pits two entities against each other
(either fictional characters or public figures)
in various battle or competition scenarios.

It will first tweet the question (questions will be tweeted every so often,
here I have chosen 5 minutes).
After a set time, for now I have chosen 2 minutes, it will tweet the winner.

It's amusing to think of the outcome in these hypotheticals, and debate
which character/person would win. The idea is that people would retweet, comment
 or like to vote for their chosen winner.

(2) https://twitter.com/fictionalduels
*/

// DEBUG
// if we don't want it to post to Twitter! Useful for debugging!
var debug = false;

// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));


// Databases
var win = ['be the victor', 'strike gold', 'achieve total success',
'gain victory', 'win over your heart', 'win', 'triumph', 'own the competition',
'rise above all', 'destroy all enemies', 'totally own', 'kick ass',
'secure victory', 'savor the sweet taste of triumph', 'score big points',
'whoop everyone\'s ass', 'slay the competition', 'become a champion',
'be the last one standing']

var battle = ['rap', 'stand up comedy', 'Pokemon', 'lip sync', 'coding',
'jam project', 'dad jokes', 'trivia bowl', 'pie eating']

var competition = ['Shark Tank', 'Dance Dance Revolution', 'Cupcake Wars',
'American Idol', 'The Voice', 'Food Network Chopped',
'the Biggest Loser', 'Project Runway', 'Dancing with the Stars',
'Freshman Cake Race', 'a GT Hackathon', 'The Bachelor',
'America\'s Next Top Model', 'the Hunger Games', 'Iron Chef America',
'The X Factor', 'The Bachelorette']

var characters = ['Beyonce', 'Hillary Clinton', 'Bernie Sanders',
'Lebron James', 'Emma Stone', 'Tom Hanks', 'Leonardo DiCaprio','Taylor Swift',
'Bruno Mars', 'Katy Perry', 'Chef Gordon Ramsay', 'Simon Cowell',
'Mark Zuckerberg', 'Lilly Singh', 'Colleen Ballinger',
'Liza Koshy', 'Kim Kardashian', 'Gigi Hadid', 'Trump', 'Obama', 'Justin Bieber',
'Selena Gomez', 'Miley Cyrus', 'Thor', 'Oprah', 'Ellen DeGeneres', 'Ian Bogost',
'The Hulk', 'Iron Man', 'Iron Man','Ron Weasley', 'Katniss Everdeen',
'Blair Waldorf', 'Serena Van der Woodsen', 'Buzz', 'Bud Peterson',
'Phineas and Ferb', 'Elle Woods', 'Homer Simpson', 'Minions', 'Mulan',
'Scooby Doo', 'Alvin and the Chipmunks', 'The PowerPuff Girls', 'Kim Possibile',
'Joey Tribiani', 'Timmy Turner', 'Kermit the Frog', 'Leslie Knope',
'Mike Wazowski', 'Andy Dwyer', 'Superman', 'Ross Geller', 'Spiderman',
'Spongebob Squarepants', 'Carrie Bradshaw', 'Kendrick Lamar',
'Squidward Tentacles', 'Rachel Green', 'Michael Scott', 'Jimmy Neutron',
'The Pink Panther', 'Patrick Star', 'Dr. Gregory House', 'Harry Potter',
'Hermione Granger', 'Bridget Jones', 'Dr. Derek Shepherd', 'Zendaya',
'Bruno Mars', 'Alan Turing', 'Ted Nelson', 'Vannevar Bush', 'Tim Berners-Lee']

options = ['text1', 'text2'];

var resultstatement = ['Time\'s up!', 'Results are in!', 'The votes are in!',
'Votes have been counted,', 'The people have spoken,',
'The general consensus is,', 'Drumroll please...', 'Voting is done,',
'The public has voiced their opinions,', 'The public has spoken!']

var win2 = ['is the victor!', 'strikes gold!', 'achieves total success!',
'gains victory!', 'won over your heart!', 'won!', 'triumphed!',
'owned the competition!', 'rose above all!', 'destroyed all enemies!',
'totally owned the competition!', 'kicked ass!', 'secured victory!',
'savored the sweet taste of triumph!', 'scored big points!',
'whooped everyone\'s ass!', 'slayed the competition!', 'became THE champion!',
'is the last one standing!']

// Helper functions for arrays, picks a random thing
function randInt(alist) {
	return Math.floor(Math.random() * (alist).length);
}

//remove troublesome characters for hashtags
function removeChars(stringers1) {
	if (stringers1.includes('-')){
		stringers1 = stringers1.replace('-', '');
	}
	if (stringers1.includes('\'')){
		stringers1 = stringers1.replace('\'', '');
	}
	if (stringers1.includes('.')){
		stringers1 = stringers1.replace('.', '');
	}
	return stringers1;
}

//remove spaces for hashtags
function removeSpaces(stringers) {
	for (i = 0; i < 5; i++) {
		stringers = stringers.replace(" ", "");
	}
	return stringers;
}

//generate question tweet of type 1
function text1() {
	var text = "Who would " + winning + " in a " + battletype + " battle? ";
	text += characterOne + " or " + characterTwo;

	text += " #" + removeChars(removeSpaces(battletype));
	text += " #" + removeChars(removeSpaces(characterOne));
	text += " #" + removeChars(removeSpaces(characterTwo));

	return text.trim();
}

//generate question tweet of type 2
function text2() {
	var text = "Who would " + winning + " in " + competitiontype + "? ";
	text += characterOne + " or " + characterTwo;

	text += " #" + removeChars(removeSpaces(competitiontype));
	text += " #" + removeChars(removeSpaces(characterOne));
	text += " #" + removeChars(removeSpaces(characterTwo));

	return text.trim();
}

//choose which question to tweet
function choosetext() {
	var a;
	key = randInt(options);
	if (key == 1) {
		a = text1();
	} else {
		a = text2();
	}

	if (a.length > 140) {
		a = duel();
	}

	return a;
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
	int4 = randInt(win);
	var int5 = randInt(competition);

	characterOne = characters[int1];
	characterTwo = characters[int2];
	battletype = battle[int3];
	winning = win[int4];
	competitiontype = competition[int5];

	return choosetext();
}

//randomly choose the winner
function chooseWinner() {
	var x = resultstatement[randInt(resultstatement)];
	var r = Math.floor(Math.random() * 2);
	if (r == 0) {
		x += " " + characterOne + " " + win2[int4];
		x += " #" + removeChars(removeSpaces(characterOne));
	} else {
		x += " " + characterTwo + " " + win2[int4];
		x += " #" + removeChars(removeSpaces(characterTwo)); }

	return x;
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

	//set the winning tweet to post 45 minutes after the initial tweet
	setTimeout(tweetWinner, 1000 * 60 * 45);
}

function tweetWinner() {
	var tweetText2 = chooseWinner();
	if (debug)
		console.log(tweetText2);
	else
		T.post('statuses/update', {status: tweetText2 }, function(err, reply) {
			if (err !== null) {
				console.log('Error: ', err);
			}
			else {
				console.log('Tweeted: ', tweetText2);
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
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour
setInterval(runBot,  1000 * 60 * 60);