import { useForm } from "../../hook/useForm.js";
import { Link } from "react-router-dom"
import style from "./Form.module.css";

const initialForm = {
  name: "",
  image: "",
  life: "",
  attack: "",
  defense: "",
  speed: "",
  height: "",
  weight: "",
  types: []
}

const validationsForm = (form) => {
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;  //expresion regular valida que solo se acepten mayúsculas y minúsculas            
  let regexNumbers = /^[0-9]\d*(\.\d+)?$/; //  /[0-9]/ es otra expresión regular para numeros
  let errors = {};

  if (!form.name.trim()) {  //el trim() evalua que tenga información, que no haya espacios en blanco
    errors.name = "El campo nombre es requerido"
  } else if (!regexName.test(form.name.trim())) {
    errors.name = "El campo 'Nombre' solo acepta letras y espacios en blanco"
  } else if (form.name === "") {
    errors.name = "El nombre está vacío"
  }

  if (!form.image) {
    errors.image = "El campo es requerido"
  } else if (form.image === "") {
    errors.image = "El campo está vacío"
  }

  if (!form.life.trim()) {
    errors.life = "El campo vida es requerido"
  } else if (!regexNumbers.test(form.life.trim())) {
    errors.life = "El campo vida solo acepta números"
  } else if (form.life === "") {
    errors.life = "La vida está vacía"
  }

  if (!form.attack.trim()) {
    errors.attack = "El campo ataque es requerido"
  } else if (!regexNumbers.test(form.attack.trim())) {
    errors.attack = "El campo ataque solo acepta números"
  } else if (form.attack === "") {
    errors.attack = "El ataque está vacío"
  }

  if (!form.defense.trim()) {
    errors.defense = "El campo defensa es requerido"
  } else if (!regexNumbers.test(form.defense.trim())) {
    errors.defense = "El campo defensa solo números"
  } else if (form.defense === "") {
    errors.defense = "El campo defensa está vacío"
  }

  if (!form.speed.trim()) {
    errors.speed = "El campo velocidad es requerido"
  } else if (!regexNumbers.test(form.speed.trim())) {
    errors.speed = "El campo velocidad solo números"
  } else if (form.speed === "") {
    errors.speed = "El campo velocidad está vacío"
  }

  if (!form.height.trim()) {
    errors.height = "El campo altura es requerido"
  } else if (!regexNumbers.test(form.height.trim())) {
    errors.height = "El campo altura solo números"
  } else if (form.height === "") {
    errors.height = "El campo altura está vacío"
  }

  if (!form.weight.trim()) {
    errors.weight = "El campo peso es requerido"
  } else if (!regexNumbers.test(form.weight.trim())) {
    errors.weight = "El campo peso solo números"
  } else if (form.weight === "") {
    errors.weight = "El campo peso está vacío"
  }

  if (form.types.length === 0) {
    errors.types = "Se requiere mínimo un tipo"
  }

  return errors
}

function Form() {
  const {                        // destructuracion de useForm       
    form,
    errors,
    type,
    handleChange,
    handleBlur,
    handleTypes,
    removeTypes,
    handleSubmit,
  } = useForm(initialForm, validationsForm); // useForm tiene los valores iniciales del formulario y la validaciones


  return (
    <div>
      <div className={style.nav}>
        <Link to="/home">Home</Link>
      </div>
      <div className={style.container}>
        <form className={style.formulario} onSubmit={handleSubmit}>
          <div>
            <label>Nombre </label>
            <input type="text" onChange={handleChange} onBlur={handleBlur} name="name" value={form.name} />
            {errors.name && <span>{errors.name}</span>}
          </div>

          <div>
            <label>Imagen </label>
            <input                                          //input image
              type="text"
              name="image"
              placeholder="image or url-image"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.image}
              require='true'
            />
            {errors.image && <span>{errors.image}</span>}
          </div>

          <div>
            <label>Vida </label>
            <input type="text" value={form.life} onBlur={handleBlur} onChange={handleChange} require='true' name="life" />
            {errors.life && <span>{errors.life}</span>}
          </div>

          <div>
            <label>Ataque </label>
            <input type="text" value={form.attack} onBlur={handleBlur} onChange={handleChange} require='true' name="attack" />
            {errors.attack && <span>{errors.attack}</span>}
          </div>

          <div>
            <label>Defensa </label>
            <input type="text" value={form.defense} onBlur={handleBlur} onChange={handleChange} require='true' name="defense" />
            {errors.defense && <span>{errors.defense}</span>}
          </div>

          <div>
            <label>Velocidad (si tiene) </label>
            <input type="text" value={form.speed} onBlur={handleBlur} onChange={handleChange} require='true' name="speed" />
            {errors.speed && <span>{errors.speed}</span>}
          </div>

          <div>
            <label>Altura (si tiene) </label>
            <input type="text" value={form.height} onBlur={handleBlur} onChange={handleChange} require='true' name="height" />
            {errors.height && <span>{errors.height}</span>}
          </div>

          <div>
            <label>Peso (si tiene) </label>
            <input type="text" value={form.weight} onBlur={handleBlur} onChange={handleChange} require='true' name="weight" />
            {errors.weight && <span>{errors.weight}</span>}
          </div>

          <div>

            <label>Tipo(s) </label>
            <select onChange={handleTypes} onBlur={handleBlur} defaultValue={'Choose an option'}>
              <option >Types</option>
              {type.map((e, index) => (
                <option value={e.id} name={e.name} key={index}>{e.name}</option>
              ))}
            </select>

            {errors.types && <span>{errors.types}</span>}

          </div>

          <div>
            {form.types.map((c, index) => {
              const found = type.find(element => element.id === parseInt(c));
              
              return (<button value={found.id} onClick={removeTypes} key={index}>x  {found.name}</button>)
            }
            )}
          </div>

          <div className={style.centralized}>
            <button className={style.back_btn}>
              <Link to="/home"><span>Back</span></Link>
            </button>

            <div>
              <input type="submit" value="Create" />
            </div>

          </div>



        </form>
      </div>

    </div>
  )
}

export default Form