import React, { Component } from 'react';
import PostModel from '../models/post';
import ColorModel from '../models/color';

class Home extends Component {
  state = {
    posts = [],
    userPosts = [],
  }

  componentDidMount() {
    this.fetchData()
  };

  fetchData = async () => {
    const allPosts = await PostModel.all();
    this.setState({ posts = allPosts });

    const allUserPosts = await PostModel.all();
    this.setState({ userPosts = allUserPosts })
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

    const noUserPostList = () => {
      return <p>To save your mood as a color, press the button below.</p>
    }

    return (
      <article>
        <section>
          <h1>Your moods</h1>
          <section>
            { this.state.userPosts ? userPostList : noUserPostList }
          </section>
        </section>
        <section>
          <h1>Everyone's moods</h1>
          <section>
            { this.state.posts ? allPostList : 'Loading...'}
          </section>
        </section>
      </article>
    )
  }
}

export default Home;
