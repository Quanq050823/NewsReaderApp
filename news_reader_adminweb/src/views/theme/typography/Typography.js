import React from 'react'
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
} from '@coreui/react'
import { DocsLink } from 'src/components'
import { DocsExample } from 'src/components'

const Typography = () => (
  <CCol xs={12}>
    <CCard className="mb-4">
      <CCardHeader>
        <strong>React Table</strong> <small>Hoverable rows</small>
      </CCardHeader>
      <CCardBody>
        <p className="text-body-secondary small">
          Use <code>hover</code> property to enable a hover state on table rows within a{' '}
          <code>&lt;CTableBody&gt;</code>.
        </p>
        <DocsExample href="components/table#hoverable-rows">
          <CTable striped hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell scope="row">1</CTableHeaderCell>
                <CTableDataCell>Mark</CTableDataCell>
                <CTableDataCell>Otto</CTableDataCell>
                <CTableDataCell>@mdo</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">2</CTableHeaderCell>
                <CTableDataCell>Jacob</CTableDataCell>
                <CTableDataCell>Thornton</CTableDataCell>
                <CTableDataCell>@fat</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">3</CTableHeaderCell>
                <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
                <CTableDataCell>@twitter</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </DocsExample>
      </CCardBody>
    </CCard>
  </CCol>
)

export default Typography
