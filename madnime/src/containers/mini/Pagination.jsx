//Store
import { connect } from 'react-redux'
import { sendList } from '../../store/actions/animes'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import React from 'react'

function Pagination(props) {
  return (
    <>
    {
      props.pge > 1 &&
      <Link to={`/${Number(props.pge) - 1}`}><button className="col page-btn justify-content-start"><i className="fas fa-backward"></i></button></Link>
    }
    <div className="col"></div>
      <Link to={`/${Number(props.pge) + 1}`}><button className="col page-btn float-right"><i className="fas fa-forward"></i></button></Link>
    </>
  )
}
const mapDispatchToProps = (dispatch) => bindActionCreators({sendList}, dispatch)

export default connect(null, mapDispatchToProps)(Pagination)
