import { useState } from "react";
function Form() {
  const [form, setForm] = useState({
    name: "",
    image: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: []
  })

  const changeHandler = (event) => {
    const property = event.target.name
    const value = event.target.value

    setForm({ ...form, [property]: value })
  }

  return (
    <form>
      <div>
        <label>Nombre</label>
        <input type="text" value={form.name} onChange={changeHandler} name="name" />
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

export default Form;