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
import { ShowUser } from '../Controller/UserAPI'
import { ShowUserTable } from '../Controller/UserAPI'

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
const tableExample = [
  {
    avatar: { src: user_avatar, status: 'success' },
    user: {
      name: 'Tra My',
      new: true,
      registered: 'Jan 1, 2024',
    },
    Email: { name: 'USA', flag: cifUs },
    usage: {
      value: 50,
      period: 'Jun 11, 2024 - Jul 10, 2024',
      color: 'success',
    },
    payment: { name: 'Mastercard', icon: cibCcMastercard },
    activity: '10 sec ago',
  },
  {
    avatar: { src: user_avatar, status: 'danger' },
    user: {
      name: 'Hoang Son',
      new: false,
      registered: 'Jan 1, 2024',
    },
    Email: { name: 'Brazil', flag: cifBr },
    usage: {
      value: 22,
      period: 'Jun 11, 2024 - Jul 10, 2024',
      color: 'info',
    },
    payment: { name: 'Visa', icon: cibCcVisa },
    activity: '5 minutes ago',
  },
  {
    avatar: { src: user_avatar, status: 'warning' },
    user: { name: 'Ly Hai', new: true, registered: 'Jan 1, 2024' },
    Email: { name: 'India', flag: cifIn },
    usage: {
      value: 74,
      period: 'Jun 11, 2024 - Jul 10, 2024',
      color: 'warning',
    },
    payment: { name: 'Stripe', icon: cibCcStripe },
    activity: '1 hour ago',
  },
  {
    avatar: { src: user_avatar, status: 'secondary' },
    user: { name: 'Ngoc Ha', new: true, registered: 'Jan 1, 2024' },
    Email: { name: 'France', flag: cifFr },
    usage: {
      value: 98,
      period: 'Jun 11, 2024 - Jul 10, 2024',
      color: 'danger',
    },
    payment: { name: 'PayPal', icon: cibCcPaypal },
    activity: 'Last month',
  },
  {
    avatar: { src: user_avatar, status: 'success' },
    user: {
      name: 'Bich Tram',
      new: true,
      registered: 'Jan 1, 2024',
    },
    Email: { name: 'Spain', flag: cifEs },
    usage: {
      value: 22,
      period: 'Jun 11, 2024 - Jul 10, 2024',
      color: 'primary',
    },
    payment: { name: 'Google Wallet', icon: cibCcApplePay },
    activity: 'Last week',
  },
  {
    avatar: { src: user_avatar, status: 'danger' },
    user: {
      name: 'Thanh Nha',
      new: true,
      registered: 'Jan 1, 2024',
    },
    Email: { name: 'Poland', flag: cifPl },
    usage: {
      value: 43,
      period: 'Jun 11, 2024 - Jul 10, 2024',
      color: 'success',
    },
    payment: { name: 'Amex', icon: cibCcAmex },
    activity: 'Last week',
  },
]

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
