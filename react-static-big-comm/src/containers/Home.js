import React from 'react'
import { withSiteData } from 'react-static'
import { Card } from '../components/mui'

export default withSiteData(() => (
  <Card style={{ marginTop: 300 }}>
    <h1 style={{ textAlign: 'center' }}>Zwift</h1>
  </Card>
))
