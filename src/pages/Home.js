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
    postId: '',
  }

  componentDidMount() {
    this.fetchData();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.posts !== this.state.posts){
      this.fetchData();
    }
  }

  //get all posts, filter for all of current user's posts, and set colors for each, then set state
  fetchData = async () => {
    const allPosts = (await PostModel.all()).posts.reverse();
    
    const localUser = parseInt(localStorage.getItem('id'));
    console.log(localUser);
    const allUserPosts = allPosts.filter((post)=>{return post.userId === localUser});
    console.log("posts: ", allPosts.length);
    console.log("AUPs: ", allUserPosts.length);
    for (let p of allPosts) {
      p.colorHex = (await ColorModel.getColor(p.colorId)).color.hex;
    }
    for (let p of allUserPosts) {
      p.colorHex = (await ColorModel.getColor(p.colorId)).color.hex;
    }
    this.setState({ posts: allPosts, userPosts: allUserPosts });
  }

  //open new post modal
  handleCreate = (e) => {
    this.setState({ show1: true });
  };

  //edit new post
  handleEdit = async (e) => {
    e.persist();

    let colorIdStr = '';
    if(e.target.dataset.value) {
        colorIdStr = e.target.dataset.value;
    } else {
        colorIdStr = e.target.parentElement.dataset.value;
    };  
    
    const colorVal = parseInt(colorIdStr);
    const localUser = parseInt(localStorage.getItem('id'));
    const newPost = {
        colorId: colorVal,
        userId: localUser
    };
    
    const res = await PostModel.create(newPost);
    res.colorHex = (await ColorModel.getColor(res.colorId)).color.hex; 
    let newPosts = this.state.posts;
    newPosts.unshift(res);
    let newUserPosts = this.state.userPosts;
    newUserPosts.unshift(res);
      
    this.setState({ posts: newPosts, userPosts: newUserPosts });
  };

  //open modal to change or delete post
  openColorChange = (e) => {
    e.preventDefault();
    this.setState({ show2: true, postId: parseInt(e.target.value) });
  };

  //change post color
  handleColorChange = async (e) => {
    e.persist();
    let colorIdStr = e.target.parentElement.dataset.value;
    if(e.target.dataset.value) {
        colorIdStr = e.target.dataset.value;
    } else {
        colorIdStr = e.target.parentElement.dataset.value;
    };

    const colorVal = parseInt(colorIdStr);
    const localUser = parseInt(localStorage.getItem('id'));
    const postId = this.state.postId;
  
    const currentPost = {
        id: postId,
        colorId: colorVal,
        userId: localUser
    };
    const res = await PostModel.update(currentPost);
    res.colorHex = (await ColorModel.getColor(parseInt(res.post[0]))).color.hex;
    this.setState({ postId: '' , userPosts: this.state.userPosts});
  };

  //close modal
  getOut = (event) => {
    this.setState({ show1: false, show2: false});
  };

  deletePost = async () => {
    const index = this.state.postId;
    await PostModel.destroy(index);
    this.setState({
      posts: this.state.posts.filter((v, i)=> i !== index),
      userPosts: this.state.userPosts.filter((v, i)=> i !== index),
      postId: ''
    })
  }

  render(){
    //map userPosts (as buttons)
    const userPostList = this.state.userPosts.map((post, index) => {
      return (
        <PostComp {...post} key={ post.id } truthy={true} openModal={e => this.openColorChange(e)}/>
      );
    });
    
    //map everybody's posts (as divs)
    const allPostList = this.state.posts.map((post, index) => {
      return (
        <PostComp {...post} key={ post.id }/>
      );
    });
    
    //in case of empty state or while loading
    const noUserPostList = (<p>To save your mood, press the button below.</p>);

    return (
      <article className="gridy">
        <section className="gridy">
          <h1 className="just-center">Your moods</h1>
          <section className="flexy">
            { this.state.userPosts ? userPostList : noUserPostList }
          </section>
        </section>
        <section className="gridy">
          <h1 className="just-center">Everyone's moods</h1>
          <section className="flexy">
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
