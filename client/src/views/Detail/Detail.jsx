export default function Detail(props) {
  //const types = props.types.join(', ');
  return (
    <div className="Detail">
      <div >
        
          <img src={props.image} alt={props.name} />
          <p>ID: {props.id}</p>
          <p>Name: {props.name}</p>
          <p>Life: {props.life}</p>
          <p>Attack: {props.attack}</p>
          <p>Defense: {props.defense}</p>
          <p>Speed: {props.speed}</p>
          <p>Height: {props.height}</p>
          <p>Weight: {props.weight}</p>
          <p>Types: {props.types}</p>
        
      </div>
    </div>
  );
}