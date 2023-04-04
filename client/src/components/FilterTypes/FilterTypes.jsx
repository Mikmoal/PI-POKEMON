import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { filterType, getTypes } from "../../redux/actions";
import style from "./FilterTypes.module.css";


export default function FilterTypes({paginate}){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getTypes());
        }, [dispatch])

    const typesState = useSelector((state)=> state.typesState)
    //console.log(typesState instanceof Array); true
    
    const typesOrder = typesState.sort((a, b) => { //se ordena alfabeticamente para que salga bien en el select
        if (a.name > b.name) { return 1; }
        if (a.name < b.name) { return -1;}
        return 0;
      })
   
    
    function onFilterTypes(e){
        e.preventDefault()
        dispatch(filterType(e.target.value))
        paginate(1)
    }

    return(
        <div>
            <select onChange={onFilterTypes} className={style.select}>
                <option value='All Types' key='All Types'>All Types</option>
                {typesOrder.map((el, index)=> (
                    <option value={el.name} key={index}>{el.name}</option>
                ))}
            </select>
        </div>
    )
}