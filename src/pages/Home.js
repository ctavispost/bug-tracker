import React, { Component } from 'react';
import PostModel from '../models/post';
import ColorModel from '../models/color';
import PostComp from '../components/PostComp';
import MoodCreate from '../components/MoodCreate';
//import MoodEdit from '../components/MoodEdit';

class Home extends Component {
  state = {
    posts: [],
    userPosts: []
  }

  componentDidMount() {
    this.fetchData()
  };

  fetchData = async () => {
    const allPosts = await PostModel.all();
    this.setState({ posts: allPosts });

    const allUserPosts = await PostModel.all();
    this.setState({ userPosts: allUserPosts })
  }

  handleClick() {

  }

  render(){
    const allPostList = this.state.userPosts.map((post, index) => {
      return (
        <PostComp {...post}/>
      )
    })

    const userPostList = this.state.posts.map((post, index) => {
      return (
        <PostComp {...post}/>
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

        <a className="btn-floating btn waves-effect waves-light red modal-trigger" href="#modal1"><i className="material-icons">add</i></a>

        <div id="modal1" class="modal">
          <div class="modal-content">
            <MoodCreate />
          </div>
        </div>
      </article>
    )
  }
}

export default Home;
