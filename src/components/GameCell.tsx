import { Game } from "../shared.types"
import classes from "./GameCell.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers, faClock, faDice, faStar, faRankingStar } from "@fortawesome/free-solid-svg-icons"

interface GameCellProps {
  game: Game
}

const GameCell = ({ game }: GameCellProps) => {
  let playtime = `${game.minPlaytime}-${game.maxPlaytime}`
  if (game.minPlaytime === game.maxPlaytime) {
    playtime = `${game.playtime}`
  }

  let rating = `${game.averageRating} (${game.myRating})`
  if (game.myRating === 0) {
    rating = `${game.averageRating}`
  }

  return (
    <div className={classes.gridContainer}>
      <img className={classes.thumbnail} src={game.thumbnail} alt={game.name} />
      <h3 className={classes.headerArea}>{game.name}</h3>
      <div className={classes.infoArea}>
        <div>
          <FontAwesomeIcon icon={faUsers} /> {game.minPlayers}-{game.maxPlayers}
        </div>
        <div>
          <FontAwesomeIcon icon={faClock} /> {playtime} mins
        </div>
        <div>
          <FontAwesomeIcon icon={faStar} /> {rating}
        </div>
        <div>
          <FontAwesomeIcon icon={faDice} /> {game.numPlays}
        </div>
        <div>
          <FontAwesomeIcon icon={faRankingStar} /> {game.rank}
        </div>
      </div>
    </div>
  )
}

export default GameCell
