// TableCellFactory.js
import React from 'react'
import { CTableDataCell } from '@coreui/react'
import EditUserModal from './EditUserModal'
import DeleteUserModal from './DeleteUserModal'

const cellMap = {
  username: (user) => <CTableDataCell>{String(user.username)}</CTableDataCell>,
  email: (user) => <CTableDataCell>{String(user.email)}</CTableDataCell>,
  password: (user) => <CTableDataCell>•••••••••••</CTableDataCell>,
  userType: (user) => <CTableDataCell>{user.userType?.toString()}</CTableDataCell>,
  dateCreated: (user) => (
    <CTableDataCell>{user.dateCreated?.toDate().toLocaleString() || ''}</CTableDataCell>
  ),
  action: (user) => (
    <CTableDataCell className="button-container">
      <div className="edit-modal">
        <EditUserModal userId={user.userId} />
      </div>
      <div className="delete-modal">
        <DeleteUserModal userId={user.userId} />
      </div>
    </CTableDataCell>
  ),
}

const TableCellFactory = ({ cellType, user }) => {
  const Cell = cellMap[cellType]
  return Cell ? Cell(user) : null
}

export default TableCellFactory
