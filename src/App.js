/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable no-unreachable */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";


function App() {
  const [name , setName] = useState("");
  const [movie, setMovie] = useState([]);
  const [page , setPage] = useState(1);

  const numbers = [1,2,3,4,5,6,7,8,9,10];

  const fetchMovie = async () => {
    let API = "";
    setMovie([]);
    // eslint-disable-next-line eqeqeq
    if(name.length == 0) {
      // eslint-disable-next-line no-unused-vars
      API =  `https://api.themoviedb.org/3/movie/now_playing?api_key=d62e1adb9803081c0be5a74ca826bdbd&page=${page}`;
    }
    else{
     // eslint-disable-next-line no-unused-vars
     API =  `https://api.themoviedb.org/3/search/movie?api_key=d62e1adb9803081c0be5a74ca826bdbd&query=${name}`;
    }
    const response = await fetch(API);
    const data = await response.json();
    setMovie(data.results);

  }

  useEffect (
    // eslint-disable-next-line react-hooks/exhaustive-deps
     () => {
      fetchMovie();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name , page]);

  console.log("movie" , movie);

  const nameChangeHandler = (event) => {
    setName(event.target.value)
  }

  const prevHandler = () => {
    if(page != 1){
      setPage(page - 1)
    }
  }

  const nextHandler = () => {
    if(numbers.length != page) {
      setPage(page + 1)
    }
  }
  return (
    <>
    <div className="text-center my-2">
    <nav aria-label="Page navigation example">
    <ul className="inline-flex -space-x-px text-sm">
      <li onClick={prevHandler}>
        <a
          href="#"
          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Previous
        </a>
      </li>
      {
        numbers.map((num) => {
          return <li key={num} onClick={() => {setPage(num)}}>
             <a
          href="#"
          className={` ${num == page ? `!bg-blue-600 !text-black` : ``} flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
        >
         {num}
        </a>
          </li>
        })
      }
      <li onClick={nextHandler}>
        <a
          href="#"
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
        </a>
      </li>
    </ul>
  </nav>
    </div>
    <div className="max-w-[1200px] shadow-lg mx-[auto] p-3 my-2">
      <input type="text" value={name} className="p-3 border rounded w-full  focus:outline-none" onChange={nameChangeHandler} />
      {
        movie.length == 0 ? <div className="my-3 text-center text-xl text-gray-600">Loading....</div> : <div className="grid grid-cols-4">
        {
          movie.map((movie , index ) =>  
            <Box key={index} data={movie} />
          )
        }
      </div>
      }
    </div>
    </>
  );
}

export default App;

// eslint-disable-next-line no-unused-vars
const Box = ({data}) => {
  // object destruction
  // data.title
  return(
    <div className="p-2 ">
      <div className="border relative overflow-hidden group">
        <div className=" duration-200  group-hover:left-[0] w-full h-full absolute top-0 left-[100%] bg-[rgba(0,0,0,0.8)] flex flex-col justify-center  text-center items-center">
          <div className="text-[20px] font-bold text-white ">{data.title}</div>
          <div className="text-[10px] font-bold text-white ">{data.vote_average}</div>
        </div>
        <img src={`https://image.tmdb.org/t/p/w1280${data.poster_path}`} alt="" />
      </div>
    </div>
  )
}
