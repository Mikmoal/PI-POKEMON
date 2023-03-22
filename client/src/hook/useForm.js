import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, createPokemon, getPokemons } from "../redux/actions";
import { useHistory } from "react-router-dom";

export const useForm = (initialForm, validateForm) => {
  // por parámetros llega el estado inicial y la funcion validateForm(son todas las validaciones)
  const [form, setForm] = useState(initialForm); // el estado inicial se reciben por parámetros
  const [errors, setErrors] = useState({}); // se usa para los errores, se inicia como un objeto vacío, el cual se llenara de errores. Si el el objeto está vacío entonces no hay errores

  var namePokemon = useSelector((state) => state.pokemonsClean);
  console.log(namePokemon);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  const type = useSelector((state) => state.types).sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
  console.log(type);

  const handleChange = (e) => {
    //esta función se liga al value de los inputs
    setForm({
      ...form, //se pasa una copia del formulario
      [e.target.name]: e.target.value, //se hace el cambio por el evento que entra por parametro
    });
  };
  //   const changeHandler = (event) => { // código de Vega
  //     const property = event.target.name
  //     const value = event.target.value

  //     validate({ ...form, [property]: value })

  //     setForm({ ...form, [property]: value })

  //   }

  const handleBlur = (e) => {
    // esta función lanza las validaciones al perder el foco las propiedades del formulario.
    handleChange(e); //
    setErrors(validateForm(form)); //validateForm se ejecuta dentro del estado de error, y llenara el objeto vacío con los errores
  };

  const handleTypes = (e) => {
    if (form.types.includes(e.target.value)) {
      return;
    } else {
      setForm({
        ...form,
        types: [...form.types, e.target.value],
      });
    }
  };

  const removeTypes = (e) => {
    setForm({
      ...form,
      types: form.types.filter((el) => el !== e.target.value),
    });
  };

  const handleSubmit = (e) => {
    // hace el submit(envía) del formulario
    e.preventDefault();
    setErrors(validateForm(form));

    if (form.name) {
      var aux = namePokemon.find((e) => e.name === form.name);
      console.log(aux);
      if (aux !== undefined) {
        return alert("Nombre repetido");
      }
    }
    if (Object.keys(errors).length > 0) {
      //preguntamos si el objeto errores esta vacío, si se cumple se procesa
      alert("Falta completar campos por completar o hay un error");
    } else if (
      form.name === "" &&
      form.image === "" && //si hay campos vacíos no prosigue
      form.life === "" &&
      form.attack === "" &&
      form.defense === "" &&
      form.speed === "" &&
      form.height === "" &&
      form.weight === "" &&
      !form.types.length
    ) {
      return alert("Hay campos sin completar");
    } else {
      dispatch(createPokemon(form));
      alert("Pokemon created"); //crea el pokemon y devuelve al home
      setForm({
        name: "",
        image: "",
        life: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: [],
      });
      history.push("/home");
    }
  };

  return {
    form,
    errors,
    type,
    namePokemon,
    handleChange,
    handleBlur,
    handleTypes,
    removeTypes,
    handleSubmit,
  };
};
