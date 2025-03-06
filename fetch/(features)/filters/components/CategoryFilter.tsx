interface CategoryFilterProps {
  sortField: string;
  setSortField: (field: string) => void;
}

export default function CategoryFilter({
  sortField,
  setSortField,
}: CategoryFilterProps) {
  return (
    <div>
      <select
        value={sortField}
        onChange={(e) => setSortField(e.target.value)}
        className="w-full rounded-md border p-2"
      >
        <option value="breed">Breed</option>
        <option value="name">Name</option>
        <option value="age">Age</option>
      </select>
    </div>
  );
}
