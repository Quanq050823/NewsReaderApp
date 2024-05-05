import React, { useState } from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
  CCol,
  CCardBody,
  CInputGroup,
  CInputGroupText,
  CFormInput,
} from '@coreui/react'
import { cilLockLocked, cilAccountLogout, cilAddressBook } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { ADMIN_PASSWORD, setPassword } from './../../views/pages/login/adminaccount'

import user_avatar from './../../assets/images/avatars/user_avatar.jpg'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const [visibleLg, setVisible] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState({ text: '', type: '' })
  const handleSignOut = () => {
    navigate('/login')
  }

  const closemodel = () => {
    setVisible(false)
    setMessage({ text: '', type: '' })
  }

  const handleChangePassword = () => {
    if (currentPassword !== ADMIN_PASSWORD) {
      setMessage({ text: 'Current password is incorrect', type: 'error' })
      return
    }

    if (newPassword !== confirmPassword) {
      setMessage({ text: 'New password and confirm password do not match', type: 'error' })
      return
    }

    if (newPassword === ADMIN_PASSWORD) {
      setMessage({
        text: 'New password must be different from the current password',
        type: 'error',
      })
      return
    }

    setPassword(newPassword)

    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setMessage({ text: 'Password changed successfully', type: 'success' })
  }

  return (
    <>
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
          <CAvatar src={user_avatar} size="md" />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">
            ADMIN SITE
          </CDropdownHeader>
          <CDropdownItem color="primary" onClick={() => setVisible(!visibleLg)}>
            <CIcon icon={cilLockLocked} className="me-2" />
            Change Password
          </CDropdownItem>
          <CModal alignment="center" visible={visibleLg} onClose={() => setVisible(false)}>
            <CModalHeader className="custom-modal-header-changepass">
              <CModalTitle>Admin Change Password</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <span className="custom-text-color">
                <h6 className=".custom-textcolor-red">
                  Changed information <CIcon icon={cilAddressBook} className="me-2" />
                </h6>
              </span>
              <CCol xs={12}>
                <CCardBody>
                  <CInputGroup className="custom-input-group">
                    <CInputGroupText className="custom-input-group-text">
                      Current Password
                    </CInputGroupText>
                    <CFormInput
                      aria-label="Current Password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="custom-input-group">
                    <CInputGroupText className="custom-input-group-text">
                      New Password
                    </CInputGroupText>
                    <CFormInput
                      aria-label="New Password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="custom-input-group">
                    <CInputGroupText className="custom-input-group-text">
                      New Password
                    </CInputGroupText>
                    <CFormInput
                      aria-label="Confirm New Password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </CInputGroup>
                  {message.text && (
                    <div
                      className={`alert alert-${message.type === 'error' ? 'danger' : 'success'}`}
                    >
                      {message.text}
                    </div>
                  )}
                </CCardBody>
              </CCol>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => closemodel()}>
                Close
              </CButton>
              <CButton color="primary" onClick={() => handleChangePassword()}>
                Save changes
              </CButton>
            </CModalFooter>
          </CModal>
          <CDropdownItem onClick={handleSignOut}>
            <CIcon icon={cilAccountLogout} className="me-2" />
            Sign Out
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </>
  )
}

export default AppHeaderDropdown
