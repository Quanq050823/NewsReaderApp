import React, { useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPopover,
  CTooltip,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import { color } from 'chart.js/helpers'
// ...

import { CAvatar, CProgress } from '@coreui/react'
import CIcon from '@coreui/icons-react'
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
import { ShowUser } from '../API/UserAPI'

const AddingModal = () => {
  const [visibleLg, setVisibleLg] = useState(false)
  return (
    <>
      <CButton className="custombuttonadd" color="success" onClick={() => setVisibleLg(!visibleLg)}>
        Add
      </CButton>
      <CModal alignment="center" size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader className="custom-modal-header">
          <CModalTitle>Adding User Account</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <span className="custom-text-color">
            <h6 className=".custom-textcolor-red">Item information :</h6>
          </span>
          <CCol xs={12}>
            <CCardBody>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">
                  User Account Name
                </CInputGroupText>
                <CFormInput aria-label="User Account Name" />
              </CInputGroup>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">Description</CInputGroupText>
                <CFormInput aria-label="Description" />
              </CInputGroup>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">Date Created</CInputGroupText>
                <CFormInput aria-label="Date Created" />
              </CInputGroup>
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
const EditModal = () => {
  const [visibleLg, setVisibleLg] = useState(false)
  return (
    <>
      <CButton color="primary" onClick={() => setVisibleLg(!visibleLg)}>
        Edit
      </CButton>
      <CModal alignment="center" size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader className="custom-modal-header-edit">
          <CModalTitle>Edit User Account</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <span className="custom-text-color">
            <h6 className=".custom-textcolor-red">User information :</h6>
          </span>
          <CCol xs={12}>
            <CCardBody>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">
                  User Account Name
                </CInputGroupText>
                <CFormInput aria-label="User Account Name" />
              </CInputGroup>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">Description</CInputGroupText>
                <CFormInput aria-label="Description" />
              </CInputGroup>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">Date Created</CInputGroupText>
                <CFormInput required aria-label="Date Created" />
              </CInputGroup>
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

const DeleteModal = () => {
  const [visible, setVisible] = useState(false)
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
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="danger">Delete</CButton>
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
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead className="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    <CIcon icon={cilPeople} />
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    Status
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Email</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {tableExample.map((item, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell className="text-center">
                      <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.user.name}</div>
                      <div className="small text-body-secondary text-nowrap">
                        <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                        {item.user.registered}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton
                        color={'success'}
                        shape="rounded-pill"
                        key={index}
                        title="This account is activating"
                      >
                        {'active'.charAt(0).toUpperCase() + 'active'.slice(1)}
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell>twitter@insta.com</CTableDataCell>
                    <CTableDataCell>
                      <div className="small text-body-secondary text-nowrap">Last login</div>
                      <div className="fw-semibold text-nowrap">{item.activity}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CTableDataCell className="button-container">
                        <div className="edit-modal">{EditModal()}</div>
                        <div className="delete-modal">{DeleteModal()}</div>
                      </CTableDataCell>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <br />
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>User Account Management</strong>
        </CCardHeader>
        <CCardBody>
          <CTable striped hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Password</CTableHeaderCell>
                <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date Created</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell scope="row">1</CTableHeaderCell>
                <CTableDataCell>sinezaibes</CTableDataCell>
                <CTableDataCell>sineizabes@gmail.com</CTableDataCell>
                <CTableDataCell>••••••••</CTableDataCell>
                <CTableDataCell>@twitter</CTableDataCell>
                <CTableDataCell>25/05/2024</CTableDataCell>
                <CTableDataCell className="button-container">
                  <div className="edit-modal">{EditModal()}</div>
                  <div className="delete-modal">{DeleteModal()}</div>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">1</CTableHeaderCell>
                <CTableDataCell>sinezaibes</CTableDataCell>
                <CTableDataCell>sineizabes@gmail.com</CTableDataCell>
                <CTableDataCell>••••••••</CTableDataCell>
                <CTableDataCell>@twitter</CTableDataCell>
                <CTableDataCell>25/05/2024</CTableDataCell>
                <CTableDataCell className="button-container">
                  <div className="edit-modal">{EditModal()}</div>
                  <div className="delete-modal">{DeleteModal()}</div>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">1</CTableHeaderCell>
                <CTableDataCell>sinezaibes</CTableDataCell>
                <CTableDataCell>sineizabes@gmail.com</CTableDataCell>
                <CTableDataCell>••••••••</CTableDataCell>
                <CTableDataCell>@twitter</CTableDataCell>
                <CTableDataCell>25/05/2024</CTableDataCell>
                <CTableDataCell className="button-container">
                  <div className="edit-modal">{EditModal()}</div>
                  <div className="delete-modal">{DeleteModal()}</div>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">1</CTableHeaderCell>
                <CTableDataCell>sinezaibes</CTableDataCell>
                <CTableDataCell>sineizabes@gmail.com</CTableDataCell>
                <CTableDataCell>••••••••</CTableDataCell>
                <CTableDataCell>@twitter</CTableDataCell>
                <CTableDataCell>25/05/2024</CTableDataCell>
                <CTableDataCell className="button-container">
                  <div className="edit-modal">{EditModal()}</div>
                  <div className="delete-modal">{DeleteModal()}</div>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
    {AddingModal()}
  </>
)

export default UserAccount
