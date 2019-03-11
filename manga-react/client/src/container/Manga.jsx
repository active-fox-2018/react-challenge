import React, { Component } from 'react'

//Components
import SingleManga from './manga/SingleManga'

import { connect } from 'react-redux'
import { fetchData, deleteManga } from '../store/actions/kitsuActions'
import { getData } from '../store/actions/apiActions'

class Manga extends Component {
  state = {
    mangaData: [],
    title: ''
  }
  async componentDidMount () {
      this.props.getData()
  }

  delete = (id) => {
    this.props.deleteManga(id)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  } 
  
  render() {
    return (
      <div>
        <div className="container">
          <h1>My Manga Collection</h1>
          {
            this.props.data && 
              <div className="row">
                {this.props.data.map(e => <SingleManga key={e.id} manga={e} del={()=>this.delete(e._id)} bookmark={this.bookmark}/>)}
              </div>
          }
          
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.api.manga,
})

const mapDispatchToProps = (dispatch) => ({
  setData: (data) => dispatch(fetchData(data)),
  getData: () => dispatch(getData()),
  deleteManga: (id) => dispatch(deleteManga(id))
})

export default connect (mapStateToProps, mapDispatchToProps)(Manga)