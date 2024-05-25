import React, { useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import { db } from '../firebase'
import { ShowNewsSources } from '../Controller/NewsSourceAPI'
import { collection, addDoc } from 'firebase/firestore'
// ...

const NewsSource = () => {
  return (
    <>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>News Source Management</strong>
          </CCardHeader>
          <ShowNewsSources />
        </CCard>
      </CCol>
    </>
  )
}

export default NewsSource
