import Cards from "../../components/Cards/Cards";
import style from "../../components/Cards/Cards.module.css"
import NavBar from "./NavBar.jsx";
import Paginado from "./Paginado.jsx";
import loading from "../../loading.gif";

function Home() {
  const pokemonsArr = useSelector(state => state.pokemons)
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(clean())
  }, [dispatch])

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(8);


  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = pokemonsArr.slice(indexOfFirstPost, indexOfLastPost);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="Home">
      <h1>View of Home page</h1>

      <div>
        <NavBar
          paginate={paginate} />
      </div>

      <div className={style.paginado}>
        <Paginado
          postPerPage={postPerPage}
          totalPost={breeds.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>


      {breeds.length === 0 ? (
        <div className={style.loading}><img src={loading} width='150px' alt='loading' /> </div>) :
        (
          <Cards />
        )}
    </div>
  );
}

export default Home;