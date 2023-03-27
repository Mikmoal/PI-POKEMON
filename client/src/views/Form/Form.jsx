import { useForm } from "../../hook/useForm.js";

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre</label>
        <input type="text" onChange={handleChange} onBlur={handleBlur} name="name" value={form.name} />
        {errors.name && <span>{errors.name}</span>}
      </div>

      <div>
        <label>Imagen</label>
        <input                                          //input image
          type="text"
          name="image"
          placeholder="image or url-image"
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.image}
          require='true'
        />
        {errors.image && <p>{errors.image}</p>}
      </div>

      <div>
        <label>Vida</label>
        <input type="text" value={form.life} onBlur={handleBlur} onChange={handleChange} require='true' name="life" />
        {errors.life && <p>{errors.life}</p>}
      </div>

      <div>
        <label>Ataque</label>
        <input type="text" value={form.attack} onBlur={handleBlur} onChange={handleChange} require='true' name="attack" />
        {errors.attack && <p>{errors.attack}</p>}
      </div>

      <div>
        <label>Defensa</label>
        <input type="text" value={form.defense} onBlur={handleBlur} onChange={handleChange} require='true' name="defense" />
        {errors.defense && <p>{errors.defense}</p>}
      </div>

      <div>
        <label>Velocidad (si tiene)</label>
        <input type="text" value={form.speed} onBlur={handleBlur} onChange={handleChange} require='true' name="speed" />
        {errors.speed && <p>{errors.speed}</p>}
      </div>

      <div>
        <label>Altura (si tiene)</label>
        <input type="text" value={form.height} onBlur={handleBlur} onChange={handleChange} require='true' name="height" />
        {errors.height && <p>{errors.height}</p>}
      </div>

      <div>
        <label>Peso (si tiene)</label>
        <input type="text" value={form.weight} onBlur={handleBlur} onChange={handleChange} require='true' name="weight" />
        {errors.weight && <p>{errors.weight}</p>}
      </div>

      <div>

        <label>Tipo(s)</label>
        <select onChange={handleTypes} onBlur={handleBlur} defaultValue={'Chose an option'}>
          <option >Types</option>
          {type.map((e, index) => (
            <option value={e.name} name='types' key={index}>{e.name}</option>
          ))}
        </select>

        {errors.types && <p>{errors.types}</p>}

      </div>

      <div>
        {form.types.map((c, index) => (
          <button value={c}  onClick={removeTypes} key={index}>x  {c}</button>
        ))}
      </div>

      <div>
        <input type="submit" value="Create" />
      </div>
    </form>
  )
}

export default Form