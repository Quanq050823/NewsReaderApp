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
  CFormSelect,
} from '@coreui/react'
import {
  cilPeople,
} from '@coreui/icons'
import { CAvatar } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase'
import user_avatar from 'src/assets/images/avatars/user_avatar.jpg'



const EditUserModal = ({ userId }) => {
  const [visibleLg, setVisibleLg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('')
  const [datecreated, setDatecreated] = useState('')
  const [message, setMessage] = useState({ text: '', type: '' })
  const [status, setStatus] = useState('')
  const EditData = async (userId) => {
    if (name === undefined || email === undefined || datecreated === undefined) {
      console.error('One of the values is undefined')
      return
    }
    const dbRef = doc(db, 'user', userId)
    await updateDoc(dbRef, {
      username: name,
      email: email,
      password: password,
      type: type,
      dateCreated: datecreated,
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
        const docRef = doc(db, 'user', userId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          let userStatus = ''
          if (data.status) {
            const userStatusDoc = await getDoc(data.status)
            userStatus = userStatusDoc.data().name
          }
          setName(data.username)
          setEmail(data.email)
          setPassword(data.password)
          setType(data.type)
          setDatecreated(data.dateCreated?.toDate().toLocaleString())
          setStatus(userStatus) // set the status
        } else {
          console.log('No such document!')
        }
      }
      fetchData()
    }
  }, [visibleLg, userId])
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
          <CModalTitle>Edit User</CModalTitle>
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
              {/* <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">Password</CInputGroupText>
                <CFormInput
                  aria-label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </CInputGroup> */}
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">Type</CInputGroupText>
                <CFormInput
                  disabled={true}
                  aria-label="Type"
                  value="Administrator"
                  onChange={(e) => setType(e.target.value)}
                />
              </CInputGroup>
              {/* <CFormSelect
                className="-input-select"
                aria-label="Default select example"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="User" className="custom-input-select-active">
                  User
                </option>
                <option value="Admin" className="custom-input-select-inactive">
                  Administrator
                </option>
              </CFormSelect> */}
              {/* <br /> */}
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
          <CButton color="primary" onClick={() => EditData(userId)}>
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

const DeleteUserModal = ({ userId }) => {
  const [message, setMessage] = useState({ text: '', type: '' })

  const [visible, setVisible] = useState(false)

  const DeleteData = async (userId) => {
    const dbRef = doc(db, 'user', userId)
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
          <CModalTitle>Delete User</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure to delete this user?</CModalBody>
        {message.text && (
          <div className={`alert alert-${message.type === 'error' ? 'danger' : 'success'}`}>
            {message.text}
          </div>
        )}
        <CModalFooter>
          <CButton color="secondary" onClick={() => closemodel()}>
            Close
          </CButton>
          <CButton color="danger" onClick={() => DeleteData(userId)}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

const ShowUserTable = () => {
  let [User, setUser] = useState([])
  let [search, setSearch] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'user'))
      const tempArray = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data()
          let userStatus = ''
          if (data.status) {
            const userStatusDoc = await getDoc(data.status)
            userStatus = userStatusDoc.data().name
          }
          return {
            ...data,
            userId: doc.id,
            userStatus,
          }
        }),
      )
      setUser(tempArray)
    }
    fetchData()
  }, [])
  const filteredUsers = User.filter(
    (user) =>
      String(user.username).toLowerCase().includes(search.toLowerCase()) ||
      String(user.email).toLowerCase().includes(search.toLowerCase()) ||
      String(user.password).toLowerCase().includes(search.toLowerCase()) ||
      String(user.userType).toLowerCase().includes(search.toLowerCase()) ||
      String(user.lastActive).toLowerCase().includes(search.toLowerCase()) ||
      String(user.userStatus).toLowerCase().includes(search.toLowerCase()) ||
      (user.dateCreated?.toDate().toLocaleString() || '')
        .toLowerCase()
        .includes(search.toLowerCase()),
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
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">Status</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Email</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>
                {/* <CTableHeaderCell className="bg-body-tertiary"></CTableHeaderCell> */}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <>
                {filteredUsers.map((user, index) => (
                  <CTableRow v-for="user in tableUsers" key={index}>
                    <CTableDataCell className="text-center">
                      <CAvatar
                        size="md"
                        src={user_avatar}
                        status={user.userStatus === 'Active' ? 'success' : 'danger'}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{user.username}</div>
                      <div className="small text-body-secondary text-nowrap">
                        <span>{'New'}</span> | Registered:{' '}
                        {user.dateCreated?.toDate().toLocaleString() || ''}
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
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>
                      <div className="small text-body-secondary text-nowrap">Last Active</div>
                      <div className="fw-semibold text-nowrap">
                        {user.lastActive?.toDate().toLocaleString() || ''}
                      </div>
                    </CTableDataCell>
                    {/* <CTableDataCell>
                      <CTableDataCell className="button-container">
                        <div className="edit-modal">
                          <EditUserModal userId={user.userId} />
                        </div>
                        <div className="delete-modal">
                          <DeleteUserModal userId={user.userId} />
                        </div>
                      </CTableDataCell>
                    </CTableDataCell> */}
                  </CTableRow>
                ))}
              </>
            </CTableBody>
          </CTable>
        </CCardBody>
      </>
    )
}

const ShowUser = () => {
  let [User, setUser] = useState([])
  let [search, setSearch] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'user'))
      const tempArray = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data()
          let userType = ''
          if (data.type) {
            const userTypeDoc = await getDoc(data.type)
            userType = userTypeDoc.data().name
          }
          return {
            ...data,
            userId: doc.id,
            userType,
          }
        }),
      )
      setUser(tempArray)
    }
    fetchData()
    
  }, [])
    const filteredUsers = User.filter(
      (user) =>
        String(user.username).toLowerCase().includes(search.toLowerCase()) ||
        String(user.email).toLowerCase().includes(search.toLowerCase()) ||
        String(user.password).toLowerCase().includes(search.toLowerCase()) ||
        String(user.userType).toLowerCase().includes(search.toLowerCase()) ||
        (user.dateCreated?.toDate().toLocaleString() || '')
          .toLowerCase()
          .includes(search.toLowerCase()),
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
                Username
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary" scope="col">
                Email
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary" scope="col">
                Password
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary" scope="col">
                Type
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary" scope="col">
                Date Created
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary" scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <>
              {filteredUsers.map((user, index) => (
                <>
                  <div key={index}></div>
                  <CTableRow>
                    {/* <CTableHeaderCell scope="row"> {user.userId}</CTableHeaderCell> */}
                    <CTableDataCell>{String(user.username)}</CTableDataCell>
                    <CTableDataCell>{String(user.email)}</CTableDataCell>
                    <CTableDataCell>•••••••••••</CTableDataCell>
                    <CTableDataCell>{user.userType?.toString()}</CTableDataCell>
                    <CTableDataCell>
                      {user.dateCreated?.toDate().toLocaleString() || ''}
                    </CTableDataCell>
                    <CTableDataCell className="button-container">
                      <div className="edit-modal">
                        <EditUserModal userId={user.userId} />
                      </div>
                      <div className="delete-modal">
                        <DeleteUserModal userId={user.userId} />
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

export default ShowUser

export { ShowUserTable}
export { ShowUser }
