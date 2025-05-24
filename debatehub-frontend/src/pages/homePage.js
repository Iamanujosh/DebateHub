import { useNavigate } from 'react-router-dom';
function Home() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const navigate = useNavigate();

    const handleStartDebate = () => {
        if(isLoggedIn){
            navigate('/startDebate')
        }
        else{
            alert('Login To Proceed')
        }
    }
    const handleStartAnonymusDebate = () => {
        if(isLoggedIn){
            navigate('/startAnoymusDebate')
        }
        else{
            alert('Login To Proceed')
        }
    }
    return (
        <div className="text-left p-8 mt-36 text-white">
            <h1 className="text-4xl font-bold">
            Shaping the Future of Dialogue
            </h1>

            <hr className="my-4 border-1 border-purple-600 max-w-sm" />

            <p className='text-lg text-gray-300 mt-4 max-w-sm'>
                  Welcome to DebateHub — a platform where ideas thrive through smart, respectful conversations. Arrange, join, and experience impactful debates like never before.
            </p>
            <div className=" mt-14 flex gap-4 items-center">
                <button onClick={handleStartDebate} className="bg-faintpurple text-white font-bold px-10 rounded-full py-2  m">Arrange Debate</button>
                <button onClick={handleStartAnonymusDebate} className=" text-purple-700 font-bold px-10 border-2 border-purple-600 rounded-full py-2 ">Start Debate</button>
            </div>
        </div>
    )
}

export default Home;