document.addEventListener('DOMContentLoaded', function () {
    const originalTitle = document.title;
    const postContainer = document.querySelector('.postContainer');
    let page = 1;
    let isLoading = false;

    // Mock data for posts (replace with API fetch later)
    const mockPosts = [
        { id: 1, user: 'User1', avatar: 'https://via.placeholder.com/40', content: 'This is a sample post about something interesting!' },
        { id: 2, user: 'User2', avatar: 'https://via.placeholder.com/40', content: 'Doomscrolling is addictive, isn’t it?' },
        { id: 3, user: 'User3', avatar: 'https://via.placeholder.com/40', content: 'Just saw a funny meme, check it out!' },
        // Add more mock posts as needed
    ];

    // Function to create a post element
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

    // Function to load posts
    function loadPosts() {
        if (isLoading) return;
        isLoading = true;

        // Simulate API delay
        setTimeout(() => {
            // Load 3 posts per page (adjust as needed)
            const start = (page - 1) * 3;
            const end = start + 3;
            const postsToLoad = mockPosts.slice(start, end);

            postsToLoad.forEach(post => {
                postContainer.appendChild(createPost(post));
            });

            // Increment page if more posts are available
            if (end < mockPosts.length) {
                page++;
            } else {
                // Optionally, stop loading or loop back
                page = 1; // Loop back to start for demo
            }
            isLoading = false;
        }, 1000); // Simulate network delay
    }

    // Infinite scroll detection
    postContainer.addEventListener('scroll', () => {
        if (postContainer.scrollTop + postContainer.clientHeight >= postContainer.scrollHeight - 50) {
            loadPosts();
        }
    });

    postContainer.addEventListener('click', function (e) {
    const button = e.target.closest('button');
    if (!button) return;

    if (button.classList.contains('like')) {
        button.classList.toggle('active');
        const icon = button.querySelector('i');
        icon.classList.toggle('fa-solid');
        icon.classList.toggle('fa-regular');
    }
});

    // Initial load
    loadPosts();

    // Title change on focus/blur
    window.onblur = function () {
        document.title = 'Come back!';
    };

    window.onfocus = function () {
        document.title = originalTitle;
    };
});

