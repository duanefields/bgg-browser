import { Game } from "../shared.types"
import classes from "./GameCell.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers, faClock, faDice, faStar, faRankingStar } from "@fortawesome/free-solid-svg-icons"

type GameCellProps = {
  game: Game
}

const GameCell = ({ game }: GameCellProps) => {
  let playtime = `${game.minPlaytime}-${game.maxPlaytime} mins`
  if (game.minPlaytime === game.maxPlaytime) {
    playtime = `${game.playtime ?? game.minPlaytime} mins`
  }

  // handle null values of playtime that are uncommon
  if (game.minPlaytime === null && game.maxPlaytime === null && game.playtime === null) {
    playtime = ""
  }

  let playerCount = `${game.minPlayers}-${game.maxPlayers}`
  if (game.minPlayers === game.maxPlayers) {
    playerCount = `${game.minPlayers}`
  }

  let rating = `${game.averageRating} (${game.myRating})`
  if (game.myRating === null) {
    rating = `${game.averageRating}`
  }

  const onClick = (game: Game) => {
    window.open(game.url, "_blank")
  }

  return (
    <div data-testid="game" className={classes.gridContainer} onClick={() => onClick(game)}>
      <img
        className={classes.thumbnail}
        src={game.thumbnail}
        alt={game.name}
        height={90}
        width={90}
      />
      <h3 className={classes.headerArea}>{game.name}</h3>
      <div className={classes.infoArea}>
        <div data-testid="playerCount" title="Player Count">
          <FontAwesomeIcon icon={faUsers} /> {playerCount}
        </div>
        <div data-testid="playtime" title="Playtime">
          <FontAwesomeIcon icon={faClock} /> {playtime}
        </div>
        <div data-testid="rating" title="BGG Rating (Your Rating)">
          <FontAwesomeIcon icon={faStar} /> {rating}
        </div>
        <div data-testid="rank" title="BGG Rank">
          <FontAwesomeIcon icon={faRankingStar} /> {game.rank?.toLocaleString()}
        </div>
        <div data-testid="plays" title="Number of Plays">
          <FontAwesomeIcon icon={faDice} />{" "}
          {game.numPlays.toLocaleString()}
        </div>
      </div>
    </div>
  )
}

export default GameCell
