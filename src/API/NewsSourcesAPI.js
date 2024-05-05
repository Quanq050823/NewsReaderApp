/* eslint-disable prettier/prettier */
import React, {useState} from 'react'
import { getDatabase, ref, get, push, set, remove } from 'firebase/database'
import { database } from '../firebase'
import {
  CTableDataCell,
  CTableRow,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CCol,
  CCardBody,
  CButtonGroup
} from '@coreui/react'

const AddingSourceModal = () => {
  const [visibleLg, setVisibleLg] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [datecreated, setDatecreated] = useState('')
    const [status, setStatus] = useState('')
    const [url, setURL] = useState('')
    const [message, setMessage] = useState({ text: '', type: '' })

    
    const closemodel = () => {
      setVisibleLg(false)
      setMessage({ text: '', type: '' })
    }

    const saveData = async () => {
        const db = database
        const newDocRef = push(ref(db, 'NewsSource/'))
        set(newDocRef, {
          Name: name,
          Description: description,
          DateCreated: datecreated,
          ActiveStatus: status,
          URL: url
        }).then(() => {
          setMessage({ text: 'Data saved successfully', type: 'success' })
        }
        ).catch(() => {
          setMessage({ text: 'Error adding document: ', type: 'error' })
        })
    }
      

  return (
    <>
      <CButton className="custombuttonadd" color="success" onClick={() => setVisibleLg(!visibleLg)}>
        Add
      </CButton>
      <CModal alignment="center" size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader className="custom-modal-header">
          <CModalTitle>Adding News Source</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <span className="custom-text-color">
            <h6 className=".custom-textcolor-red">Item information :</h6>
          </span>
          <CCol xs={12}>
            <CCardBody>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">
                  News Source Name
                </CInputGroupText>
                <CFormInput
                  aria-label="News Source Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </CInputGroup>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">Description</CInputGroupText>
                <CFormInput
                  aria-label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </CInputGroup>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">Date Created</CInputGroupText>
                <CFormInput
                  aria-label="Date Created"
                  value={datecreated}
                  onChange={(e) => setDatecreated(e.target.value)}
                />
              </CInputGroup>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">URL</CInputGroupText>
                <CFormInput aria-label="URL" value={url} onChange={(e) => setURL(e.target.value)} />
              </CInputGroup>
              <CFormSelect
                className="-input-select"
                aria-label="Default select example"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="1" className="custom-input-select-active">
                  Active
                </option>
                <option value="2" className="custom-input-select-inactive">
                  Inactive
                </option>
              </CFormSelect>
            </CCardBody>
          </CCol>
        </CModalBody>
        {message.text && (
          <div className={`alert alert-${message.type === 'error' ? 'danger' : 'success'}`}>
            {message.text}
          </div>
        )}
        <CModalFooter>
          <CButton color="secondary" onClick={() => closemodel()}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => saveData()}>
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
const EditSourceModal = () => {
  const [visibleLg, setVisibleLg] = useState(false)
      const closemodel = () => {
        setVisibleLg(false)
        setMessage({ text: '', type: '' })
      }
  return (
    <>
      <CButton color="primary" onClick={() => setVisibleLg(!visibleLg)}>
        Edit
      </CButton>
      <CModal alignment="center" size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader className="custom-modal-header-edit">
          <CModalTitle>Edit News Source</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <span className="custom-text-color">
            <h6 className=".custom-textcolor-red">Item information :</h6>
          </span>
          <CCol xs={12}>
            <CCardBody>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">
                  News Source Name
                </CInputGroupText>
                <CFormInput aria-label="News Source Name" />
              </CInputGroup>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">Description</CInputGroupText>
                <CFormInput aria-label="Description" />
              </CInputGroup>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">Date Created</CInputGroupText>
                <CFormInput aria-label="Date Created" />
              </CInputGroup>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">URL</CInputGroupText>
                <CFormInput aria-label="URL" />
              </CInputGroup>
              <CFormSelect className="-input-select" aria-label="Default select example">
                <option value="1" className="custom-input-select-active">
                  Active
                </option>
                <option value="2" className="custom-input-select-inactive">
                  Inactive
                </option>
              </CFormSelect>
            </CCardBody>
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleLg(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

// eslint-disable-next-line react/prop-types
const DeleteSourceModal = ({ sourceId }) => {
  const [message, setMessage] = useState({ text: '', type: '' })

  const [visible, setVisible] = useState(false)

  const DeleteData = async (sourceId) => {
    const db = database
    const dbRef = ref(db, 'NewsSource/' + sourceId)
    remove(dbRef)
      .then(() => {
        setMessage({ text: 'Data removed successfully', type: 'success' })
      })
      .catch(() => {
        setMessage({ text: 'Error removing document: ', type: 'error' })
      })
  }

  const closemodel = () => {
    setVisible(false)
    setMessage({ text: '', type: '' })
  }
  return (
    <>
      <CButton color="danger" onClick={() => setVisible(!visible)}>
        Delete
      </CButton>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader className="custom-modal-header-delete">
          <CModalTitle>Delete Item</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure to delete this item?</CModalBody>
        {message.text && (
          <div className={`alert alert-${message.type === 'error' ? 'danger' : 'success'}`}>
            {message.text}
          </div>
        )}
        <CModalFooter>
          <CButton color="secondary" onClick={() => closemodel()}>
            Close
          </CButton>
          <CButton color="danger" onClick={() => DeleteData(sourceId)}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}


const ShowNewsSources = () => {
  let [newsSources, setNewsSources] = useState([])
  const fetchData = async () => {
    const dbRef = ref(database, 'NewsSource')
    const snapshot = await get(dbRef)
    if (snapshot.exists()) {
      const myData = snapshot.val()
      const tempArray = Object.keys(myData).map((mySourceid) => {
        return {
          ...myData[mySourceid],
          sourceId: mySourceid,
        }
      })

      setNewsSources(tempArray)
    } else {
      setMessage({ text: 'No data available', type: 'error' })
    }
  }
  fetchData()

  return (
    <>
      {newsSources.map((source, index) => (
        <>
          <div key={index}></div>
          <CTableRow>
            {/* <CTableHeaderCell scope="row"> {source.sourceId}</CTableHeaderCell> */}
            <CTableDataCell>{source.Name}</CTableDataCell>
            <CTableDataCell> {source.Description}</CTableDataCell>
            <CTableDataCell>{source.DateCreated}</CTableDataCell>
            <CTableDataCell>
              {source.ActiveStatus === '1' ? (
                <CButton
                  color={'success'}
                  variant="ghost"
                  key={index}
                  disabled={'disabled'}
                >
                  {'Activating'.charAt(0).toUpperCase() + 'Activating'.slice(1)}
                </CButton>
              ) : (
                <CButton
                  color={'danger'}
                  variant="ghost"
                  key={index}
                  disabled={'disabled'}
                >
                  {'Inactivating'.charAt(0).toUpperCase() + 'Inactivating'.slice(1)}
                </CButton>
              )}
            </CTableDataCell>
            <CTableDataCell>{source.URL}</CTableDataCell>
            <CTableDataCell className="button-container">
              <div className="edit-modal">
                <EditSourceModal />
              </div>
              <div className="delete-modal">
                <DeleteSourceModal sourceId={source.sourceId} />
              </div>
            </CTableDataCell>
          </CTableRow>
        </>
      ))}
      <br />
      <AddingSourceModal />
    </>
  )
}

export default ShowNewsSources

export { ShowNewsSources }
