import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentInput extends Component {
    static propTypes = {
        onSubmit: PropTypes.func
    }
    constructor () {
        super ()
        this.state = {
            username: '',
            content: ''
        }
    }
    componentWillMount () { // 组件挂载前
        this._loadUserName();
    }
    componentDidMount () { // 组件挂载完后，自动聚焦
        this.textarea.focus();
    }
    _saveUsername (username) { // 私有方法以'_'开头
        sessionStorage.setItem('username', username);
    }
    _loadUserName () {
        const username = sessionStorage.getItem('username');
        if (username) {
            this.setState({
                username: username
            })
        }
    }
    handleUserNameChange (e) {
        this.setState({
            username: e.target.value
        })
    }
    handleContentChange (e) {
        this.setState({
            content: e.target.value
        })
    }
    handleSubmit () {
        if (this.props.onSubmit) {
            // const { username, content } = this.state;
            this.props.onSubmit({
                username: this.state.username,
                content: this.state.content,
                createdTime: +new Date()
            });
        }
        this.setState({
            content: ''
        })
    }
    handleUserNameBlur (e) {
        this._saveUsername(e.target.value);
    }
    render () {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input
                            value={this.state.username}
                            onChange={this.handleUserNameChange.bind(this)}
                            onBlur={this.handleUserNameBlur.bind(this)}
                        />
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea value={this.state.content} ref={(textarea)=>this.textarea=textarea} onChange={this.handleContentChange.bind(this)} />
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button onClick={this.handleSubmit.bind(this)}>
                        发布
                    </button>
                </div>
            </div>
        )
    }
}

export default CommentInput;