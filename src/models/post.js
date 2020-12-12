const url = `http://localhost:4000/api/v1`;

class PostModel {
    static all = () => {
        return fetch(`${url}/post/`)
            .then(res => res.json());
    };

    static userPosts = () => {
        return fetch(`${url}/post/userPosts`)
            .then(res => res.json());
    };

    static create = (postInfo) => {
        return fetch(`${url}/post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(postInfo)
        })
            .then(res => res.json());
    };

    static show = (postId) => {
        return fetch(`${url}/post/${ postId }`)
            .then(res => res.json());
    };

    static update = (postId, postInfo) => {
        return fetch(`${url}/post/${ postId }`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(postInfo)
        })
            .then(res => res.json());
    };

    static destroy = (postId) => {
        return fetch(`${url}/post/${ postId }`, {
            method: "DELETE"
        });
    };
};

export default PostModel;