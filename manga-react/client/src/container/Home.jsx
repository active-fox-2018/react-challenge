import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchManga, searchManga } from '../store/actions/apiActions'
import SingleManga from './manga/SingleManga'
import { addNewManga } from '../store/actions/kitsuActions'

class Home extends Component {
  state = {
    title: ''
  }
  
  componentDidMount () {
    this.props.fetchManga()
  }

  handleChange = (e)=> {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  search = (e)=> {
    e.preventDefault()
    this.props.searchManga(this.state.title)
  }

  bookmark = (title, id) => {
    this.props.bookmark(title, id)
  }

  render() {
    let {mangas} = this.props
    return (
        <div className="home">

        {
          this.props.loading ? <img src="https://i.gifer.com/Eie9.gif" alt="" className="loading"/> : 
          <div>
            <div className="tron">
              <img src="https://ak4.picdn.net/shutterstock/videos/2090714/thumb/1.jpg" alt="Snow" style={{height: "50vh"}}/>
              <div className="centeredSearch">
                <form onSubmit={this.search} className="form-inline my-2 my-lg-0">
                  <input className="form-control mr-sm-2" value={this.props.title} name="title" onChange={this.handleChange.bind(this)} type="text" placeholder="Search Manga . . ." style={{width: "100vh", boxShadow: "10px 10px black"}} />
                </form>
              </div>
            </div>
            <div className="container">
              <div className="row mt-3">
                {mangas.map(e => <SingleManga key={e.id} loading={this.props.loadingBookmark} bookmark={() => this.bookmark(e.attributes.canonicalTitle, e.id)} manga={{
                        id: e.id,
                        image: e.attributes.posterImage.tiny,
                        start: e.attributes.startDate,
                        synopsis: e.attributes.synopsis,
                        rating: e.attributes.averageRating,
                        canonicalTitle: e.attributes.canonicalTitle
                }} />)}
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  mangas: state.api.homeManga,
  loading: state.api.loading,
  loadingBookmark: state.api.loadingPush
})

const mapDispatchToProps = (dispatch) => ({
  fetchManga: (page) => dispatch(fetchManga(page)),
  searchManga: (title) => dispatch(searchManga(title)),
  bookmark: (title, id) => dispatch(addNewManga(title, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)