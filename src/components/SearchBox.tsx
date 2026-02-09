import classes from "./SearchBox.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

type SearchBoxProps = {
  searchText: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBox = ({ searchText, onChange }: SearchBoxProps) => {
  return (
    <div className={classes.wrapper}>
      <input
        type="search"
        name="search"
        aria-label="Filter by name"
        placeholder="Filter by name"
        className={classes.searchBox}
        onChange={onChange}
        value={searchText}
        autoFocus={false}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
      <span className={classes.icon}>
        <FontAwesomeIcon icon={faSearch} />
      </span>
    </div>
  )
}

export default SearchBox
