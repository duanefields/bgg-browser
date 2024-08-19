import { InputAdornment, TextField } from "@mui/material"
import classes from "./SearchBox.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

type SearchBoxProps = {
  searchText: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBox = ({ searchText, onChange }: SearchBoxProps) => {
  return (
    <TextField
      type="search"
      name="search"
      label="Filter by name"
      className={classes.searchBox}
      onChange={onChange}
      value={searchText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <FontAwesomeIcon icon={faSearch} />
          </InputAdornment>
        ),
      }}
      inputProps={{
        autoFocus: false,
        autoCapitalize: "none",
        autoComplete: "off",
        autoCorrect: "off",
        spellCheck: "false",
      }}
    />
  )
}

export default SearchBox
