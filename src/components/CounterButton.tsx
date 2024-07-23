import { useState } from "react"

const CounterButton = () => {
  const [count, setCount] = useState(0)
  const onClick = () => setCount((count) => count + 1)

  return <button onClick={onClick}>count is {count}</button>
}

export default CounterButton
