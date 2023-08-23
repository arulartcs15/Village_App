import { useDispatch,useSelector } from "react-redux"
import { useEffect ,useState } from "react"
import { asyncAccountDelete } from "../actions/usersActions"
import { asyncGetVillage } from "../actions/villagesActions"
import Swal from "sweetalert2"

const DeleteAccount = (props) => {

    const dispatch = useDispatch()

    const {t} = props

    const[villageId,setVillageId] =useState('')

    const accountData = useSelector((state)=>{
        return state.users.userDetails
    })
      
     useEffect(()=>{
          dispatch(asyncGetVillage(accountData._id))
    },[accountData])

 
    const data = useSelector((state)=>{
         return state.village.data
        
    })
   
  const handleDelete = () => {
         if(accountData.role === 'admin'){
        setVillageId(data._id)
         }
      
       Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                if(accountData.role  === 'admin' ){
                dispatch(asyncAccountDelete(props,data.adminId,props.setIsLogged ))
                }
                else if(accountData.role === 'resident'){
                    dispatch(asyncAccountDelete(props,accountData._id,props.setIsLogged ))
                }
            }
        })
    }

    return (
        <div>
            <h4 style={{ color: 'Black' }}>{t("deletemsg")}</h4>
            <button className='btn btn-danger' onClick={handleDelete}> {t("DeleteAccount")} </button>
        </div>
    )
}

export default DeleteAccount