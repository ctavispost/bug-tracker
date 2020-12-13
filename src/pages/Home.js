import React, { Component } from 'react';
import PostModel from '../models/post';
import ColorModel from '../models/color';
import PostComp from '../components/PostComp';
import MoodCreate from '../components/MoodCreate';
import MoodEdit from '../components/MoodEdit';

class Home extends Component {
  state = {
    posts: [],
    userPosts: []
  }

  componentDidMount() {
    this.fetchData()
  };

  fetchData = async () => {
    const allPosts = await PostModel.all().posts;
    console.log(allPosts);
    this.setState({ posts: allPosts });

    const allUserPosts = await PostModel.all().posts;
    if (allUserPosts.length > 0) {
      this.setState({ userPosts: allUserPosts });
    }
  }

  handleCreate = () => {
    const elems = document.getElementById('#modal1');
    const instances = M.Modal.init(elems, options);
  }

  handleEdit = () => {
    const elems = document.getElementById('#modal2');
    const instances = M.Modal.init(elems, options);
  }

  addNewPost = (post) => {
    this.setState({posts: [...this.state.posts, post]});
    this.setState({userPosts: [...this.state.userPosts, post]});
  }

  render(){
    const allPostList = this.state.posts.map((post, index) => {
      return (
        <PostComp {...post}/>
      )
    })
    
    const userPostList = this.state.userPosts.map((post, index) => {
      return (
        <a className="modal-trigger" href="modal2" onClick={() => this.handleEdit()}>
          <PostComp {...post}/>
        </a>
      )
    })

    //in case of empty state or while loading
    const noUserPostList = () => {
      return <p>To save your mood, press the button below.</p>
    }

    return (
      <article className="gridy">
        <section className="gridy">
          <h1>Your moods</h1>
          <section className="flexy">
            { this.state.userPosts ? userPostList : noUserPostList }
          </section>
        </section>
        <section className="gridy">
          <h1>Everyone's moods</h1>
          <section className="flexy">
            { this.state.posts ? allPostList : 'Loading...'}
          </section>
        </section>

        <a className="btn-floating btn waves-effect waves-light red modal-trigger add-btn" href="#modal1" onClick={() => this.handleCreate()}><i className="material-icons">add</i></a>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <MoodCreate onSubmit={post => this.newPost(post)}/>
          </div>
        </div>

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
