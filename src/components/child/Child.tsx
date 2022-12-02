import { ChildProps } from "../../interface/interfaces";

function Child({handlerClick, count}: ChildProps): JSX.Element{
  return (
    <button onClick={ handlerClick }>{count}</button>
  )
}
export default Child;