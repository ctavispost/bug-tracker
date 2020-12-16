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
    postId: ''
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

  handleEdit = async (e) => {
    e.persist();
    //console.log(e);
    let colorIdStr = '';
    if(e.target.dataset.value) {
        colorIdStr = e.target.dataset.value;
    } else {
        colorIdStr = e.target.parentElement.dataset.value;
    };  
    //console.log(colorIdStr);
    const colorVal = parseInt(colorIdStr);
    const localUser = parseInt(localStorage.getItem('id'));
    const newPost = {
        colorId: colorVal,
        userId: localUser
    };
    //console.log("new post: ", newPost);
    //console.log(this.state.posts.length);
    const res = await PostModel.create(newPost);
    //console.log(res);

    res.colorHex = (await ColorModel.getColor(res.colorId)).color.hex; 
    
    let newPosts = this.state.posts;
    newPosts.unshift(res);
    let newUserPosts = this.state.userPosts;
    newUserPosts.unshift(res);
    //console.log(newPosts);
    //console.log(this.state.posts);
      
    this.setState({ posts: newPosts, userPosts: newUserPosts });
    //this.setState({ show2: true, posts: newPosts, userPosts: newUserPosts });
    console.log("new length", this.state.posts.length);
    //console.log(this.state.posts);
    //console.log(e.target, this.state.postId);
  };

  openColorChange = (e) => {
    this.setState({ show2: true, postId: parseInt(e.target.value) });
  };

  handleColorChange = async (e) => {
    e.persist();
    console.log("e: ", e);
    let colorIdStr = '';
    if(e.target.dataset.value) {
        colorIdStr = e.target.dataset.value;
    } else {
        colorIdStr = e.target.parentElement.dataset.value;
    };  
    console.log("color string: ", colorIdStr);
    const colorVal = parseInt(colorIdStr);
    const localUser = parseInt(localStorage.getItem('id'));
    const postId = this.state.postId;
    console.log("postId: ", postId);
    const currentPost = {
        id: postId,
        colorId: colorVal,
        userId: localUser
    };
    const res = await PostModel.update(currentPost);
    console.log(res);
    res.colorHex = (await ColorModel.getColor(res.colorId)).color.hex;
    this.setState({ postId: '' });
  };

  getOut = (event) => {
    this.setState({ show1: false, show2: false});
  };

  deletePost = async () => {
    const index = this.state.postId;
    this.setState({
      posts: this.state.posts.filter((v, i)=> i !== index),
      userPosts: this.state.userPosts.filter((v, i)=> i !== index),
      postId: ''
    })
    await PostModel.destroy(index);
  }

  render(){
    const allPostList = this.state.posts.map((post, index) => {
      return (
        <PostComp {...post} key={ post.id }/>
      );
    });
    
    const userPostList = this.state.userPosts.map((post, index) => {
      return (
        <PostComp {...post} key={ post.id } openModal={e => this.openColorChange(e)}/>
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

        
        <MoodCreate show={this.state.show1} getOut={this.getOut} handleEdit={this.handleEdit}/>
        <MoodEdit show={this.state.show2} postId={this.state.postId} getOut={this.getOut} handleColorChange={this.handleColorChange} deletePost={this.deletePost}/>
          
      </article>
    )
  }
}

export default Home;
