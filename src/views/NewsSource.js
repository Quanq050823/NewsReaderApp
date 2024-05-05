import React, { useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { ShowNewsSources } from '../API/NewsSourcesAPI'
// ...
const NewsSource = () => (
  <>
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>News Source Management</strong>
        </CCardHeader>
        <CCardBody>
          <CTable striped hover>
            <CTableHead>
              <CTableRow>
                {/* <CTableHeaderCell scope="col">#</CTableHeaderCell> */}
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date Created</CTableHeaderCell>
                <CTableHeaderCell scope="col">Activate Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">URL</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>{ShowNewsSources()}</CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  </>
)

export default NewsSource
