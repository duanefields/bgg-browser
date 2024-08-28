import { Skeleton } from "@mui/material"
import classes from "./GameCell.module.css"

const SkeletonGameCell = () => {
  return (
    <div className={classes.gridContainer} data-testid="skeleton">
      <Skeleton className={classes.thumbnail} variant="rectangular" width={90} height={90} />
      <Skeleton className={classes.headerArea} variant="text" width={400} height={30} />
      <div className={classes.infoArea}>
        <Skeleton variant="text" width={60} height={19} />
        <Skeleton variant="text" width={120} height={19} />
        <Skeleton variant="text" width={50} height={19} />
        <Skeleton variant="text" width={70} height={19} />
        <Skeleton variant="text" width={30} height={19} />
      </div>
    </div>
  )
}

export default SkeletonGameCell
