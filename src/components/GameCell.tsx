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

  let playerCount = `${game.minPlayers}-${game.maxPlayers}`
  if (game.minPlayers === game.maxPlayers) {
    playerCount = `${game.minPlayers}`
  }

  let rating = `${game.averageRating} (${game.myRating})`
  if (game.myRating === 0) {
    rating = `${game.averageRating}`
  }

  const onClick = (game: Game) => {
    const win = window.open(game.url, "_blank")
    win?.focus()
  }

  return (
    <div className={classes.gridContainer} onClick={() => onClick(game)}>
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
          <FontAwesomeIcon fixedWidth={true} icon={faUsers} title="Player Count" titleId="1" />{" "}
          {playerCount}
        </div>
        <div>
          <FontAwesomeIcon fixedWidth={true} icon={faClock} title="Playtime" titleId="2" />{" "}
          {playtime} mins
        </div>
        <div>
          <FontAwesomeIcon
            fixedWidth={true}
            icon={faStar}
            title="BGG Rating (Your Rating)"
            titleId="3"
          />{" "}
          {rating}
        </div>
        <div>
          <FontAwesomeIcon fixedWidth={true} icon={faDice} title="Number of Plays" titleId="4" />{" "}
          {game.numPlays}
        </div>
        <div>
          <FontAwesomeIcon fixedWidth={true} icon={faRankingStar} title="BGG Rank" titleId="5" />{" "}
          {game.rank.toLocaleString()}
        </div>
      </div>
    </div>
  )
}

export default GameCell
