import {Link} from 'react-router-dom'

function Header(){
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

     const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    // optionally remove token too
    window.location.href = '/login';
  };

  
    return(
        <header className="text-white  font-white p-4 ">
            <div className="flex  gap-4 items-center">
                <h1 className='text-white font-bold text-lg ml-5'>DebateHub</h1>
                <nav className="mx-40 flex gap-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/how-it-works" className="hover:underline">How It Works</Link>
                    <Link to="/profile" className="hover:underline">Profile</Link>
                </nav>
                {!isLoggedIn ? (
                <>
                <Link to="/login" className='ml-auto rounded-full px-4 py-2 hover:scale-105 text-sm' >Login</Link>
                <Link to='/signup' className='text-white rounded-full px-4 py-2 hover:scale-105 text-sm border-2 border-purple-600'>Sign Up</Link>
                </>
                ) : (
                    <button onClick={handleLogout} className="text-white rounded-full px-4 py-2 hover:scale-105 text-sm border-2 border-purple-600 ml-auto">Logout</button>
                )}
            </div>
        </header>
    )
}

export default Header;