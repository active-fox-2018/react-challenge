import React from 'react'
import { Button, Icon} from 'semantic-ui-react'
export default function button(props) {
  let method
  if(props.id) {
    method = () => props.method(props.id)
  } else {
    method = props.method
  }
  
  return (
    <Button animated color={props.color} onClick={method}>
    <Button.Content visible>{props.action}</Button.Content>
    <Button.Content hidden>
      <Icon name={props.icon} />
    </Button.Content>
    </Button>
  )
}
