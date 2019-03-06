import React, { Component } from 'react'
import axios from 'axios'

//Components
import SingleManga from './manga/SingleManga'
import AddManga from './manga/AddManga'

import { connect } from 'react-redux'

import { fetchData } from '../store/actions/kitsuActions'

class Manga extends Component {
  state = {
    mangaData: [],
    title: ''
  }
  async componentDidMount () {
      let fetch = await axios({
          url: `https://kitsu.io/api/edge/manga?filter[text]=one%20piece`,
          method: 'get'
      })
      this.props.setData(fetch.data.data)
  }

  // delete = (id) => {
  //   const { mangaData } = this.state
  //   const newMangaData = mangaData.filter(el => el.id !== id)    
  //   this.setState({
  //     mangaData: newMangaData
  //   })
  // }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  } 

  addNewManga = async ()=> {
    let fetch = await axios({
      url: `https://kitsu.io/api/edge/manga?filter[text]=${this.state.title}`,
      method: 'get'
    })
    this.setState({
      mangaData: [fetch.data.data[0], ...this.state.mangaData],
      title: ''
    })

    // let post = await axios({
    //   url: `http://localhost:3001/mangas`,
    //   method: 'post',
    //   data: {
    //     title: this.state.title
    //   }
    // })
    // console.log(post.data)
  }

  bookmark () {
    console.log('bookmark')
  }
  
  render() {
    const {title} = this.state
    return (
      <div>
        <AddManga title={title} handleChange={this.handleChange} addNewManga={this.addNewManga}/>
      
        <div className="container">
          <h1>Manga List</h1>
          <div className="row">
            {/* {this.props.data.map(e => <SingleManga key={e.id} manga={e} del={() => {this.delete(e.id)}} bookmark={this.bookmark}/>)} */}
            {this.props.data.map(e => <SingleManga key={e.id} manga={e} del={() => {this.delete(e.id)}} bookmark={this.bookmark}/>)}
          </div>
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.data
})

const mapDispatchToProps = (dispatch) => ({
  setData: (data) => dispatch(fetchData(data))
})

export default connect (mapStateToProps, mapDispatchToProps)(Manga)