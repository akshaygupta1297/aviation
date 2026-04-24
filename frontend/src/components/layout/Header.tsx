export default function Header() {
  return (
    <div className="bg-white p-4 shadow flex justify-between sticky top-0 z-10">
      <input
        placeholder="Search..."
        className="border rounded px-3 py-1"
      />
      <div>Admin</div>
    </div>
  );
}