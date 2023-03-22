import { useForm } from "../../hook/useForm";

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

const validateForm = (form) => {
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;  //expresion regular valida que solo se acepten mayúsculas y minúsculas            
  let regexNumbers = /^[0-9]\d*(\.\d+)?$/; //  /[0-9]/ es otra expresión regular para numeros


  if (!form.name.trim()) {  //el trim() evalua que tenga información, que no haya espacios en blanco
    setErrors({ ...errors, name: "" })
  } else if (!regexName.test(form.name.trim())) {
    setErrors({ ...errors, name: "El campo 'Nombre' solo acepta letras y espacios en blanco" })
  } else if (form.name === "") {
    setErrors({ ...errors, name: "El nombre está vacío" })
  }

  if (!form.image) {
    setErrors({ ...errors, image: "El campo es requerido" })
  } else if (form.image === "") {
    setErrors({ ...errors, image: "El campo está vacío" })
  }

  if (!form.life.trim()) {
    setErrors({ ...errors, life: "" })
  } else if (!regexNumbers.test(form.life.trim())) {
    setErrors({ ...errors, life: "El campo vida solo acepta números" })
  } else if (form.life === "") {
    setErrors({ ...errors, life: "La vida está vacía" })
  }

  if (!form.attack.trim()) {
    setErrors({ ...errors, attack: "" })
  } else if (!regexNumbers.test(form.attack.trim())) {
    setErrors({ ...errors, attack: "El campo ataque solo acepta números" })
  } else if (form.attack === "") {
    setErrors({ ...errors, attack: "El ataque está vacío" })
  }

  if (!form.defense.trim()) {
    setErrors({ ...errors, defense: "" })
  } else if (!regexNumbers.test(form.defense.trim())) {
    setErrors({ ...errors, defense: "El campo defensa solo números" })
  } else if (form.defense === "") {
    setErrors({ ...errors, defense: "El campo defensa está vacío" })
  }

  if (!form.speed.trim()) {
    setErrors({ ...errors, speed: "" })
  } else if (!regexNumbers.test(form.speed.trim())) {
    setErrors({ ...errors, speed: "El campo velocidad solo números" })
  } else if (form.speed === "") {
    setErrors({ ...errors, speed: "El campo velocidad está vacío" })
  }

  if (!form.height.trim()) {
    setErrors({ ...errors, height: "" })
  } else if (!regexNumbers.test(form.height.trim())) {
    setErrors({ ...errors, height: "El campo altura solo números" })
  } else if (form.height === "") {
    setErrors({ ...errors, height: "El campo altura está vacío" })
  }

  if (!form.weight.trim()) {
    setErrors({ ...errors, weight: "" })
  } else if (!regexNumbers.test(form.weight.trim())) {
    setErrors({ ...errors, weight: "El campo peso solo números" })
  } else if (form.weight === "") {
    setErrors({ ...errors, weight: "El campo peso está vacío" })
  }

  if (!form.types.length === 0) {
    setErrors({ ...errors, types: "Se requiere mínimo un tipo" })


    // if (!form.life_span_max) {
    //   errors.life_span_max = "El campo es requerido";
    // } else if (!regexNumbers.test(form.life_span_max.trim())) {  //validación life_span_max
    //   errors.life_span_max = "Solo números"
    // } else if (parseInt(form.life_span_max) <= parseInt(form.life_span_min)) {
    //   errors.life_span_max = "La esperanza máxima de vida no debe ser menor a la mínima"
    // } else if (form.life_span_max > 16) {
    //   errors.life_span_max = "La esperanza máxima de vida no debe ser mayor a 16 años"
    // }
    return errors
  }


}

function Form() {

  const {                        // se hace destructuracion de useForm       
    form,
    errors,
    type,
    handleChange,
    handleBlur,
    handleTypes,
    removeTypes,
    handleSubmit,
  } = useForm(initialForm, validateForm); // useForm tiene los valores iniciales del formulario y la validaciones

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre</label>
        <input type="text" value={form.name} onChange={changeHandler} name="name" />
        {errors.name && <span>{errors.name}</span>}
      </div>

      <div>
        <label>Imagen</label>
        <input type="text" value={form.image} onChange={changeHandler} name="image" />
      </div>

      <div>
        <label>Vida</label>
        <input type="text" value={form.life} onChange={changeHandler} name="life" />
      </div>

      <div>
        <label>Ataque</label>
        <input type="text" value={form.attack} onChange={changeHandler} name="attack" />
      </div>

      <div>
        <label>Defensa</label>
        <input type="text" value={form.defense} onChange={changeHandler} name="defense" />
      </div>

      <div>
        <label>Velocidad (si tiene)</label>
        <input type="text" value={form.speed} onChange={changeHandler} name="speed" />
      </div>

      <div>
        <label>Altura (si tiene)</label>
        <input type="text" value={form.height} onChange={changeHandler} name="height" />
      </div>

      <div>
        <label>Peso (si tiene)</label>
        <input type="text" value={form.weight} onChange={changeHandler} name="weight" />
      </div>

      <div>
        <label>Tipo(s)</label>
        <input type="text" value={form.types} onChange={changeHandler} name="types" />
      </div>

      <button>Submit</button>
    </form>
  )
}

export default Form