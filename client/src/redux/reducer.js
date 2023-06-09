import {
  GET_POKEMONS,
  GET_SEARCH,
  DETAIL_POKEMONS,
  LOADING,
  CLEAN,
  FILTER_TYPE,
  FILTER_POKEMON,
  GET_TYPES,
  ORDER_BY,
  ADD_POKEMON,
} from "./actions";
import { A_Z, Z_A } from "../constants";

const initialState = {
  pokemons: [],
  pokemonsDetail: {},
  pokemonsClean: [],
  typesState: [],
  empty: [],
  newPokemon: {},
  error: "",
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        pokemonsClean: action.payload,
        error: "",
      };
    case GET_SEARCH:
      return {
        ...state,
        pokemons: action.payload,
      };
    case GET_TYPES:
      return {
        ...state,
        typesState: action.payload,
      };
    case ORDER_BY:
      let orderAz = [...state.pokemons];
      orderAz = orderAz.sort((a, b) => {
        switch (action.payload) {
          case A_Z:
            if (a.name < b.name) {
              return -1;
            } else return 1;
          case Z_A:
            if (a.name > b.name) {
              return -1;
            } else return 1;
          default:
            return 0;
        }
      });
      return {
        ...state,
        pokemons: orderAz,
      };
    case FILTER_TYPE:
      let allTypes = [...state.pokemonsClean]; // O typesState ??????
      //if(action.payload === 'All Temperaments') return {...state, breeds: state.breeds}
      let aux2 =
        action.payload === "All Types"
          ? allTypes
          : allTypes.filter((el) => el.types.includes(action.payload));
      console.log(aux2);
      return {
        ...state,
        pokemons: aux2,
      };
    case FILTER_POKEMON:
      let allPokemons = [...state.pokemonsClean];
      let aux;
      console.log(allPokemons);
      if (action.payload === "All Pokemons")
        return { ...state, pokemons: allPokemons };
      if (action.payload === "Pokemons api") {
        aux = allPokemons.filter((e) => Number(e.id));
      }
      if (action.payload === "New Pokemons") {
        aux = allPokemons.filter((e) => !Number(e.id));
      }

      console.log(aux);
      return {
        ...state,
        pokemons: aux,
      };
    case DETAIL_POKEMONS:
      console.log(action.payload)
      return {
        ...state,
        pokemonsDetail: action.payload,
      };
    case ADD_POKEMON:
      return {
        ...state,
        newPokemon: action.payload,
      };
    // case FAIL:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAN:
      return {
        ...state,
        pokemonsDetail: [],
      };
    default:
      return { ...state };
  }
};

export default reducer;
