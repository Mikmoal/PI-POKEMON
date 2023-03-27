import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { filterType, getTypes } from "../../redux/actions";


export default function FilterTypes({paginate}){
    const typesState = useSelector((state)=> state.types)
    const dispatch = useDispatch();
    
    const typesOrder = typesState.sort((a, b) => { //se ordena alfabeticamente para que salga bien en el select
        if (a.name > b.name) { return 1; }
        if (a.name < b.name) { return -1;}
        return 0;
      })
   
    
    useEffect(()=>{
        dispatch(getTypes());
        }, [dispatch])
    
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