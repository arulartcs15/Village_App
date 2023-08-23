import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { asyncGetEvents, asyncSetEditEventId, asyncDestroyEvent } from "../actions/eventsActions"
import { asyncGetVillage } from "../actions/villagesActions"
import AddEvent from '../components/AddEvent'
import EditEvent from "./EditEvent"

const Events = (props) => {
    const dispatch = useDispatch()

    const {t} =props

    const [showEvent, setShowEvent] = useState('')

    const accountData = useSelector((state => {
        return state.users.userDetails
    }))

 useEffect(() => {
        if (accountData.role === 'admin') {
            dispatch(asyncGetVillage(accountData._id))
            dispatch(asyncGetEvents(accountData._id))
        }
        else if (accountData.role === 'resident') {
            dispatch(asyncGetVillage(accountData.adminId))
            dispatch(asyncGetEvents(accountData.adminId))
        }
    }, [accountData])


    const eventsData = useSelector((state => {
        return state.events
    }))

    const data1 = useSelector((state => {
        return state
    }))


    const handleEditEvent = (id) => {
        dispatch(asyncSetEditEventId(id))
    }

    const handleDestroyEvent = (id) => {
        dispatch(asyncDestroyEvent(id))
    }

    const handleShowEvent = (ele) => {
        setShowEvent(ele)
    }
   return (
        <div>
            {
                accountData.role === 'admin' ?
                    <div className="row">
                        <div className="col-md-5 ml-auto">

                            {eventsData?.editId ? <EditEvent /> : <AddEvent />}

                        </div>

                        <div className="col-md-7 mt-5" >
                            {data1?.village.data === null ? <></> :
                                eventsData.data?.length > 0 ?
                                    <div>
                                        <h3 style={{ color: "darkblue" }}>{t("ListsEvents")}</h3>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="col">{t("SNO")}</th>
                                                    <th className="col">{t("EventTitle")}</th>
                                                    <th className="col" >{t("StartDate")}</th>
                                                    <th className="col">{t("EndDate")}</th>
                                                    <th className="col">{t("Description")}</th>
                                                    <th className="col">{t("Modify")}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    eventsData.data.map((ele, i) => {
                                                        return <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{ele.title}</td>
                                                            <td>{(ele.startDate).slice(0, 10)}</td>
                                                            <td>{(ele.endDate).slice(0, 10)}</td>
                                                            <td> <button type="button" className="btn btn-primary" onClick={() => { handleShowEvent(ele) }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                                {t("Show")}
                                                            </button></td>
                                                            <td><button onClick={() => { handleEditEvent(ele._id) }} className="btn btn-info">{t("Edit")}</button>
                                                                <button onClick={() => { handleDestroyEvent(ele._id) }} className="btn btn-danger">{t("Delete")}</button>
                                                              
                                                          </td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>



                                    : <p style={{ color: 'Red' }}>{t("NoEvents")} </p>


                            }  </div> </div>
                    :

                    data1.village.data === null ? <></> :
                        (eventsData.data?.length > 0) ?
                            <div>
                                <h3 style={{ color: "darkblue" }}>{t("ListsEvents")}</h3>
                                <center>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="col">{t("SNO")}</th>
                                                <th className="col">{t("EventTitle")}</th>
                                                <th className="col" >{t("StartDate")}</th>
                                                <th className="col">{t("EndDate")}</th>
                                                <th className="col">{t("Description")}</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                eventsData.data.map((ele, i) => {
                                                    return <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{ele.title}</td>
                                                        <td>{(ele.startDate).slice(0, 10)}</td>
                                                        <td>{(ele.endDate).slice(0, 10)}</td>
                                                        <td> <button type="button" className="btn btn-primary" onClick={() => { handleShowEvent(ele) }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                            {t("Show")}
                                                        </button></td>

                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </center>
                            </div>
                            : <p style={{ color: 'Red' }}>{t("NoEvents")} </p>
            }

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{showEvent.title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        {t("Description")}-{showEvent.description} <br />
                        {t("StartDate")}-{(showEvent.startDate)?.slice(0, 10)}<br />
                        {t("EndDate")}-{(showEvent.endDate)?.slice(0, 10)}
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
export default Events