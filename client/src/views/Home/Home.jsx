import Cards from "../../components/Cards/Cards";
import style from "../../components/Cards/Cards.module.css"
import NavBar from "./NavBar.jsx";
import Paginado from "./Paginado.jsx";
import loading from "../../loading.gif";

function Home() {
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