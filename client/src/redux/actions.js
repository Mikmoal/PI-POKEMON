import axios from "axios";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_SEARCH = "GET_SEARCH";
export const DETAIL_POKEMONS = "DETAIL_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const FILTER_POKEMON = "FILTER_POKEMON";
export const FILTER_TYPE = "FILTER_TYPE";
export const ORDER_BY = "ORDER_BY";
export const ADD_POKEMON = "ADD_POKEMON";
export const FAIL = "FAIL";
export const LOADING = "LOADING";
export const CLEAN = "CLEAN";

export const getPokemons = () => async (dispatch) => {
  await axios
    .get("http://localhost:3001/pokemons")
    .then((response) => {
      dispatch({
        type: GET_POKEMONS,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};

export const getPokemonName = (name) => async (dispatch) => {
  try {
    await axios
      .get("http://localhost:3001/pokemons?name=" + name)
      .then((response) => {
        dispatch({
          type: GET_SEARCH,
          payload: response.data,
        });
      });
  } catch (error) {
    return alert("Pokemon no encontrado");
  }
};

export const getPokemonId = (id) => async (dispatch) => {
  try {
    // dispatch({
    //     type: LOADING
    // })
    await axios.get(`http://localhost:3001/pokemons/${id}`).then((response) => {
      dispatch({
        type: DETAIL_POKEMONS,
        payload: response.data,
      });
    });
  } catch (error) {
    return error;
  }
};

export const createPokemon = (payload) => async (dispatch) => {
  try {
    await axios
      .post("http://localhost:3001/pokemons", payload)
      .then((response) => {
        dispatch({
          type: ADD_POKEMON,
          payload: response.data,
        });
      });
  } catch (error) {
    return error;
  }
};

export const getTypes = () => async (dispatch) => {
  try {
    await axios.get("http://localhost:3001/types").then((response) => {
      dispatch({
        type: GET_TYPES,
        payload: response.data,
      });
    });
  } catch (error) {
    return error;
  }
};

export function filterPokemon(payload) {
  return {
    type: FILTER_POKEMON,
    payload,
  };
}

export function filterType(payload) {
  return {
    type: FILTER_TYPE,
    payload,
  };
}

export function orderBy(payload) {
  return {
    type: ORDER_BY,
    payload,
  };
}

export function clean() {
  return {
    type: CLEAN,
  };
}
