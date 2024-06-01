import React, { useEffect, useState } from 'react'
import {
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
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase'

//Adding Topic Functions - Tran Duc Quang
export const AddingTopicModal = () => {
  const [visibleLg, setVisibleLg] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState({ text: '', type: '' })

  const closemodel = () => {
    setVisibleLg(false)
    setMessage({ text: '', type: '' })
  }

  const saveData = async () => {
    await addDoc(collection(db, 'topic'), {
      name: name,
      description: description,
      dateCreated: new Date(),
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
          <CModalTitle>Adding News Topic</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <span className="custom-text-color">
            <h6 className=".custom-textcolor-red">Item information :</h6>
          </span>
          <CCol xs={12}>
            <CCardBody>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">
                  News Topic Name
                </CInputGroupText>
                <CFormInput
                  aria-label="News Topic Name"
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

//Edit Topic Functions - Tran Duc Quang
const EditTopicModal = ({ topicId }) => {
  const [visibleLg, setVisibleLg] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [datecreated, setDatecreated] = useState('')
  const [message, setMessage] = useState({ text: '', type: '' })
  const EditData = async (topicId) => {
    if (name === undefined || description === undefined || datecreated === undefined) {
      console.error('One of the values is undefined')
      return
    }

    const dbRef = doc(db, 'topic', topicId)
    await updateDoc(dbRef, {
      name: name,
      description: description,
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
        const docRef = doc(db, 'topic', topicId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setName(docSnap.data().name)
          setDescription(docSnap.data().description)
          setDatecreated(docSnap.data().dateCreated?.toDate().toLocaleString() || '')
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
  return (
    <>
      <CButton color="primary" onClick={() => setVisibleLg(!visibleLg)}>
        Edit
      </CButton>
      <CModal alignment="center" size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader className="custom-modal-header-edit">
          <CModalTitle>Edit News Topic</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <span className="custom-text-color">
            <h6 className=".custom-textcolor-red">Item information :</h6>
          </span>
          <CCol xs={12}>
            <CCardBody>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">
                  News Topic Name
                </CInputGroupText>
                <CFormInput
                  aria-label="News Topic Name"
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
                  disabled={true}
                  aria-label="Date Created"
                  value={datecreated}
                  onChange={(e) => setDatecreated(e.target.value)}
                />
              </CInputGroup>
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
          <CButton color="primary" onClick={() => EditData(topicId)}>
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

//Delete Topic Functions - Tran Duc Quang
const DeleteTopicModal = ({ topicId }) => {
  const [message, setMessage] = useState({ text: '', type: '' })

  const [visible, setVisible] = useState(false)

  const DeleteData = async (topicId) => {
    const dbRef = doc(db, 'topic', topicId)
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
          <CButton color="danger" onClick={() => DeleteData(topicId)}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

//Show Topic Functions - Tran Duc Quang
const ShowNewsTopic = () => {
  let [newsTopic, setNewsTopic] = useState([])
  let [search, setSearch] = useState('')
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'topic'))
    const tempArray = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        topicId: doc.id,
      }
    })
    setNewsTopic(tempArray)
  };
  useEffect(() => {
    fetchData()
          console.log('fetch data')
  }, []) 

  const filteredTopics = newsTopic.filter(
    (topic) =>
      (topic.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (topic.description || '').toLowerCase().includes(search.toLowerCase()) ||
      new Date(topic.dateCreated || '').toLocaleString() ||
      '',
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
              <CTableHeaderCell className="bg-body-tertiary" scope="col">
                Name
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary" scope="col">
                Description
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary" scope="col">
                Date Created
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary" scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <>
              {filteredTopics.map((topic, index) => (
                <>
                  <div key={index}></div>
                  <CTableRow>
                    <CTableDataCell>{topic.name}</CTableDataCell>
                    <CTableDataCell> {topic.description}</CTableDataCell>
                    <CTableDataCell>
                      {(topic.dateCreated?.toDate()).toLocaleString() || ''}
                    </CTableDataCell>
                    <CTableDataCell className="button-container">
                      <div className="edit-modal">
                        <EditTopicModal topicId={topic.topicId} />
                      </div>
                      <div className="delete-modal">
                        <DeleteTopicModal topicId={topic.topicId} />
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                </>
              ))}
            </>
          </CTableBody>
        </CTable>
      </CCardBody>
    </>
  )
}
export default ShowNewsTopic

export { ShowNewsTopic }
