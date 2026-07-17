import { Link } from 'react-router-dom'

const Sidebar = ({ isOpen = false, onClose = () => {} }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside className={`fixed left-0 top-16 z-50 h-full w-72 bg-gray-800 text-white pt-4 shadow-xl transition-transform duration-300 md:block md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="text-2xl font-bold mb-6">EMS</div>
          <nav className="flex flex-col gap-2">
            <Link to="/" onClick={onClose} className="px-4 py-2 rounded hover:bg-gray-700">Dashboard</Link>
            <Link to="/designation" onClick={onClose} className="px-4 py-2 rounded hover:bg-gray-700">Designation Management</Link>
            <Link to="/employees" onClick={onClose} className="px-4 py-2 rounded hover:bg-gray-700">Employee Management</Link>
            <Link to="/tasks" onClick={onClose} className="px-4 py-2 rounded hover:bg-gray-700">Tasks Management</Link>
          </nav>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
