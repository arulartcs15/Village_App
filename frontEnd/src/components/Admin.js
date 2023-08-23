import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import AddAdmin from "./AddAdmin"
import { asyncGetAdmin, asyncDestroyAdmin, asyncAccountDelete, asyncEditAdmin } from "../actions/usersActions"
import { asyncGetVillage } from "../actions/villagesActions"
import Swal from "sweetalert2"

const Admin = (props) => {
    const { t } = props

    const dispatch = useDispatch()


    const [displayAdmin, setDisplayAdmin] = useState('')

    useEffect(() => {
        dispatch(asyncGetAdmin())
    }, [dispatch])

    const adminsData = useSelector((state) => {
        return state.users
    })
     
    console.log(adminsData,'ad')
  
    const suspendedData = adminsData.data?.filter((ele) => {
        if (ele.isDeleted == true ) {
            return { ...ele }
        }
    })

     const notSuspendedData = adminsData.data?.filter((ele) => {
        if (ele.isDeleted == false) {
            return { ...ele }
        }
    })

    const handleShowAdmin = (data) => {
        dispatch(asyncGetVillage(data._id))
        setDisplayAdmin(data)
    }

    const villageData = useSelector((state) => {
        return state.village.data
    })

    const handleEditAdmin = (id) => {
        const newName = prompt('Enter Admin name')
        const newPhoneNumber = prompt('Enter Admin Phone Number')
        const formData = {
            name: newName,
            phoneNumber: newPhoneNumber
        }
        dispatch(asyncEditAdmin(formData, id))
    }

    const handleDestroyAdmin = (id) => {
     Swal.fire('Are you sure ,you want to suspend the admin')
        dispatch(asyncDestroyAdmin(id, { type: 'soft' }))
    }

    const handleRestoreAdmin = (id) => {
      dispatch(asyncDestroyAdmin(id, { type: 'restore' }))

    }

    const handleDeleteAdmin = (id) => {
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
                dispatch(asyncAccountDelete(props, id))
            }
        })


    }

    return (
        <div >
            <div className="row">
                <div className="col-md-4">
                    <AddAdmin t={t} />

                </div>

                <div className="col-md-8">

                    {
                        notSuspendedData.length > 0 ?
                            <div>
                                <h3 style={{ color: "DarkBlue" }}> {t("Lists")}</h3>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="col">{t("SNO")}</th>
                                            <th className="col">{t("AdminName")}</th>
                                            <th className="col">{t("ContactNumber")}</th>
                                            <th className="col">{t("Description")}</th>
                                            <th className="col">{t("Modify")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            notSuspendedData.map((ele, i) => {
                                                return <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{ele.name}</td>
                                                    <td>{ele.phoneNumber}</td>
                                                    <td> <button type="button" className="btn btn-primary" onClick={() => { handleShowAdmin(ele) }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                        {t("Show")}
                                                    </button></td>
                                                    <td><button onClick={() => { handleEditAdmin(ele._id) }} className="btn btn-info">{t("Edit")}</button>
                                                        <button onClick={() => { handleDestroyAdmin(ele._id) }} className="btn btn-danger">{t("Suspend")}</button></td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            : <p style={{ color: 'Red' }}>{t("NoAdmin")} </p>
                    }



                </div>


            </div>

            <div className="row">
                <div className="col-md-4">
                </div>

                <div className="col-md-8">

                    {
                        suspendedData.length > 0 ?
                            <div>

                                <h3 style={{ color: "DarkBlue" }}>{t("Restored")}</h3>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="col">{t("SNO")}</th>
                                            <th className="col">{t("AdminName")}</th>
                                            <th className="col">{t("Modify")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            suspendedData.map((ele, i) => {
                                                return <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{ele.name}</td>
                                                    <td><button onClick={() => { handleRestoreAdmin(ele._id) }} className="btn btn-info">{t("Restore")}</button>
                                                        <button onClick={() => { handleDeleteAdmin(ele._id) }} className="btn btn-danger">{t("Delete")}</button></td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            : <p style={{ color: 'Red' }}>{t("AdminRestore")} </p>
                    }

                </div>

            </div>




            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{displayAdmin.name}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {t("VillageName")}-{villageData?.name} <br />
                            {t("ContactNumber")} -{displayAdmin.phoneNumber}<br />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal">{t("Close")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Admin