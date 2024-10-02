import React from 'react'
import { ValueGroup } from '@adminjs/design-system'

const JsonShowComponent = (props) => {
  const { record, property } = props
  const value = record.params[property.name]
  return (
    <ValueGroup label={property.label}>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </ValueGroup>
  )
}

export default JsonShowComponent