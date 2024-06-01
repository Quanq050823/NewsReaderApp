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
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { collection, doc, setDoc, addDoc, getDoc, getDocs, updateDoc, deleteField, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { cilArrowRight, cilColorBorder, cilDelete, cilPlus, cilX } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

//Adding News Sources Functions - Tran Duc Quang
const AddingSourceModal = ({ sourceId }) => {
  const [visibleLg, setVisibleLg] = useState(false)
  const [logo, setLogo] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [datecreated, setDatecreated] = useState('')
  const [status, setStatus] = useState(true)
  const [format, setFormat] = useState('')
  const [topic, setTopic] = useState([])
  const [inputTopic, setInputTopic] = useState('')
  const [url, setURL] = useState('')
  const [message, setMessage] = useState({ text: '', type: '' })
  const [deletetopicmodal, showdeletetopicmodal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const EditData = async (sourceId) => {
    if (name === undefined || description === undefined) {
      console.error('One of the values is undefined')
      return
    }
    await addDoc(collection(db, 'source'), {
      logo: logo,
      name: name,
      description: description,
      dateCreated: new Date(),
      active: status,
      url: url,
      topic: topic,
      format: format,
    })
      .then(() => {
        setMessage({ text: 'Data saved successfully', type: 'success' })
      })
      .catch(() => {
        setMessage({ text: 'Error adding document: ', type: 'error' })
      })
  }
  const handleAddTopic = () => {
    setTopic([...topic, inputTopic])
    setInputTopic('')
  }
  useEffect(() => {
    if (visibleLg) {
      const fetchData = async () => {
        const docRef = doc(db, 'source', sourceId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setLogo(docSnap.data().logo)
          setName(docSnap.data().name)
          setDescription(docSnap.data().description)
          setDatecreated(new Date())
          setURL(docSnap.data().url)
          setStatus(docSnap.data().active)
          setFormat(docSnap.data().format)
          setTopic(docSnap.data().topic || [])
        } else {
          console.log('No such document!')
        }
      }
      fetchData()
      console.log('fetch data')
    }
  }, [visibleLg])
  const closemodel = () => {
    setVisibleLg(false)
    setMessage({ text: '', type: '' })
  }
  const handleClose = () => showdeletetopicmodal(false)
  const handleShow = (index) => {
    setDeleteIndex(index)
    showdeletetopicmodal(true)
  }
  const handleDelete = () => {
    setTopic(topic.filter((_, index) => index !== deleteIndex))
    handleClose()
  }
  return (
    <>
      <CButton className="custombuttonadd" color="success" onClick={() => setVisibleLg(!visibleLg)}>
        <CIcon icon={cilPlus}/>
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
                <CInputGroupText className="custom-input-group-text">Logo URL</CInputGroupText>
                <CFormInput
                  aria-label="Logo URL"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                />
              </CInputGroup>
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
              <CInputGroup className="custom-input-group" style={{ width: 350 }}>
                <CInputGroupText className="custom-input-group-text">Topic</CInputGroupText>
                <CFormInput
                  aria-label="Input Topic"
                  placeholder="Add More..."
                  value={inputTopic}
                  onChange={(e) => setInputTopic(e.target.value)}
                />
                <CButton
                  color="success"
                  className="button-add-topic"
                  style={{ width: 40 }}
                  onClick={handleAddTopic}
                >
                  <CIcon icon={cilArrowRight} className="me-2" />
                </CButton>
              </CInputGroup>
              {topic.map((item, index) => (
                <CButton
                  color="success"
                  shape="rounded-pill"
                  key={index}
                  className="button-topic"
                  onClick={() => handleShow(index)}
                >
                  {item}
                </CButton>
              ))}
              <CModal alignment="center" visible={deletetopicmodal} onClose={handleClose}>
                <CModalHeader className="custom-modal-header-delete">
                  <CModalTitle>Confirm Deletion</CModalTitle>
                </CModalHeader>
                <CModalBody>Are you sure you want to delete this topic?</CModalBody>
                {message.text && (
                  <div className={`alert alert-${message.type === 'error' ? 'danger' : 'success'}`}>
                    {message.text}
                  </div>
                )}
                <CModalFooter>
                  <CButton color="secondary" onClick={handleClose}>
                    Close
                  </CButton>
                  <CButton color="danger" onClick={handleDelete}>
                    Delete
                  </CButton>
                </CModalFooter>
              </CModal>
              <br />
              <br />
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">Format</CInputGroupText>
                <CFormInput
                  aria-label="Format"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                />
              </CInputGroup>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">Date Created</CInputGroupText>
                <CFormInput
                  disabled={true}
                  aria-label="Date Created"
                  value={new Date().toLocaleString('en-US')}
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
                <option value={true} className="custom-input-select-active">
                  Active
                </option>
                <option value={false} className="custom-input-select-inactive">
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

//Editing News Sources Functions - Tran Duc Quang
const EditSourceModal = ({sourceId}) => {
  const [visibleLg, setVisibleLg] = useState(false)
  const [logo, setLogo] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [datecreated, setDatecreated] = useState('')
  const [status, setStatus] = useState(true)
  const [format, setFormat] = useState('')
  const [topic, setTopic] = useState([])
  const [inputTopic, setInputTopic] = useState('')
  const [url, setURL] = useState('')
  const [message, setMessage] = useState({ text: '', type: '' })
  const [deletetopicmodal, showdeletetopicmodal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const EditData = async (sourceId) => {
  if (name === undefined || description === undefined || datecreated === undefined) {
    console.error('One of the values is undefined');
    return;
  }

  const dbRef = doc(db, 'source', sourceId);
  await updateDoc(dbRef, {
    logo: logo,
    name: name,
    description: description,
    active: status,
    url: url,
    topic: topic,
    format: format,
  })
    .then(() => {
      setMessage({ text: 'Data saved successfully', type: 'success' })
    })
    .catch(() => {
      setMessage({ text: 'Error adding document: ', type: 'error' })
    })
  }
  const handleAddTopic = () => {
    setTopic([...topic, inputTopic])
    setInputTopic('')
  }
  useEffect(() => {
    if (visibleLg) {
      const fetchData = async () => {
        const docRef = doc(db, 'source', sourceId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setLogo(docSnap.data().logo)
          setName(docSnap.data().name)
          setDescription(docSnap.data().description)
          setDatecreated(docSnap.data().dateCreated?.toDate().toLocaleString() || '')
          setURL(docSnap.data().url)
          setStatus(docSnap.data().active)
          setFormat(docSnap.data().format)
          setTopic(docSnap.data().topic || [])
        } else {
          console.log('No such document!')
        }
      }
      fetchData()
      console.log('fetch data')
    }
  }, [visibleLg])
  const closemodel = () => {
    setVisibleLg(false)
    setMessage({ text: '', type: '' })
  }
  const handleClose = () => showdeletetopicmodal(false)
  const handleShow = (index) => {
    setDeleteIndex(index)
    showdeletetopicmodal(true)
  }
  const handleDelete = () => {
    setTopic(topic.filter((_, index) => index !== deleteIndex))
    handleClose()
  }
  return (
    <>
      <CButton color="primary" onClick={() => setVisibleLg(!visibleLg)}>
        <CIcon icon={cilColorBorder}/>
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
                <CInputGroupText className="custom-input-group-text">Logo URL</CInputGroupText>
                <CFormInput
                  aria-label="Logo URL"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                />
              </CInputGroup>
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
              <CInputGroup className="custom-input-group" style={{ width: 350 }}>
                <CInputGroupText className="custom-input-group-text">Topic</CInputGroupText>
                <CFormInput
                  aria-label="Input Topic"
                  placeholder="Add More..."
                  value={inputTopic}
                  onChange={(e) => setInputTopic(e.target.value)}
                />
                <CButton
                  color="success"
                  className="button-add-topic"
                  style={{ width: 40 }}
                  onClick={handleAddTopic}
                >
                  <CIcon icon={cilArrowRight} className="me-2" />
                </CButton>
              </CInputGroup>
              {topic.map((item, index) => (
                <CButton
                  color="success"
                  shape="rounded-pill"
                  key={index}
                  className="button-topic"
                  onClick={() => handleShow(index)}
                >
                  {item}
                </CButton>
              ))}
              <CModal alignment="center" visible={deletetopicmodal} onClose={handleClose}>
                <CModalHeader className="custom-modal-header-delete">
                  <CModalTitle>Confirm Deletion</CModalTitle>
                </CModalHeader>
                <CModalBody>Are you sure you want to delete this topic?</CModalBody>
                {message.text && (
                  <div className={`alert alert-${message.type === 'error' ? 'danger' : 'success'}`}>
                    {message.text}
                  </div>
                )}
                <CModalFooter>
                  <CButton color="secondary" onClick={handleClose}>
                    Close
                  </CButton>
                  <CButton color="danger" onClick={handleDelete}>
                    Delete
                  </CButton>
                </CModalFooter>
              </CModal>
              <br />
              <br />
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">Format</CInputGroupText>
                <CFormInput
                  aria-label="Format"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                />
              </CInputGroup>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">Date Created</CInputGroupText>
                <CFormInput
                  disabled={true}
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
                <option value={true} className="custom-input-select-active">
                  Active
                </option>
                <option value={false} className="custom-input-select-inactive">
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

//Delete News Sources Functions - Tran Duc Quang
const DeleteSourceModal = ({ sourceId }) => {
  const [message, setMessage] = useState({ text: '', type: '' })

  const [visible, setVisible] = useState(false)

  const DeleteData = async (sourceId) => {
    const dbRef = doc(db, 'source', sourceId)
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
        <CIcon icon={cilDelete} className='me-1'/>
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

//Show News Sources Functions - Tran Duc Quang
const ShowNewsSources = () => {
  let [newsSources, setNewsSources] = useState([])
  let [search, setSearch] = useState('')

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'source'))
    const tempArray = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        sourceId: doc.id,
      }
    })
    setNewsSources(tempArray)
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log('fetch data')

  const filteredSources = newsSources.filter(
    (source) =>
      (source.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (source.description || '').toLowerCase().includes(search.toLowerCase()) ||
      (new Date(source.dateCreated.toDate() || '').toLocaleString() || '')
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (source.active ? 'activating' : 'inactive').toLowerCase().includes(search.toLowerCase()) ||
      (source.url || '').toLowerCase().includes(search.toLowerCase()),
  )

  let [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredSources.length / itemsPerPage)
  const currentItems = filteredSources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const maxPageNumbersToShow = 10
  let startPage = Math.max(currentPage - Math.floor(maxPageNumbersToShow / 2), 1)
  let endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages)

  // Adjust if we're at the end of the page numbers
  if (endPage === totalPages) {
    startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1)
  }

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
              <CTableHeaderCell className="bg-body-tertiary" scope="col"></CTableHeaderCell>
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
              {currentItems.map((source, index) => (
                <>
                  <div key={index}></div>
                  <CTableRow>
                    <CTableDataCell>
                      <img src={source.logo} alt="logo" className="logo-image" />
                    </CTableDataCell>
                    <CTableDataCell>{source.name}</CTableDataCell>
                    <CTableDataCell> {source.description}</CTableDataCell>
                    <CTableDataCell>
                      {source.dateCreated?.toDate().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </CTableDataCell>
                    <CTableDataCell>
                      {source.active === true ? (
                        <CButton color={'success'} variant="ghost" key={index} disabled={true}>
                          {'Activating'.charAt(0).toUpperCase() + 'Activating'.slice(1)}
                        </CButton>
                      ) : (
                        <CButton color={'danger'} variant="ghost" key={index} disabled={true}>
                          {'Inactivating'.charAt(0).toUpperCase() + 'Inactivating'.slice(1)}
                        </CButton>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>{source.url}</CTableDataCell>
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
        <CPagination aria-label="Page navigation example">
          <CPaginationItem
            aria-label="Previous"
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))} // Decrease currentPage by 1, but not less than 1
          >
            <span aria-hidden="true">&laquo;</span>
          </CPaginationItem>
          {[...Array(endPage - startPage + 1)].map((_, index) => {
            const pageNumber = startPage + index
            return (
              <CPaginationItem
                key={index}
                active={pageNumber === currentPage} // Highlight this item if its page number is the current page
                onClick={() => setCurrentPage(pageNumber)} // Set currentPage to the clicked page number
              >
                {pageNumber}
              </CPaginationItem>
            )
          })}
          <CPaginationItem
            aria-label="Next"
            onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))} // Increase currentPage by 1, but not more than totalPages
          >
            <span aria-hidden="true">&raquo;</span>
          </CPaginationItem>
        </CPagination>
        <AddingSourceModal />
      </CCardBody>
    </>
  )
}
export default ShowNewsSources

export { ShowNewsSources }
