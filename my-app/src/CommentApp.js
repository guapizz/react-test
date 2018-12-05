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
    componentWillMount () {
        this._loadComments();
        console.log(111);
    }
    _saveComments (comments) {
        sessionStorage.setItem('comments', JSON.stringify(comments));
    }
    _loadComments () {
        let comments = sessionStorage.getItem('comments');
        if (comments) {
            comments = JSON.parse(comments);
            this.setState({
                comments: comments
            })
        }
    }
    handleSubmit (comments) {
        if (!comments) return;
        if (!comments.username) return alert('请输入用户名');
        if (!comments.content) return alert('请输入评论内容');
        this.state.comments.push(comments)
        this.setState({
            comments: this.state.comments
        })
        this._saveComments(this.state.comments);
    }
    handleDeleteComment (index) {
        const comments = this.state.comments;
        comments.splice(index, 1);
        this.setState({
            comments: comments
        })
        this._saveComments(comments);
    }
    render () {
        return (
            <div className='wrapper'>
                <CommentInput onSubmit={this.handleSubmit.bind(this)}/>
                <CommentList
                    comments={this.state.comments}
                    onDeleteComment={this.handleDeleteComment.bind(this)}
                />
            </div>
        )
    }
}
export default CommentApp;