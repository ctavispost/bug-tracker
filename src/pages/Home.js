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
    show2: false
  }

  componentDidMount() {
    this.fetchData();
  };

  //get all posts, all of current user's posts, and set colors for them, then set state
  fetchData = async () => {
    const allPosts = (await PostModel.all()).posts;
    const allUserPosts = (await PostModel.all()).posts;
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

  handleEdit = () => {
    const elems = document.getElementById('#modal2');
  };

  newPost = (post) => {
    this.setState({ posts: [...this.state.posts, post], userPosts: [...this.state.userPosts, post], show1: false });
  };

  render(){
    const allPostList = this.state.posts.map((post, index) => {
      return (
        <PostComp {...post} key={ post.id }/>
      );
    });
    
    const userPostList = () =>{
      if (this.state.userPosts.length > 0) {
        this.state.userPosts.map((post, index) => {
          return (
            <a className="modal-trigger" href="modal2" onClick={() => this.handleEdit()}>
              <PostComp {...post} key={ post.id }/>
            </a>
          )
        })  
      } else {
        return <p>No posts found.</p>
      }
    }
      

    //in case of empty state or while loading
    const noUserPostList = (<p>To save your mood, press the button below.</p>);

    return (
      <article className="gridy">
        <section className="gridy">
          <h1 className="just-center">Your moods</h1>
          <section className="flexy">
            { this.state.userPosts ? userPostList() : noUserPostList }
          </section>
        </section>
        <section className="gridy">
          <h1 className="just-center">Everyone's moods</h1>
          <section className="flexy">
            { this.state.posts ? allPostList : 'Loading...'}
          </section>
        </section>

        <a className="btn-floating btn waves-effect waves-light red modal-trigger add-btn" href="#modal1" onClick={e => this.handleCreate(e)}><i className="material-icons">add</i></a>

        <MoodCreate onClick={post => this.newPost(post)} show={this.state.show1}/>
        
        <div id="modal2" className="modal">
          <div className="modal-content">
            <MoodEdit />
          </div>
        </div>
      </article>
    )
  }
}

export default Home;
