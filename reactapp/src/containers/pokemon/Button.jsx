import React from 'react'
import { Button} from 'semantic-ui-react'
export default function button(props) {
  return (
    <Button basic color={props.color}>
      {props.action}
    </Button>
  )
}
