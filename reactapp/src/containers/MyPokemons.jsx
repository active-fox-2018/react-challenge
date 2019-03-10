import React, { Component } from 'react'
import PokemonFavorite from '../containers/pokemon/PokemonFavorite'
import { TextArea } from 'semantic-ui-react'
import { db } from '../api/firestore'
import {connect} from 'react-redux'
import SingleMessageBox from '../containers/MyPokemon/SingleMessageBox'
import './Mypokemons.css';
let keyPress = []
class MyPokemons extends Component {

  messagesEnd = React.createRef()
  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' })
  }
  
  componentDidUpdate = () => {
    this.scrollToBottom()
  }

  componentDidMount = () => {
    db.collection('messages')
    .orderBy("createdAt", 'desc')
    .limit(5)
      .onSnapshot((docs) => {
        let result = []
        docs.forEach(doc => {
          result.unshift({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message,
            createdAt: String(doc.data().createdAt.toDate()).substr(0,21)
          })
        })
        this.scrollToBottom()
        this.setState({
          messages: result
        })
      })
  }

  handleChangeInput = (e) => {
    keyPress.push(e.keyCode)
    if(e.keyCode === 13 && keyPress[keyPress.length-2] !== 16 ) {
      this.sendText(e)
      this.setState({
        [e.target.name] : ''
      })
      keyPress = []
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    }, () => console.log(this.state))
  }

  sendText = (e) => {
    e.preventDefault()
    db.collection('messages')
    .add({
      name: this.props.name,
      message: this.state.newText,
      createdAt: new Date()
    })
    .then(doc => {
      console.log(doc)
    })
    .catch(err => {
      console.log(err)
    })
  }

  state = {
    messages : [],
    newText: '',
  }

  render() {
    let { messages } = this.state
    return (
      <div className="container">
      <div className="ChatRoom">
        <h1>Public Chat Room</h1>
        {messages.map((message) => <SingleMessageBox props={message} key={message.id} />)}
        <div ref={this.messagesEnd} />
        </div>
        <form className="inputForMessage" onSubmit={this.sendText}>
          <TextArea autoHeight  placeholder='Try adding multiple lines' value={this.state.newText} name="newText" onChange={this.onChange.bind(this)} onKeyDown={this.handleChangeInput} />
        </form>
        <PokemonFavorite/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  name: state.loginState.name
})


export default connect(mapStateToProps)(MyPokemons)
