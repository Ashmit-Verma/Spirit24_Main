import React, { useState } from 'react'
import { Edit } from '@adminjs/design-system'

const JsonEditComponent = (props) => {
  const { property, record, onChange } = props
  const [value, setValue] = useState(JSON.stringify(record.params[property.name] || [], null, 2))

  const handleChange = (event) => {
    const newValue = event.target.value
    setValue(newValue)
    try {
      const parsedValue = JSON.parse(newValue)
      onChange(property.name, parsedValue)
    } catch (error) {
      // Handle invalid JSON
    }
  }

  return (
    <Edit.Textarea
      id={property.name}
      name={property.name}
      onChange={handleChange}
      value={value}
      rows={10}
    />
  )
}

export default JsonEditComponent