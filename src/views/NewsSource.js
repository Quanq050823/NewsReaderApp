import React, { useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCol,
} from '@coreui/react'
import { ShowNewsSources } from '../Controller/NewsSourceAPI'
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
