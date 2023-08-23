import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { asyncGetResidents, asyncSetEditResidentId, asyncDestroyResident } from "../actions/residentsActions"
import { asyncGetVillage } from "../actions/villagesActions"
import EditResident from "./EditResident"
import AddResident from "./AddResident"
import Swal from "sweetalert2"

const Residents = (props) => {
    const dispatch = useDispatch()

    const [display, setDisplay] = useState({})

    const accountData = useSelector((state)=>{
        return state.users.userDetails
    })

    useEffect(() => {
        dispatch(asyncGetResidents())
        dispatch(asyncGetVillage(accountData._id))
    }, [])

    const dataResidents = useSelector((state => {
        return state.residents
    }))

    
    const villageData= useSelector((state => {
        return state.village
    }))

    const handleShow = (ele) => {
        setDisplay(ele)
    }
   
    const handleEdit = (id) => {
        dispatch(asyncSetEditResidentId(id))
    }

    const handleDelete = (id) => {
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
                dispatch(asyncDestroyResident(id))
            }
        })

    }

    return (
        <div >
            <div className="row">
                <div className="col-md-6 ml-auto">
                    {
                        dataResidents.editId ? <EditResident /> : <AddResident />
                    }
                </div>

                <div className="col-md-6 mt-5" >
                { villageData.data === null ?  <></> :
                     dataResidents.data.length  > 0  ?   <> 
                     <h3 style={{color:'DarkBlue'}}>Lists of Residents</h3> 
                   
                        <table className="table table-hover" >
                            <thead>
                                <tr>
                                    <th>S.NO</th>
                                    <th>Resident Name</th>
                                    <th>Description</th>
                                    <th>Modify</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataResidents.data.map((ele, i) => {
                                        return (
                                            <tr key={i}>
                                                <td >{i + 1}</td>
                                                <td>{ele.name}</td>
                                                <td> <button type="button" className="btn btn-primary" onClick={() => { handleShow(ele) }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                    Show
                                                </button>
                                                </td>
                                                <td>
                                                    <button type="button" className="btn btn-info" onClick={() => { handleEdit(ele._id) }}>Edit</button>
                                                    <button type="button" className="btn btn-danger" onClick={() => { handleDelete(ele._id) }}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }</tbody> </table>  </> 
                                
                                : <p style={{color:'red'}}>No Residents Data</p> } 

                </div>
            </div>




            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{display.name}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            PhoneNumber-{display.phoneNumber} <br />
                            DoorNo-{display.doorNo}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Residents