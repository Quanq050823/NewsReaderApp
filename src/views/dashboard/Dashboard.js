import React from 'react'
import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

import { CCard, CCardHeader, CCardBody, CCol } from '@coreui/react'

const Dashboard = () => {
  return (
    <>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Overview</strong>
          </CCardHeader>
          <CCardBody>
            <WidgetsDropdown className="mb-4" />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Social Network Interaction</strong>
          </CCardHeader>
          <CCardBody>
            <WidgetsBrand className="mb-4" withCharts />
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}

export default Dashboard
