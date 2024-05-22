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
  const EditData = async (userId) => {
    if (name === undefined || email === undefined || datecreated === undefined) {
      console.error('One of the values is undefined')
      return
    }
    const dbRef = doc(db, 'User', userId)
    await updateDoc(dbRef, {
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
  useEffect(() => {
    if (visibleLg) {
      const fetchData = async () => {
        const docRef = doc(db, 'User', userId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setName(docSnap.data().Username)
          setEmail(docSnap.data().Email)
          setPassword(docSnap.data().Password)
          setType(docSnap.data().Type)
          setDatecreated(docSnap.data().DateCreated)
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
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">Password</CInputGroupText>
                <CFormInput
                  aria-label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </CInputGroup>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">Type</CInputGroupText>
                <CFormInput
                  aria-label="Type"
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
    const dbRef = doc(db, 'User', userId)
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
        const querySnapshot = await getDocs(collection(db, 'User'))
        const tempArray = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            userId: doc.id,
          }
        })
        setUser(tempArray)
      }
      fetchData()
    }, [])

    const filteredUsers = User.filter(user => 
      user.Username.toLowerCase().includes(search.toLowerCase()) ||
      user.Email.toLowerCase().includes(search.toLowerCase()) ||
      user.Password.toLowerCase().includes(search.toLowerCase()) ||
      user.Type.toLowerCase().includes(search.toLowerCase()) ||
      user.DateCreated.toLowerCase().includes(search.toLowerCase())
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
                <CTableHeaderCell className="bg-body-tertiary"></CTableHeaderCell>
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
                        status={user.Status ? 'success' : 'danger'}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{user.Username}</div>
                      <div className="small text-body-secondary text-nowrap">
                        <span>{'New'}</span> | Registered: {user.DateCreated}
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
                    <CTableDataCell>{user.Email}</CTableDataCell>
                    <CTableDataCell>
                      <div className="small text-body-secondary text-nowrap">Last login</div>
                      <div className="fw-semibold text-nowrap">10 sec ago</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CTableDataCell className="button-container">
                        <div className="edit-modal">
                          <EditUserModal userId={user.userId} />
                        </div>
                        <div className="delete-modal">
                          <DeleteUserModal userId={user.userId} />
                        </div>
                      </CTableDataCell>
                    </CTableDataCell>
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
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'User'))
    const tempArray = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        userId: doc.id,
      }
    })
    setUser(tempArray)
  }
  fetchData()
      const filteredUsers = User.filter(
        (user) =>
          user.Username.toLowerCase().includes(search.toLowerCase()) ||
          user.Email.toLowerCase().includes(search.toLowerCase()) ||
          user.Password.toLowerCase().includes(search.toLowerCase()) ||
          user.Type.toLowerCase().includes(search.toLowerCase()) ||
          user.DateCreated.toLowerCase().includes(search.toLowerCase()),
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
          <CTableHead className="bg-body-tertiary text-center">
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
                    <CTableDataCell>{user.Username}</CTableDataCell>
                    <CTableDataCell> {user.Email}</CTableDataCell>
                    <CTableDataCell>{user.Password}</CTableDataCell>
                    <CTableDataCell>{user.Type}</CTableDataCell>
                    <CTableDataCell>{user.DateCreated}</CTableDataCell>
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
