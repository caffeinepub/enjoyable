import Text "mo:core/Text";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Map "mo:core/Map";

actor {
  type Game = {
    id : Text;
    name : Text;
    description : Text;
    category : Text;
    thumbnailUrl : Text;
    embedUrl : Text;
    featured : Bool;
  };

  module Game {
    public func compare(game1 : Game, game2 : Game) : Order.Order {
      Text.compare(game1.name, game2.name);
    };
  };

  let games = Map.empty<Text, Game>();

  let initialGames : [Game] = [
    {
      id = "game1";
      name = "Galactic Invaders";
      description = "Classic space shooter game";
      category = "Action";
      thumbnailUrl = "https://example.com/thumbnails/game1.png";
      embedUrl = "https://galactic-invaders.itch.io/game";
      featured = true;
    },
    {
      id = "game2";
      name = "Puzzle Master";
      description = "Challenging puzzle adventure";
      category = "Puzzle";
      thumbnailUrl = "https://example.com/thumbnails/game2.png";
      embedUrl = "https://puzzlemaster.itch.io/game";
      featured = true;
    },
    {
      id = "game3";
      name = "Speed Racer";
      description = "High-speed racing game";
      category = "Racing";
      thumbnailUrl = "https://example.com/thumbnails/game3.png";
      embedUrl = "https://speedracer.itch.io/game";
      featured = false;
    },
    {
      id = "game4";
      name = "Jungle Adventure";
      description = "Exciting platformer in the jungle";
      category = "Adventure";
      thumbnailUrl = "https://example.com/thumbnails/game4.png";
      embedUrl = "https://jungleadventure.itch.io/game";
      featured = true;
    },
    {
      id = "game5";
      name = "Soccer Stars";
      description = "Fun soccer arcade game";
      category = "Sports";
      thumbnailUrl = "https://example.com/thumbnails/game5.png";
      embedUrl = "https://soccerstars.itch.io/game";
      featured = false;
    },
    {
      id = "game6";
      name = "Brick Breaker";
      description = "Classic brick breaking arcade game";
      category = "Arcade";
      thumbnailUrl = "https://example.com/thumbnails/game6.png";
      embedUrl = "https://brickbreaker.itch.io/game";
      featured = true;
    },
    {
      id = "game7";
      name = "Maze Runner";
      description = "Navigate through challenging mazes";
      category = "Puzzle";
      thumbnailUrl = "https://example.com/thumbnails/game7.png";
      embedUrl = "https://mazerunner.itch.io/game";
      featured = false;
    },
    {
      id = "game8";
      name = "Alien Blaster";
      description = "Action-packed alien shooter";
      category = "Action";
      thumbnailUrl = "https://example.com/thumbnails/game8.png";
      embedUrl = "https://alienblaster.itch.io/game";
      featured = true;
    },
    {
      id = "game9";
      name = "Kart Mania";
      description = "Exciting kart racing game";
      category = "Racing";
      thumbnailUrl = "https://example.com/thumbnails/game9.png";
      embedUrl = "https://kartmania.itch.io/game";
      featured = false;
    },
    {
      id = "game10";
      name = "Island Adventure";
      description = "Explore mysterious islands";
      category = "Adventure";
      thumbnailUrl = "https://example.com/thumbnails/game10.png";
      embedUrl = "https://islandadventure.itch.io/game";
      featured = true;
    },
    {
      id = "game11";
      name = "Basketball Jam";
      description = "Arcade-style basketball game";
      category = "Sports";
      thumbnailUrl = "https://example.com/thumbnails/game11.png";
      embedUrl = "https://basketballjam.itch.io/game";
      featured = false;
    },
    {
      id = "game12";
      name = "Space Breaker";
      description = "Break blocks in space";
      category = "Arcade";
      thumbnailUrl = "https://example.com/thumbnails/game12.png";
      embedUrl = "https://spacebreaker.itch.io/game";
      featured = true;
    },
    {
      id = "game13";
      name = "Puzzling Paths";
      description = "Solve intricate puzzles";
      category = "Puzzle";
      thumbnailUrl = "https://example.com/thumbnails/game13.png";
      embedUrl = "https://puzzlingpaths.itch.io/game";
      featured = false;
    },
    {
      id = "game14";
      name = "Hero's Quest";
      description = "Embark on a heroic adventure";
      category = "Adventure";
      thumbnailUrl = "https://example.com/thumbnails/game14.png";
      embedUrl = "https://herosquest.itch.io/game";
      featured = false;
    },
    {
      id = "game15";
      name = "Football Frenzy";
      description = "Fast-paced football game";
      category = "Sports";
      thumbnailUrl = "https://example.com/thumbnails/game15.png";
      embedUrl = "https://footballfrenzy.itch.io/game";
      featured = false;
    },
    {
      id = "game16";
      name = "Tank Wars";
      description = "Battle tanks in action-packed arenas";
      category = "Action";
      thumbnailUrl = "https://example.com/thumbnails/game16.png";
      embedUrl = "https://tankwars.itch.io/game";
      featured = false;
    },
    {
      id = "game17";
      name = "Race Track";
      description = "Compete on challenging race tracks";
      category = "Racing";
      thumbnailUrl = "https://example.com/thumbnails/game17.png";
      embedUrl = "https://racetrack.itch.io/game";
      featured = false;
    },
    {
      id = "game18";
      name = "Forest Explorer";
      description = "Adventure through mystical forests";
      category = "Adventure";
      thumbnailUrl = "https://example.com/thumbnails/game18.png";
      embedUrl = "https://forestexplorer.itch.io/game";
      featured = false;
    },
    {
      id = "game19";
      name = "Arcade Classic";
      description = "Collection of classic arcade games";
      category = "Arcade";
      thumbnailUrl = "https://example.com/thumbnails/game19.png";
      embedUrl = "https://arcadeclassic.itch.io/game";
      featured = false;
    },
    {
      id = "game20";
      name = "Puzzle Quest";
      description = "Embark on a quest of puzzles";
      category = "Puzzle";
      thumbnailUrl = "https://example.com/thumbnails/game20.png";
      embedUrl = "https://puzzlequest.itch.io/game";
      featured = false;
    },
  ];

  for (game in initialGames.values()) {
    games.add(game.id, game);
  };

  public query ({ caller }) func getAllGames() : async [Game] {
    games.values().toArray().sort();
  };

  public query ({ caller }) func searchGames(searchTerm : Text) : async [Game] {
    let q = searchTerm.toLower();
    let results = games.values().toArray().filter(
      func(game) {
        game.name.toLower().contains(#text(q)) or game.category.toLower().contains(#text(q));
      }
    );
    results.sort();
  };

  public query ({ caller }) func getFeaturedGames() : async [Game] {
    let results = games.values().toArray().filter(
      func(game) { game.featured }
    );
    results.sort();
  };

  public query ({ caller }) func getGameById(id : Text) : async Game {
    switch (games.get(id)) {
      case (null) { Runtime.trap("Game not found") };
      case (?game) { game };
    };
  };
};
