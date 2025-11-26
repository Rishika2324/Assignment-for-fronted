type SearchBarProps = {
  value: string
  onChange: (value: string) => void
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <label className="search-bar">
    <span className="sr-only">Search widgets</span>
    <input
      type="search"
      placeholder="Search anything..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  </label>
)

