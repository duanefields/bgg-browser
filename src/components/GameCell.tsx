import { Game } from "../shared.types"

type GameProps = {
  game: Game
}

const GameCell = ({ game }: GameProps) => {
  return (
    <div>
      <h3>{game.name}</h3>
      <img src={game.thumbnail} alt={game.name} />
    </div>
  )
}

export default GameCell
