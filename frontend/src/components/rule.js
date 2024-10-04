import React from "react";
import { useState } from "react";
import { FileText } from 'lucide-react';

const Modal = ({ show, onClose, title, rules }) => {
    if (!show) return null;
  
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-col justify-start items-center">
              <h2 className="font-fireSans rounded-lg border-2 mt-2 mb-2 p-1 text-center">{title}</h2>
              
            </div>
            <div className="flex items-center justify-start space-x-2">
              {/* PDF Download Icon */}
              <a href="https://drive.google.com/file/d/1jnmXLJ1QqPZK-XhR7pc5pFRqZknzbrs2/view?usp=sharing"className="text-gray-600 hover:text-gray-800">
  <FileText className="w-6 h-6" />
</a>

              {/* Close Button with Larger Cross */}
              <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-5xl">
                &times;
              </button>
            </div>
          </div>
          <h2 className="text-base font-bold mb-4">Rules are as follows:</h2>
          <div className="overflow-y-auto max-h-80">
            <ol className="list-decimal list-inside space-y-2">
              {rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      
    );
  };
  


const Rule=()=>{
    const [formData,setFormData]=useState("");
    const [showModal, setShowModal] = useState(false);
  const [selectedSport, setSelectedSport] = useState("");

  const sportRules = {
    'Athletics (Men)':[
     "The competition shall be conducted under the World Athletic Rules as adopted from time to time by Athletics Federation of India unless otherwise modified in these rules.",
     "Each college will be entitled to enter two competitors plus one reserve per event except for relay races. For relay races, not more than one entry of four with two reserves per event shall be accepted.",
     "An Athlete can participate in a maximum of three events, excluding relays. ",
     "Lots for lanes will be drawn during heats at the call room. ",
     "The schedule of event will be strictly followed, in case of any unwanted conditions decision of the Technical officials will be final.",
     "Minimum of three participants are required to have a Competition.",
     "Overall championship trophies will be awarded to the teams up to 2nd position. The sum total of points secured in all the events by a team will determine 1st, 2nd , 3rd and 4th positions in Athletics.",
     "The corresponding points which will be awarded to a team for various events are indicated below.",
     `Individual Events:
        1st position ⎯ 5 points
        2nd position ⎯ 3 points
        3rd position ⎯ 2 points
        4th position ⎯ 1 point 
`,`Relay Races:
        1st position ⎯ 10 points
        2nd position ⎯ 6 points
        3rd position ⎯ 4 points
        4th position ⎯ 2 points`,
    `In case of a tie for an event, points will be
shared by both the athletes and their
corresponding teams as shown below. In case
of relay events, the points will be double as the
relay events have double weightage.
1st and 2nd position - 4 points
2nd and 3rd position - 2.5 points
3rd and 4th position - 1.5 points`,
`No Athlete will be allowed to participate
barefoot in any Athletics Competitions as per
the Rules of AFI. `,
`Best Athlete in each category will be decided on
the basis of World Athletics Scoring Table.`
    ],
    'Athletics (Women)':[
        "The competition shall be conducted under the World Athletic Rules as adopted from time to time by Athletics Federation of India unless otherwise modified in these rules.",
        "Each college will be entitled to enter two competitors plus one reserve per event except for relay races. For relay races, not more than one entry of four with two reserves per event shall be accepted.",
        "An Athlete can participate in a maximum of three events, excluding relays. ",
        "Lots for lanes will be drawn during heats at the call room. ",
        "The schedule of event will be strictly followed, in case of any unwanted conditions decision of the Technical officials will be final.",
        "Minimum of three participants are required to have a Competition.",
        "Overall championship trophies will be awarded to the teams up to 2nd position. The sum total of points secured in all the events by a team will determine 1st, 2nd , 3rd and 4th positions in Athletics.",
        "The corresponding points which will be awarded to a team for various events are indicated below.",
        `Individual Events:
           1st position ⎯ 5 points
           2nd position ⎯ 3 points
           3rd position ⎯ 2 points
           4th position ⎯ 1 point 
   `,`Relay Races:
           1st position ⎯ 10 points
           2nd position ⎯ 6 points
           3rd position ⎯ 4 points
           4th position ⎯ 2 points`,
           `In case of a tie for an event, points will be
shared by both the athletes and their
corresponding teams as shown below. In case
of relay events, the points will be double as the
relay events have double weightage.
1st and 2nd position - 4 points
2nd and 3rd position - 2.5 points
3rd and 4th position - 1.5 points`,
`No Athlete will be allowed to participate
barefoot in any Athletics Competitions as per
the Rules of AFI. `,
`Best Athlete in each category will be decided on
the basis of World Athletics Scoring Table.`
       ],

'Badminton (Men)':[` The competition shall be conducted under the
Badminton World Federation (BWF) rules as
adopted from time to time by the Badminton
Association of India unless otherwise modified.`,
` The tournament for the men and women section
will be conducted on the lines of the Inter-State
Badminton Championship.`,
`The Ties for men and women will be separately
decided according to the pattern given below:
• The tie for men shall be decided by the
combined result of 3 singles and 2 doubles.
• Result of a tie, however, can be declared
when either of the competing team wins 3
matches in the men’s section `,
`Matches will be played in the best of three sets
format.`,
`The order of events shall be as follows:
 First Single/Second Single/First Double/
Third Single/Second Double.",
"Number of Players: Maximum of 5 and minimum
of 4 players for men`,
`Tie Event structure:
Men: Up to 12 teams (4 pools of 3 teams each)*
*League matches followed by knockouts, starting from
Semi-finals and followed by Finals. `,
`Result (Men and Women) of best of three sets
each set of 15 points for league matches and
each set of 21 points for knockout matches. `,`Tie will be resolved by successively applying the
following criteria:
• Individual matches won/individual matches lost.
• Games won by the team/games lost by the team.
• Points for/Points against. `,
`The tally for all the matches played in the league
fixture will be considered.`],

'Badminton (Women)':[`The competition shall be conducted under the
    Badminton World Federation (BWF) rules as
    adopted from time to time by the Badminton
    Association of India unless otherwise modified.
    `,` The tournament for the men and women section
    will be conducted on the lines of the Inter-State
    Badminton Championship.`,
`The Ties for men and women will be separately decided according to the pattern given below: • The tie for women by the results of 2 singles and 1 doubles •Result of a tie, however, can be declared when either of the competing team wins 2 matchesin the women’s section.`,
`Matches will be played in the best of three sets
format.`,
` The order of events shall be as follows:
• Men : First Single/Second Single/First Double/
Third Single/Second Double.`,
`Number of Players: 
maximum 3 and minimum 2 players.`,
`Tie Event structure:
Women: Up to 12 teams (4 pools of 3 teams each)*
*League matches followed by knockouts, starting from
Semi-finals and followed by Finals. `,
`Result (Men and Women) of best of three sets
each set of 15 points for league matches and
each set of 21 points for knockout matches. `,
`Tie will be resolved by successively applying the
following criteria:
• Individual matches won/individual matches lost.
• Games won by the team/games lost by the team.
• Points for/Points against. `,`The tally for all the matches played in the league
fixture will be considered.`],

'Basketball (Men)':[`The tournament will be conducted according to the
International Basketball Federation (FIBA) Rules as
adopted from time to time by the Basketball
Federation of India, unless otherwise modified.`,
`The number of players representing any college shall
not be more than 12 and not more than 12 certificates
shall be awarded to a team.`,
`All the matches shall be conducted on a league cum
knock-out basis.`,
`During matches if the score is same after the end
of the scheduled time, Basketball Federation Rules
will be applied, i.e. the game shall continue with as
many extra periods of 5 minutes as necessary to
break the tie`,
`On completion of the league matches, if two or
more teams are on same points, then the tie shall
be resolved as follows:
A. If two teams are tied head-to-head, wins
among the teams will be considered to
break the tie.
B. If more than two teams are equal in placing,
a second classification will be established,
taking into account only the results of the
games between the teams that have tied.`,
`If there are still teams tied after the second
classification, the basket average will be used to
determine the placing, taking into account only the
results of the games between the teams that tied.`,
`If there are still teams tied, the placing will be
determined using the goal average from the results
of all their games played in the group.`],

'Basketball (Women)':[`The tournament will be conducted according to the
International Basketball Federation (FIBA) Rules as
adopted from time to time by the Basketball
Federation of India, unless otherwise modified.`,
`The number of players representing any college shall
not be more than 12 and not more than 12 certificates
shall be awarded to a team.`,
`All the matches shall be conducted on a league cum
knock-out basis.`,
`During matches if the score is same after the end
of the scheduled time, Basketball Federation Rules
will be applied, i.e. the game shall continue with as
many extra periods of 5 minutes as necessary to
break the tie`,
`On completion of the league matches, if two or
more teams are on same points, then the tie shall
be resolved as follows:
A. If two teams are tied head-to-head, wins
among the teams will be considered to
break the tie.
B. If more than two teams are equal in placing,
a second classification will be established,
taking into account only the results of the
games between the teams that have tied.`,
`If there are still teams tied after the second
classification, the basket average will be used to
determine the placing, taking into account only the
results of the games between the teams that tied.`,
`If there are still teams tied, the placing will be
determined using the goal average from the results
of all their games played in the group.`],

'Carrom':[`A team can have a maximum of 4 players.`,
`There will be 3 games in a match. They are 2
singles and 1 doubles.`,
`A game consists of 3 boards (for the league stage
only) and at the end the team that scores the
maximum points will win. If there is a tie after 3
boards, one extra board (not considered for total
points) will be played to break the tie.`,
`A player cannot play more than 2 games in a
match.`,
`The team that wins 2 games will win the match.`,
`The top 2 teams from each pool in the league
stage will qualify for the quarter-finals.`,
`Thereafter it will be a knockout stage with
quarterfinals, semifinals, and finals.`,
`In case of a tie in the league stage, tie breaks will
be the total points scored in all the league stage
games.`,
`Thumbing (Hands) is allowed.`,
`A toss will be there. The team that wins the toss
will have a choice to choose strike or side.`,
`Whoever strikes first, must play white only.`,
`Pocketing the queen must be followed by
pocketing another coin on the same strike.`,
`The red 'queen' can be pocketed at any time after
sinking your first piece but must be sunk before
your last one. After pocketing the queen, you must
sink one of your carrom men, thereby 'covering' it,
into any pocket in the next shot, or else it is
returned to the centre spot.`,
`Once the queen is covered, whoever clears all
their carrom men first wins the 'board.`,
`The winner of a board collects one point for each
of the opponent's carrom men left at the finish
and three points for the queen if covered by the
winner (if covered by the loser, no one gets those
points).`,
`When placing the striker on the board to shoot, it
must touch both 'base lines, either covering the end
circle completely or not touching it at all. The striker
should not touch the diagonal arrow line.`,
` If while shooting for the queen you also sink one of
your carrom men in the same shot, the queen is
automatically covered, no matter which went first.`,
`If a piece jumps off the board, it is placed on the
centre spot. If pieces land on end or overlap, they
are left that way.`,
`If the centre spot is partially covered when
replacing the queen or a jumped piece, the piece
should cover as much red as possible. If totally
covered, the piece is placed opposite the next
player behind the red spot.`,
`If you touch your last piece directly before the
queen, you have to pay a penalty.`,
`. While covering the queen(or when the queen is
on board), if you pocket your opponent's last
coin then you will lose the board by the number
of your coins lying on the board along with three
points for the queen.`,
`If you sink your last coin before the queen, you
will lose the board by the number of your
opponent's coins on the board along with three
points for the queen.`,
`If the striker does not leave both lines, go again.
You get three tries to break before losing your
turn.`,
    `Only the players who are playing that particular
match can talk. Any suggestions or sledging
from outside during an ongoing board is not
allowed.`,
`In case of any dispute the organising committee
will take the final decision, consulting with the
referee.`],


'Chess':[
    `Chess competition will be played in accordance
with the "FIDE Laws Chess" (https://www.fide.com/
FIDE/handbook/LawsOfChess.pdf). The FIDE
Tournament
Rules will be used in conjunction with the Laws of
Chess.`,
` The pairing system used will be FIDE Swiss System.`,
`Depending upon the number of entries, the first
round may be qualifier/knockout and out of which
teams will be selected for the Swiss League.`,
`You will be informed before the tournament starts.
CHESS`,
`Players need to download the Chess Clock app
from Play Store before hand.`,
`Phones should be in silent mode in the playing
hall.`,
`
Team Structure`,
` In case of tie-break , the following would be taken
into account in the given order of priority.
• Direct Encounter : Head to head match results.
• Buchholz/ Sonneborn Berger.
• Armageddon match: Teams can choose their
player for the match, with a time control of 5+3.
Colour would be based on toss.
`,
` Time control will be 25 minutes + 10 sec
increment from move 1.
`,
` Time control for tie breakers is 5 minutes + 3
sec increment form move 1.
`,
` Toss for colour will be done on the first board only.
Other boards will have the colour with respect to
the first board (For example, if a team has white on
board 1 then its colour will be black, white, and
black on boards no 2, 3, and 4 respectively.)
Role of Team Captain`,
`The role of a team captain is basically an
administrative one during play. The captain shall be
required to: -
[1.] Deliver a written list naming the players of his
team playing the next round, at least 15 mins
before the start of the round. If the captain fails to
submit the order, the board order for previous
round will be used.
[2.] To communicate to his players their pairing.
[3.] To sign the protocol indicating the results in the
match at the end of the play, etc.
[4.] The captain will be required to deliver the order
of players before the start of the tournament.
[5.] Order of players will be fixed for the whole
tournament. It shall not be changed and team
found altering team order will be disqualified.
[6.] During the match, captain can only
communicate whether to take a draw offer or
reject.`,
`
TOUCH MOVE
• The touch move rule applies to all groups.
• When castling, the king shall be touched and
moved first. Players will receive a warning for the
first violation of this rule. Thereafter, if the rook is
touched before the king, castling is not allowed
and the rook must move (if legally possible).`,
`CLOCKS
• Players must make their move and press the clock
with the same hand. Clocks may not be picked up
or moved during the game. `,
`A game is won:
[1.] By checkmate;
[2.] If the opponent resigns;
[3.] If the opponent runs out of time, provided the
following conditions are met: To claim a win on time,
a player must notify a tournament official and have
mating material. Claiming a win on time is invalid
after a checkmate or stalemate has been played, or
after a player has resigned or agreed to a draw.`,
`A game is drawn:
[1.] By stalemate;
[2.] By agreement of the players during the game;
[3.] By threefold repetition (see section below);
[4.] By fifty move rules (see section below);
[5.] If a player has insufficient mating material (lone
K, only K+B, or only K+N) and the opponent
runs out of time.
All decisions given by Chief Arbiter will be final and
are unquestionable. `,
`Illegal Moves:
[1.] Loss would be given on two illegal moves,
with time penalty of 2 mins on the first illegal
move.
[2.] Illegal moves need to be claimed to the
arbiter. Any unclaimed illegal would not be
acknowledged.`
],

'Cricket (Men)':[`Matches shall be played according to the ICC rules
in force, as adopted from time to time by the Board
of Control for Cricket in India unless otherwise
modified.`,
`All the matches shall be conducted on a league cum
knock-out basis and each side is allowed to
complete 10 overs unless the opposing team is
dismissed earlier.`,
`Each bowler can bowl a maximum of two overs. The
semi-finals and finals will be 20 overs and each
bowler can bowl a maximum of 4 overs.
CRICKET`,
`The bowling team is given 85 minutes to complete
its quota of 20 overs and 45 minutes for a 10 over
match. The penalty for every short over will be
decided by all the umpires.`,
` No spike shoes will be allowed to be used by the
players.`,
` If there is a tie, the team with the better run rate
shall be considered for deciding to place in league
matches and SUPER OVER in all the knockout
matches.`,
`The umpires are empowered to rearrange the
number of overs by each side in case of a delayed
start or if play is suspended. The number of overs
by each side in case of a delayed start or if play is
suspended. The number of overs for the team
batting second will not be reduced if the team
batting first has been dismissed in fewer than the
agreed number of overs.`,
`Each team shall submit a list of players with
college IDs not exceeding sixteen who may
participate in the tournament. Not more than 16
certificates shall be awarded to a team. Failing to
provide legitimate IDs will not allow that player to
participate.`,
`In case, if any team is found playing a player who
does not belong to that particular college, that team
will be banned from the tournament with immediate
effect and no PRIZE will be awarded in any case.`,
`Impact player rules will be followed in the
tournament.`,
`Rules regarding the postponement of cricket matches
because of rain:
[1.] Minimum of 6 overs per inning is required to declare
the result of the match in 20 over matches and a
minimum of 3 overs per inning is required in 10 over
matches.
[2.] The final decision taking power will remain in the
hands of officials and the SPIRIT Committee in
discussions with the captains of the team.`,
`The unruly behaviour of the student members of any
team member shall be generally dealt with suitable
punishment like debarring etc. `],



    'Football (Men)': [
      `The duration of each match shall be 60 minutes
(30-10-30) which is subject to change as per weather
condition or any other circumstances by the umpires.`,
`Every team shall submit a list of players, not exceeding
16, who may participate in the tournament. Not more
than 16 certificates shall be awarded to a team.`,
`A maximum of 5 substitutions are allowed per team
per game as per Fifa rules.`,
` There will be 2 or 4 pools, depending on the
number of teams. After pool stage matches will
be followed by semifinals and finals.`,
`A team will be awarded 3 points for a win, 1 for a
draw, and zero for a lost match in league.`,
`In case a team gives a walkover, it loses the
match by a default 3-0 score.`,
`When a player receives a yellow card, it serves
as a caution or warning. This allows the player
another opportunity to remain on the field for
the rest of the game. In contrast, a red card
requires the player to leave the field immediately.`,
`Yellow card in league matches will not be carried
forward in the knockout matches.`,
`In case of a tie, goal differences (i.e. Goals FOR
minus Goals AGAINST) of all the matches played
by the team shall be considered. If the tie still
persists, the number of goals 'FOR' throughout
the tournament shall be considered. If tie still
persists, the number of goals "AGAINST'
throughout the tournament shall be considered.
If the tie still persists then the head the on result
of the two teams will be considered (winning
team will advance). If this does not resolve the
tie, then there will be a coin toss.`,
`Every player should wear proper Sports attire.
If not, responsibility for any injury would not be
taken by Spirit IIT Guwahati.`,
`Unruly behaviour of the student members of any
team member shall be generally dealt with
suitable punishment debarring etc.`
    ],


 'Hockey (Men)':[`Matches shall be played according to the rules of
the FIH as adopted from time to time by the Indian
Hockey Federation unless otherwise modified.`,
`The number of players representing any college
shall not be more than 16.`,
`Match will be of four quarters each of 15 minutes
(15-2-15-5-15-2-15) which is subject to be changed
as per weather conditions or any other
circumstances by the umpires.`,
`3 points will be awarded for each win and no
points for a lost match.`,
` During the league stage, after the expiry of
playtime, if a tie still persists, the points will be
shared equally (1 point each team will be
awarded).`,
` In the event of a draw at the end of a knockout
game, the winner will be decided by eight
seconds rule, and no extra time will be given.`,
`The yellow cards given during the league stages
would not be carried forward in the knock-out
stages.`,
`If a goalkeeper fouls intentionally, a penalty
stroke will be awarded.`,
`Teams should strictly bind with the schedule.`],

'Kabaddi (Men)':[` Matches shall be played according to the rules of
the International Kabaddi Federation (IKF).`,
`
• A match lasts two equal periods of 20
minutes.
• Players are entitled to an interval at half-time.
The half- time interval must not exceed five (5)
minutes.`,
`Weight Criteria
MEN: Should not be greater than 80Kg.`,
`Team Size:
Each team will consist of 12 Players.
• In Case of tie during knockout the IKF rule will be
applicable.
• In case of tie during`],

'Kho-kho (Men)':[`Matches shall be played according to the rules of
the Kho-Kho Federation of India unless otherwise
notified.`,
` The number of players representing any college
shall not be more than 12.`,
`Match will be of four innings each of 7 minutes
which is subject to be changed as per weather
conditions or any other circumstances by the
umpires.`,
` 3 points will be awarded for each win and no
points for a lost match.`,
`During the league stage, if ties persist, 1 point
will be given to each team.`,
`In case of a match tie situation in the knockout
stage, we will go with the first player tie breaker.`,
`Rule of tie breaker: Both the teams will go for
chasing and while chasing they have to gather
1 point in minimum time. The team which takes
the minimum time to get their first point in tie
breaker will be declared as the winners.`,
`The referees are empowered to decide the
timing of the match in case of delay in the start
or if the match is suspended.`,
`The referee's decision is final, no arguments
from any player will be entertained. Rules
regarding the postponement of the match due
to rain will be decided by the referee.`],

'Lawn Tennis (Men)':[`The number of players representing an institute
shall not be less than two and not more than four.`,
`Each match shall be played in the best of three
sets. The match will be played in the following
sequence: one singles, one doubles, and the
reverse singles.`,
`Captain should have to submit the names of
players who are going to play the match
beforehand.`,
`The results of the full match shall be declared
when either of the teams wins two matches.`,
`Tie breaker will be played for all sets.`,
`Tie between two teams of the same pool will be
resolved by successfully applying the following
criteria.
[A.] Individual Matches won/Individual
Matches lost.
[B.] Sets won by the Team/Sets lost by the
team.
[C.] Points for/Points Against-set
score to be taken`],

'Lawn Tennis (Women)':[`The number of players representing an institute
shall not be less than two and not more than four.`,
`Each match shall be played in the best of three
sets. The match will be played in the following
sequence: one singles, one doubles, and the
reverse singles.`,
`Captain should have to submit the names of
players who are going to play the match
beforehand.`,
`The results of the full match shall be declared
when either of the teams wins two matches.`,
`Tie breaker will be played for all sets.`,
`Tie between two teams of the same pool will be
resolved by successfully applying the following
criteria.
[A.] Individual Matches won/Individual
Matches lost.
[B.] Sets won by the Team/Sets lost by the
team.
[C.] Points for/Points Against-set
score to be taken`],

'Table Tennis (Men)':[`The rules of the tournament of the International
Table Tennis Federation as adopted from time to
time by the Table Tennis Federation of India shall
apply unless otherwise modified.`,
`The number of players representing any institute
shall neither be less than three nor more than
four. Only four certificates shall be awarded to the
winning team.`,
`Each single will be played in a best-of-five games
format with each game of 11 points.`,
`Matches will be held on the basis of five
singles.
The order of play shall be as below:-
Three players on one side are numbered A, B and C,
and the three players on the other side are numbered X,
Y and Z.
(1st Match A vs X)
(2nd Match B vs Y)
(3rd Match C vs Z)
(4th Match A vs Y)
(5th Match B vs X)`],

'Table Tennis (Women)':[`The rules of the tournament of the International
Table Tennis Federation as adopted from time to
time by the Table Tennis Federation of India shall
apply unless otherwise modified.`,
`The number of players representing any institute
shall neither be less than three nor more than
four. Only four certificates shall be awarded to the
winning team.`,
`Each single will be played in a best-of-five games
format with each game of 11 points.`,
`For WOMEN: Matches will be held on the basis of two
singles and one doubles. The order of play shall be as
follows:
(1st Match A vs X)
(2nd Match Doubles)
(3rd Match B vs Y)`],

'Squash (Men)':[`The rules of the World Squash and Squash Racket
Federation of India as adopted from time to time,
shall be followed unless otherwise modified.`,
`Every college should submit a list of players, not
exceeding 4.`,
`The matches will be played on a league cum
knockout basis.`,
`All the matches shall be played in the best of 5
games format.`,
`Scoring will be according to 11 points game.`,
`The order of play shall be as follows:
A. Three players on one side are numbered A, B
and C, while the three players on the other side
are numbered X, Y and Z.
B. The Order of play shall be:
•( A vs. X)
•( B vs. Y)
•( C vs. Z)`,
`The result of the tie shall be declared when
either team wins two matches.`],

'Squash (Women)':[`The rules of the World Squash and Squash Racket
Federation of India as adopted from time to time,
shall be followed unless otherwise modified.`,
`Every college should submit a list of players, not
exceeding 4.`,
`The matches will be played on a league cum
knockout basis.`,
`All the matches shall be played in the best of 5
games format.`,
`Scoring will be according to 11 points game.`,
`The order of play shall be as follows:
A. Three players on one side are numbered A, B
and C, while the three players on the other side
are numbered X, Y and Z.
B. The Order of play shall be:
•( A vs. X)
•( B vs. Y)
•( C vs. Z)`,
`The result of the tie shall be declared when
either team wins two matches.`],

'Volleyball (Men)':[`Every team will submit a list of players, not
exceeding 12`,
`The tournament shall be played on a league
cum knockout basis. All the matches were
played in the best of 5 sets for men`,
`The following points system will be followed for
the matches played on a league basis. Match
Won: 3 points.Match Lost: 0 points. Technical
forfeit: 1 point.`,
`Any team refusing to play a match without
justification will be eliminated from the
competition and the results of the matches
already played will be canceled.`,
`All the players will be required to show their ID
cards before the beginning of the match failing
which the defaulting individual will not be
allowed to play.`,
`Any disciplinary violation by any member of the
team will lead to disqualification of the team and
Teams must report on time to the court and no
extra time will be given for warm-ups, if late.`,
`All participants need to come in a proper kit -
shorts (no three-fourths, denim shorts, tracks
etc. are allowed).`,
`If any player does not come in a proper kit or
shoes, the player will not be allowed to play the
match.`,
`Teams must bring their own adequate volleyballs
for practice; no balls will be provided by the
institute for practice. However, a ball will be
provided for the match.`,
`Courts may be pre-reserved for Institute events or
team practice. Information regarding the same will
be put up on the noticeboard.`,
`Damage to the courts or equipment would imply
strict disciplinary action and fines against the
offender.`,
`Games are played to 21 points done by rally
scoring; win by two, with a 23-point cap. Rally
scoring means there is a point for every serve.
Teams will switch sides when the first team
reaches 11 points.`,
`Players must wear shorts and a shirt. Jewellery is
not permitted with the exception of flat wedding
bands.`,
`Headbands and kneepads are optional. Shoes
must be worn at all times in the bar/patio area of
VBGB.`,
`The decision of the referees and the umpires will be
final and binding. No protests would be entertained.
Therefore, any team leaving the field of (lay as a mark
of protest and conceding a walkover shall be
deemed to have lost the fixture and will be eliminated
from the rest of the event.`],

'Volleyball (Women)':[`Every team will submit a list of players, not
exceeding 12`,
`The tournament shall be played on a league
cum knockout basis. All the matches were
played in the best of 3 sets for women`,
`The following points system will be followed for
the matches played on a league basis. Match
Won: 3 points.Match Lost: 0 points. Technical
forfeit: 1 point.`,
`Any team refusing to play a match without
justification will be eliminated from the
competition and the results of the matches
already played will be canceled.`,
`All the players will be required to show their ID
cards before the beginning of the match failing
which the defaulting individual will not be
allowed to play.`,
`Any disciplinary violation by any member of the
team will lead to disqualification of the team and
Teams must report on time to the court and no
extra time will be given for warm-ups, if late.`,
`All participants need to come in a proper kit -
shorts (no three-fourths, denim shorts, tracks
etc. are allowed).`,
`If any player does not come in a proper kit or
shoes, the player will not be allowed to play the
match.`,
`Teams must bring their own adequate volleyballs
for practice; no balls will be provided by the
institute for practice. However, a ball will be
provided for the match.`,
`Courts may be pre-reserved for Institute events or
team practice. Information regarding the same will
be put up on the noticeboard.`,
`Damage to the courts or equipment would imply
strict disciplinary action and fines against the
offender.`,
`Games are played to 21 points done by rally
scoring; win by two, with a 23-point cap. Rally
scoring means there is a point for every serve.
Teams will switch sides when the first team
reaches 11 points.`,
`Players must wear shorts and a shirt. Jewellery is
not permitted with the exception of flat wedding
bands.`,
`Headbands and kneepads are optional. Shoes
must be worn at all times in the bar/patio area of
VBGB.`,
`The decision of the referees and the umpires will be
final and binding. No protests would be entertained.
Therefore, any team leaving the field of (lay as a mark
of protest and conceding a walkover shall be
deemed to have lost the fixture and will be eliminated
from the rest of the event.`],

'Water Polo (Men)':[`The competitions shall be conducted under FINA 
as adopted from time to time by the Swimming Federation of India 
unless otherwise modified.`,
`Each college shall submit a list of players, not exceeding 
13 (7 playings + 6 reserves).`,
`A team will be awarded 3 points for a win, 1 for a draw, 
and 0 points for a lost match.`,
`As per SFI rules the total goals ‘FOR’ minus the total 
Goals ‘AGAINST’ of all the matches played by the team 
in the league matches shall decide the tie during 
league matches. If the tie still persists, SFI rules 
will be adopted for breaking the tie.`],

'Weight Lifting (Men)':[`The competition shall be conducted under the
International Weightlifting Federation Rules as
adopted from time to time by the Weightlifting
Federation of India, unless otherwise modified.`,
`The competitions in the following weight class as
shown in the Table will be held. The
corresponding points of each event for
Weightlifting Championship are indicated in the
table`,
`Each college will be allowed to enter two competitors for 
each weight class. The competition for a weight class will
be held even if there is only one competitor.`,
`Each college will be submitting a complete
team list (2 participants) of participants with the
weight category in which they will be
participating before the weighing in on the first
day, irrespective of whether the competition for
that weight category is being held on that day
or not.`,
`In case of a tie for the Weightlifting
Championship, the team winning the maximum
number of gold medals will be awarded the
Championship. If a tie persists, the team
winning the maximum number of silver medals
will be awarded the championship and so on.`,
`The progression after every successful attempt
for the same weightlifter must be a minimum of
1 Kg.`,
`Certificates shall be awarded to the top three
places in all weightlifting categories.`,
`The competitors should only wear ‘position
slips’ and no oil or grease should be applied on
the body at any stage.`,
`For the rules of Best Lifter click on the pdf icon above and you can
find the rules in weight lifting section.`],

'General Rules':[`Each contingent should have a leader.`,
`Identity cards issued at the time of registration
should be carried at all times and must be
produced on demand. In case anyone loses the
Identity card, he/she should immediately collect
a new one else he/she will not allow competing
in his/her respective games`,
`In case of participation in multiple events, he/
she will be responsible in the case of a clash of
any events.`,
`Types of Tournaments: League, knockout or
League come knockout depending on the
number of teams registered.`,
`The contingent leader is responsible to take
care of the discipline and decorum of his/her
team.`,
`A maximum of 5 managers or coaches will be
allowed to accompany their contingent (their
registration will be made as a participant)`,
`Acts of hooliganism, abuse, fighting, eve
teasing, disrupting rules and harmony of the
campus, vandalising infrastructure or
instruments are strictly prohibited`,
`Boys are strictly prohibited from girl's
accommodation at any time vice versa.`,
`Usage/consumption and/or possession of
alcohol, drugs, substances, and devices of
smoking is strictly prohibited.`,
`All the contingent members must obey the
rules and regulations of the security
department of the institute.`,
`Any issue of eve teasing will be severely
penalised by the SPIRIT Committee resulting in
the disqualification of the whole contingent.
12.Decisions made by the officials will be final and
no objections will be entertained.`],

'Accomodation and Facilities':[`The contingent can avail the lodging facility at IIT
Guwahati by paying for the accommodation facilities
available.`,
`Four types of facilities are available for
accommodation and following are the prices for span
of 4 days from 24-27th October per head
• Dormitory style - 700/-
• Double occupancy - 1000/-
• Single occupancy - 1200/-
• Guest rooms with attached washroom - 1400/-`,
`Beddings will be provided along with a basic
hospitality kit, but participants must bring their own
bed-sheets and essential items.`,
`The coaches or managers accompanying the
contingent will also have to pay the accommodation
fee depending upon the room that they choose to
stay at.`,
`We have limited accommodation so we will be
providing accommodation on a first come first serve
basis.`,
`Refreshments will be provided to all participants
during their events.`,
`Queries, to change the given accommodation
will be entertained.`,
`We strongly discourage you from carrying any
valuables and we will not be responsible under
any circumstance for any loss you may suffer
during your stay at IIT Guwahati. You are
expected to take care of your own luggage.`,
`The accommodation fees doesn’t include the
food charges and must be availed separately`,
`There are various hostel messes , canteens and
foodcourts across the campus and choice can
made out of any of these`,
`While in case of messes specifically the charges
per day are
• Breakfast - 60 /- per head
• Lunch - 75 /- per head
• Dinner - 75/- per head`],

'Arrival':[`Every participant should produce their valid
institute ID cards at the time of Registration.`,
`The arriving contingent must report at the
Sports Gymkhana Office for their final
registration and get their accommodation
details.`,
`Make sure that the complete contingent arrives
at the same time for smoother and faster
registration.`,
`Only the registered participants will be allowed
to participate in their events.`,
`Fixtures will be released 2 days before the
inauguration, and no request to change the
fixture shall be entertained.`,
`You are requested to contact the Public
Relations Team at least 24 hours before your
arrival.`,
`A confirmation letter given to you by our Public
Relations Team will be mandatory to produce at
the time of registration.`],

'Documentation Required':[`Two hard copies of the Contingent Details.`,
` Identity cards and 2-passport size photographs
with the respective names (behind the
photograph) of every member of the contingent.`,
`Confirmation letter given to you by our Public
Relations Team.`,
`Institute / college ID card of their respective
college (not older than 1 year )`]
,
    Yoga: [
      " Competitor has to perform 4 compulsory Yoga Asanas.",
      " Holding time of Compulsory Yogasanas is 30 seconds.",
      " Always start and end your Yogasanas performance with Namaste Mudra.",
    ],
    // Add rules for other sports as needed
  };

  const handleButtonClick = (sport) => {
    setFormData(prev => ({ ...prev, sport }));
    setSelectedSport(sport);
    setShowModal(true);  // Show the modal on button click
  };

    return (
        <div className={`mt-2 text-sm font-medium uppercase font-fireSans p-4`}>
            <h2 className="text-4xl mb-4">Rules</h2>

            <h3 className="text-2xl mb-4">General Rules</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {['General Rules','Accomodation and Facilities','Arrival','Documentation Required']
          .map((sport) => (
            <button
              key={sport}
              className={`p-6 md:p-8 lg:p-10 border-2 rounded-xl transition-colors duration-200 ease-in-out 
              border-gray-300 hover:bg-gray-100`}
              onClick={() => handleButtonClick(sport)}
            >
              {/* <img src={`${sport}.png`} alt={sport}></img> */}
              <p className='font-fireSans rounded-lg mt-2'>{sport}</p>
            </button>
          ))}
      </div>
            <h3 className="text-2xl mb-4">Sports Rules</h3>
          
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
  {[
    'Football (Men)', 'Cricket (Men)', 'Badminton (Men)', 'Badminton (Women)', 'Basketball (Men)', 
    'Basketball (Women)', 'Lawn Tennis (Men)', 'Lawn Tennis (Women)', 'Table Tennis (Men)', 
    'Table Tennis (Women)', 'Kho-kho (Men)', 'Kho-kho (Women)', 'Volleyball (Men)', 
    'Volleyball (Women)', 'Hockey (Men)', 'Swimming (Individual)', 'Athletics (Men)', 
    'Athletics (Women)', 'Carrom', 'Yoga', 'Water Polo (Men)', 'Chess', 'Squash (Men)', 
    'Squash (Women)', 'Kabaddi (Men)', 'Weight Lifting (Men)'
  ]
    .sort() // Sort the sports array
    .map((sport) => (
      <button
        key={sport}
        className={`p-6 md:p-8 lg:p-10 border-2 rounded-xl transition-colors duration-200 ease-in-out 
          flex flex-col justify-center items-center border-gray-300 hover:bg-gray-100`}
        onClick={() => handleButtonClick(sport)}
      >
        <img src={`${sport}.png`} alt={sport} className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" /> {/* Control image size */}
        <p className='font-fireSans text-center mt-2'>{sport}</p>
      </button>
    ))}
</div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={selectedSport}
        rules={sportRules[selectedSport] || ["No rules available for this sport."]}
      />
      </div>
      

      );
}

export default Rule;