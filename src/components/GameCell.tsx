import { Game } from "../shared.types"
import classes from "./GameCell.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers, faClock, faDice, faStar, faRankingStar } from "@fortawesome/free-solid-svg-icons"

interface GameCellProps {
  game: Game
}

const GameCell = ({ game }: GameCellProps) => {
  let playtime = `${game.minPlaytime}-${game.maxPlaytime} mins`
  if (game.minPlaytime === game.maxPlaytime) {
    playtime = `${game.playtime || game.minPlaytime} mins`
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
        <div>
          <FontAwesomeIcon fixedWidth icon={faUsers} title="Player Count" titleId="1" />{" "}
          {playerCount}
        </div>
        <div>
          <FontAwesomeIcon fixedWidth icon={faClock} title="Playtime" titleId="2" /> {playtime}
        </div>
        <div>
          <FontAwesomeIcon fixedWidth icon={faStar} title="BGG Rating (Your Rating)" titleId="3" />{" "}
          {rating}
        </div>
        <div>
          <FontAwesomeIcon fixedWidth icon={faDice} title="Number of Plays" titleId="4" />{" "}
          {game.numPlays.toLocaleString()}
        </div>
        <div>
          <FontAwesomeIcon fixedWidth icon={faRankingStar} title="BGG Rank" titleId="5" />{" "}
          {game.rank?.toLocaleString()}
        </div>
      </div>
    </div>
  )
}

export default GameCell
