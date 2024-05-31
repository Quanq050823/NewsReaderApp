import React, { useState } from 'react'
import { CCard, CCardHeader, CCol } from '@coreui/react'
import { ShowArticle } from '../Controller/ArticleAPI'
// ...

const NewsSource = () => {
  return (
    <>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Article Management</strong>
          </CCardHeader>
          <ShowArticle />
        </CCard>
      </CCol>
    </>
  )
}

export default NewsSource
