import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDetail } from '../../store/actions/apiActions'

class DetailManga extends Component {
  componentDidMount () {
      this.props.getDetail(this.props.match.params.id)
  }
  render() {
    let { detail } = this.props 
    return (
      <div>
          {
            detail.id && 
            <div className="container mt-3">
              <div className="row">
                <div className="col-4">
                  <img src={detail.attributes.posterImage.small} alt=""/>
                </div>
                <div className="col">
                  <div className="row flex-column">
                    <h1>{detail.attributes.canonicalTitle}</h1>  
                    <h4>Synopsis:</h4>
                    <p>{detail.attributes.synopsis}</p>
                  </div>
                  <div className="row">
                    <div className="col">Japanese Title: {detail.attributes.titles.en_jp}</div>
                    <div className="col">Age Rating: {detail.attributes.ageRating}</div>
                  </div>
                  <div className="row">
                    <div className="col">Start Date: {detail.attributes.startDate}</div>
                    <div className="col">End Date: {detail.attributes.endDate}</div>
                  </div>
                  <div className="row">
                    <div className="col">Popularity: {detail.attributes.popularityRank}</div>
                    <div className="col">Like: {detail.attributes.userCount}</div>
                  </div>
                </div>
              </div>
            </div>
          }
      </div>
    )
  }
}

const matStateToProps = (state) => ({
  detail: state.api.detail
})

const mapDispatchToProps = (dispatch) => ({
  getDetail: (id) => dispatch(getDetail(id))
})

export default connect(matStateToProps, mapDispatchToProps)(DetailManga)