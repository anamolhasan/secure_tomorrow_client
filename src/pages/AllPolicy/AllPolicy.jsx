import React from 'react'

import Polices from '../../components/AllPolices/Polices'
import { Helmet } from 'react-helmet'

const AllPolicy = () => {
  return (
    <div>
        <Helmet>
        <title>All Policy</title>
      </Helmet>
      <Polices />
    </div>
  )
}

export default AllPolicy