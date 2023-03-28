import { useDispatch } from "react-redux";
import { orderBy } from "../../redux/actions";
import { A_Z, Z_A } from "../constantes/order";
import style from "./Orders.module.css";

export default function Order(){
    const dispatch = useDispatch()

    function onSelectChange(e){
        dispatch(orderBy(e.target.value))
    }

    return (
        <div>
            <select onChange={onSelectChange} className={style.select}>
                <option defaultValue>Order By</option>
                <option value={A_Z}>Order A - Z</option>
                <option value={Z_A}>Order Z - A</option>
            </select>
        </div>
    )
}