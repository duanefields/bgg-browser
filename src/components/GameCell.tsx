import { Game } from "../shared.types"

interface GameCellProps {
  game: Game
}

const GameCell = ({ game }: GameCellProps) => {
  return (
    <div>
      <h3>{game.name}</h3>
      <img src={game.thumbnail} alt={game.name} />
    </div>
  )
}

export default GameCell
