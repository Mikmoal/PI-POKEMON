import Card from "../../components/Card/Card";
import style from "./Home.module.css";
import Pagination from "../../components/Pagination/Pagination";
import NavBar from "../../components/NavBar/NavBar";
import loading from "../../loading.gif";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getPokemons, clean } from "../../redux/actions";

function Home() {

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(clean())
  }, [dispatch])

  const pokemonsArr = useSelector(state => state.pokemons)

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(12);


  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = pokemonsArr.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  return (
    <div>
      <NavBar paginate={paginate} />
      

      <div>
        <Pagination
          postPerPage={postPerPage}
          totalPost={pokemonsArr.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>


      {pokemonsArr.length === 0 ? (
        <div className={style.loading}>
          <img width='50px' src={loading} alt='loading' />
        </div>) :
        (
          <div className={style.allCards}>
            {currentPosts.map(e => (
            <Card
            key={e.id}
            id={e.id}
            name={e.name}
            image={e.image}
            life={e.life}
            attack={e.attack}
            defense={e.defense}
            speed={e.speed}
            height={e.height}
            weight={e.weight}
            types={e.types}
            />
          ))}
          </div>
        )}
    </div>
  );
}

export default Home;