import React from 'react'
import { ValueGroup } from '@adminjs/design-system'

const JsonListComponent = (props) => {
  const { record, property } = props
  const value = record.params[property.name]
  return (
    <ValueGroup label={property.label}>
      {Array.isArray(value) ? `${value.length} members` : 'Invalid data'}
    </ValueGroup>
  )
}

export default JsonListComponent