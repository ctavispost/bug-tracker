import React, { Component } from 'react';
import PostModel from '../models/post';
import PostComp from '../components/PostComp';
import MoodCreate from '../components/MoodCreate';
import MoodEdit from '../components/MoodEdit';
import ColorModel from '../models/color';

class Home extends Component {
  state = {
    posts: [],
    userPosts: [],
    show1: false,
    show2: false,
    postId: null
  }

  componentDidMount() {
    this.fetchData();
  };

  /* //memory leak
  componentDidUpdate() {
    this.fetchData();
  }*/

  //get all posts, filter for all of current user's posts, and set colors for each, then set state
  fetchData = async () => {
    const allPosts = (await PostModel.all()).posts.reverse();
    
    const localUser = parseInt(localStorage.getItem('id'));
    const allUserPosts = allPosts.filter((post)=>{return post.userId = localUser});

    for (let p of allPosts) {
      p.colorHex = (await ColorModel.getColor(p.colorId)).color.hex;
    }
    for (let p of allUserPosts) {
      p.colorHex = (await ColorModel.getColor(p.colorId)).color.hex;
    }
    this.setState({ posts: allPosts, userPosts: allUserPosts });
  }

  handleCreate = (e) => {
    this.setState({ show1: true });
  };

  handleEdit = (e) => {
    this.setState({ show2: true });
  };

  getOut = async (event) => {
    this.setState({ show1: false, show2: false});
    await this.fetchData();
  };

  deletePost = (index) => {
    this.setState({
      posts: this.state.posts.filter((v, i)=> i !== index),
      userPosts: this.state.userPosts.filter((v, i)=> i !== index)
    })
  }

  render(){
    const allPostList = this.state.posts.map((post, index) => {
      return (
        <PostComp {...post} key={ post.id }/>
      );
    });
    
    const userPostList = this.state.userPosts.map((post, index) => {
      return (
        <PostComp {...post} key={ post.id } onClick={e => this.handleEdit(e)}/>
      );
    });
      
    //in case of empty state or while loading
    const noUserPostList = (<p>To save your mood, press the button below.</p>);

    return (
      <article className="gridy">
        <section className="gridy">
          <h1 className="just-center">Your moods</h1>
          <section className="flexy flex-reverse">
            { this.state.userPosts ? userPostList : noUserPostList }
          </section>
        </section>
        <section className="gridy">
          <h1 className="just-center">Everyone's moods</h1>
          <section className="flexy flex-reverse">
            { this.state.posts ? allPostList : 'Loading...'}
          </section>
        </section>

        <a className="btn-floating btn waves-effect waves-light red modal-trigger add-btn" href="#modal1" onClick={e => this.handleCreate(e)}><i className="material-icons">add</i></a>

        
        <MoodCreate show={this.state.show1} getOut={this.getOut}/>
        <MoodEdit show={this.state.show2} postId={this.props.postId} getOut={this.getOut}/>
          
      </article>
    )
  }
}

export default Home;
