import { Icon, Input } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class search extends Component {
  state = {
    search: ''
  }

  handleChangeSearch = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  submit = (e) => {
    e.preventDefault()
    this.props.searchBy(this.state.search)
    this.setState({
      search: ''
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
         <Input className="search" icon={<Icon name='search' inverted circular link />} placeholder='Search...' name="search" onChange={this.handleChangeSearch.bind(this)}/>
        </form>
      </div>
    )
  }
}
