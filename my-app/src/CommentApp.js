import React, { Component } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';


class CommentApp extends Component {
    constructor () {
        super ()
        this.state = {
            comments: []
        }
    }
    handleSubmit (comments) {
        console.log(comments)
        this.state.comments.push(comments)
        this.setState({
            comments: this.state.comments
        })
    }
    render () {
        return (
            <div className='wrapper'>
                <CommentInput onSubmit={this.handleSubmit.bind(this)}/>
                <CommentList comments={this.state.comments}/>
            </div>
        )
    }
}
export default CommentApp;