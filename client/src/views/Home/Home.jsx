import Cards from "../../components/Cards/Cards";
import style from "../../components/Cards/Cards.module.css"
// import NavBar from "../../components/NavBar/NavBar";
import Pagination from "../../components/Pagination/Pagination";
import loading from "../../loading.gif";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getTypes, createPokemon, getPokemons, clean } from "../../redux/actions";

function Home() {
  const pokemonsArr = useSelector(state => state.pokemons)
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(clean())
  }, [dispatch])

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(12);


  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = pokemonsArr.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className="Home">
      <h1>View of Home page</h1>

      <div className={style.paginado}>
        <Pagination
          postPerPage={postPerPage}
          totalPost={pokemonsArr.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>


      {pokemonsArr.length === 0 ? (
        <div className={style.loading}><img src={loading} width='150px' alt='loading' /> </div>) :
        (
          <Cards />
        )}
    </div>
  );
}

export default Home;