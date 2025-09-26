document.addEventListener('DOMContentLoaded', function () {
    const postContainer = document.querySelector('.postContainer');

    function createPost(post) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <div class="post-header">
                <img src="${post.avatar}" alt="${post.user}'s avatar">
                <span>${post.user}</span>
            </div>
            <div class="post-content">${post.content}</div>
            <div class="post-actions">
                <button type="button" class="like"><i class="fa-regular fa-heart"></i> Like</button>
                <button type="button" class="comment"><i class="fa-solid fa-comment"></i> Comment</button>
                <button type="button" class="share"><i class="fa-solid fa-paper-plane"></i> Share</button>
            </div>
        `;
        return postElement;
    }

    async function loadPosts() {
        try {
            const response = await fetch('/api/posts'); // haalt van jouw server
            const posts = await response.json();

            posts.forEach(post => {
                postContainer.appendChild(createPost(post));
            });
        } catch (err) {
            console.error("Kon posts niet laden:", err);
        }
    }

    loadPosts();
});
