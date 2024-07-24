import classes from "./SearchBox.module.css"

interface SearchBoxProps {
  searchText: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBox = ({ searchText, onChange }: SearchBoxProps) => {
  return (
    <input
      type="text"
      className={classes.searchBox}
      autoFocus={false}
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
      placeholder="Search by name..."
      onChange={onChange}
      value={searchText}
    />
  )
}

export default SearchBox
