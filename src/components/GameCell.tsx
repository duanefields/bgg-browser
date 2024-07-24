import { Game } from "../shared.types"
import classes from "./GameCell.module.css"

interface GameCellProps {
  game: Game
}

const GameCell = ({ game }: GameCellProps) => {
  return (
    <div className={classes.gridContainer}>
      <img className={classes.thumbnail} src={game.thumbnail} alt={game.name} />
      <h3 className={classes.headerArea}>{game.name}</h3>
      <div className={classes.infoArea}>
        <div>
          Players: {game.minPlayers}-{game.maxPlayers}
        </div>
        <div>
          Playtime: {game.minPlaytime}-{game.maxPlaytime} minutes
        </div>
        <div>Published: {game.yearPublished}</div>
        <div>Average Rating: {game.averageRating}</div>
        <div>My Rating: {game.myRating}</div>
        <div>Plays: {game.numPlays}</div>
        <div>Rank: {game.rank}</div>
      </div>
    </div>
  )
}

export default GameCell
