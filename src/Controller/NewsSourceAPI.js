import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CTable,
  CTableBody,
  CTableHead,
  CTableDataCell,
  CButton,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import { collection, doc, setDoc, addDoc, getDoc, getDocs, updateDoc, deleteField, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'


export const AddingSourceModal = () => {
  const [visibleLg, setVisibleLg] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [datecreated, setDatecreated] = useState('')
  const [status, setStatus] = useState(1)
  const [url, setURL] = useState('')
  const [message, setMessage] = useState({ text: '', type: '' })

  const closemodel = () => {
    setVisibleLg(false)
    setMessage({ text: '', type: '' })
  }

  const saveData = async () => {
    await addDoc(collection(db, 'NewsSource'), {
      Name: name,
      Description: description,
      DateCreated: datecreated,
      ActiveStatus: status,
      URL: url,
        })
      .then(() => {
        setMessage({ text: 'Data saved successfully', type: 'success' })
      })
      .catch(() => {
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

const EditSourceModal = ({sourceId}) => {
  const [visibleLg, setVisibleLg] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [datecreated, setDatecreated] = useState('')
  const [status, setStatus] = useState('1')
  const [url, setURL] = useState('')
  const [message, setMessage] = useState({ text: '', type: '' })
  const EditData = async (sourceId) => {
  if (name === undefined || description === undefined || datecreated === undefined) {
    console.error('One of the values is undefined');
    return;
  }

  const dbRef = doc(db, 'NewsSource', sourceId);
  await updateDoc(dbRef, {
    Name: name,
    Description: description,
    DateCreated: datecreated,
      ActiveStatus: status,
      URL: url,
        })
      .then(() => {
        setMessage({ text: 'Data saved successfully', type: 'success' })
      })
      .catch(() => {
        setMessage({ text: 'Error adding document: ', type: 'error' })
      })
  }
  useEffect(() => {
    if (visibleLg) {
      const fetchData = async () => {
        const docRef = doc(db, 'NewsSource', sourceId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setName(docSnap.data().Name)
          setDescription(docSnap.data().Description)
          setDatecreated(docSnap.data().DateCreated)
          setURL(docSnap.data().URL)
          setStatus(docSnap.data().Status)
        } else {
          console.log('No such document!')
        }
      }

      fetchData()
    }
  }, [visibleLg])
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
          <CButton color="primary" onClick={() => EditData(sourceId)}>
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

const DeleteSourceModal = ({ sourceId }) => {
  const [message, setMessage] = useState({ text: '', type: '' })

  const [visible, setVisible] = useState(false)

  const DeleteData = async (sourceId) => {
    const dbRef = doc(db, 'NewsSource', sourceId)
    await deleteDoc(dbRef)
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
    let [search, setSearch] = useState('')
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'NewsSource'))
      const tempArray = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          sourceId: doc.id,
        }
      })
      setNewsSources(tempArray)
    }
    fetchData()
          const filteredSources = newsSources.filter(
            (source) =>
              source.Name.toLowerCase().includes(search.toLowerCase()) ||
              source.Description.toLowerCase().includes(search.toLowerCase()) ||
              source.DateCreated.toLowerCase().includes(search.toLowerCase()) ||
              source.ActiveStatus.toLowerCase().includes(search.toLowerCase()) ||
              source.URL.toLowerCase().includes(search.toLowerCase()),
          )
    return (
      <>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          className="searchInput"
        />
        <CCardBody>
          <CTable striped align="middle" className="mb-0 border" hover responsive>
            <CTableHead>
              <CTableRow>
                {/* <CTableHeaderCell scope="col">#</CTableHeaderCell> */}
                <CTableHeaderCell className="bg-body-tertiary" scope="col">
                  Name
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary" scope="col">
                  Description
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary" scope="col">
                  Date Created
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary" scope="col">
                  Activate Status
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary" scope="col">
                  URL
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary" scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <>
                {filteredSources.map((source, index) => (
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
                          <EditSourceModal sourceId={source.sourceId} />
                        </div>
                        <div className="delete-modal">
                          <DeleteSourceModal sourceId={source.sourceId} />
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  </>
                ))}
              </>
            </CTableBody>
          </CTable>
          <br />
          <AddingSourceModal />
        </CCardBody>
      </>
    )
}
export default ShowNewsSources

export { ShowNewsSources }
