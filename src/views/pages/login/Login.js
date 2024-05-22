import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { ADMIN_USERNAME, ADMIN_PASSWORD } from './adminaccount'
import '../../../scss/_login.scss'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const handleLogin = (event) => {
    event.preventDefault()
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      navigate('/dashboard')
    } else {
      setErrorMessage('Invalid username or password')
    }
  }

  return (
    <div class="login">
      <h1>Login</h1>
      <form method="post" onSubmit={handleLogin}>
        <input
          type="text"
          class="inputlog"
          name="u"
          placeholder="Username"
          required="required"
          autoComplete="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          class="inputlog"
          name="p"
          placeholder="Password"
          required="required"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {errorMessage && <CAlert color="danger">{errorMessage}</CAlert>}
        <button type="submit" class="btnlog btnlog-primary btnlog-block btnlog-large">
          Let me in.
        </button>
      </form>
    </div>
  )
}

export default Login
