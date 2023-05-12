export default function navbar({ user, logout }) {
    return (<nav>
        <div className="container mx-auto">
            <div className="bg-gray-700 text-white flex items-center px-3 py-2">
                <span className="ml-auto">{user.name || user.email}</span>
                <a href='#' className="ml-auto" onClick={logout}>Logout</a>
            </div>
        </div>
    </nav>);
}