import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CRow,
  CButton,
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
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cilPeople,
} from '@coreui/icons'
import user_avatar from 'src/assets/images/avatars/user_avatar.jpg'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { ShowUser, ShowUserTable } from '../Controller/UserAPI'


const AddingModal = () => {
  const [visibleLg, setVisibleLg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('')
  const [datecreated, setDatecreated] = useState('')
  const [message, setMessage] = useState({ text: '', type: '' })

  const closemodel = () => {
    setVisibleLg(false)
    setMessage({ text: '', type: '' })
  }

  const saveData = async () => {
    await addDoc(collection(db, 'User'), {
      Username: name,
      Email: email,
      Password: password,
      Type: type,
      DateCreated: datecreated,
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
          <CModalTitle>Adding User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <span className="custom-text-color">
            <h6 className=".custom-textcolor-red">Item information :</h6>
          </span>
          <CCol xs={12}>
            <CCardBody>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">User Name</CInputGroupText>
                <CFormInput
                  aria-label="User Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </CInputGroup>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">Email</CInputGroupText>
                <CFormInput
                  aria-label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </CInputGroup>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">Password</CInputGroupText>
                <CFormInput
                  aria-label="Date Created"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </CInputGroup>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">Type</CInputGroupText>
                <CFormInput
                  aria-label="Date Created"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
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

const UserAccount = () => (
  <>
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Recently</strong>
          </CCardHeader>
          <ShowUserTable />
        </CCard>
      </CCol>
    </CRow>
    <br />
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>User Account Management</strong>
        </CCardHeader>
        <ShowUser />
      </CCard>
      {/* <AddingModal /> */}
    </CCol>
    <br />
    <br />
    <br />
  </>
)

export default UserAccount
