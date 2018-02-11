const HOST = 'http://localhost:3000';
const PATH = '/blogs';

const form = document.getElementById('blog-form');
const resultCreating = document.getElementById('result-creating');
const resultListBlogs = document.getElementById('result-list-blogs');
const resultBlogWithId = document.getElementById('result-blog-with-id');
const resultEditing = document.getElementById('result-editing');
const resultDeleting = document.getElementById('result-deleting');
const getBlogsButton = document.getElementById('get-blogs-button');
const getBlogButton = document.getElementById('get-blog-with-id-button');
const postBlogButton = document.getElementById('post-blog-button');
const authorInputPut = document.getElementById('author-input-put');
const titleInputPut = document.getElementById('title-input-put');
const dateInputPut = document.getElementById('date-input-put');
const authorInputPost = document.getElementById('author-input-post');
const titleInputPost = document.getElementById('title-input-post');
const dateInputPost = document.getElementById('date-input-post');
const idInputPut = document.getElementById('id-input-put');
const idInputGet = document.getElementById('id-input-get');
const idInputDelete = document.getElementById('id-input-delete');
const editBlogButton = document.getElementById('edit-blog-button');
const deleteBlogButton = document.getElementById('delete-blog-button');

const successHandler = ({ element, message }) => {
  element.innerHTML = message;
  element.className = 'alert alert-success';
}

const errorHandler = ({ element, message }) => {
  element.innerHTML = message;
  element.className = 'alert alert-danger';
}

const hideList = (e) => {
  const list = document.getElementById('list-of-blogs');
  resultListBlogs.removeChild(list);
  resultListBlogs.removeChild(e.target);
}

const renderList = () => {
  fetch(`${HOST}${PATH}/list`)
  .then(resp => resp.json())
  .then(blogs => {
    const div = document.createElement("div");
    div.id = 'list-of-blogs';
    blogs.forEach(blog => {
      div.appendChild(document.createTextNode(JSON.stringify(blog)));
      resultListBlogs.appendChild(div);
    })
    const hideButton = document.createElement("button");
    hideButton.className = 'btn btn-primary';
    hideButton.innerHTML = 'Hide blogs';
    resultListBlogs.appendChild(hideButton);
    hideButton.addEventListener('click', hideList);
  })
  .catch(err => {
    errorHandler({ element: resultListBlogs, message: `No blogs yet` })
  });
}

getBlogsButton.addEventListener('click', renderList);

const renderBlogWithId = () => {
  resultBlogWithId.innerHTML = '';
  resultBlogWithId.classList.remove('alert-danger');

  fetch(`${HOST}${PATH}/${idInputGet.value}`)
  .then(resp => resp.json())
  .then(blog => {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(JSON.stringify(blog)));
    resultBlogWithId.appendChild(div);
  })
  .catch(err => {
    errorHandler({ element: resultBlogWithId, message: `No blogs with id = ${idInputGet.value}` })
  });
}

getBlogButton.addEventListener('click', renderBlogWithId);

const postBlog = () => {
  resultCreating.innerHTML = '';
  resultCreating.classList.remove('alert-success', 'alert-danger');

  const blog = {
    title: titleInputPost.value,
    author: authorInputPost.value,
    published: dateInputPost.value,
  };
  fetch(`${HOST}${PATH}`, {
    method: 'POST',
    body: JSON.stringify(blog),
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
  })
  .then(() => {
    successHandler({ element: resultCreating, message: 'Blog added to the collection' })
  })
  .catch(e => {
    errorHandler({ element: resultCreating, message: `${e}` })
  });
};

postBlogButton.addEventListener('click', postBlog);

const editBlog = () => {
  resultCreating.innerHTML = '';
  resultCreating.classList.remove('alert-success', 'alert-danger');
  const blog = {
    title: titleInputPut.value,
    author: authorInputPut.value,
    published: dateInputPut.value,
  };
  fetch(`${HOST}${PATH}/${idInputPut.value}`, {
    method: 'PUT',
    body: JSON.stringify(blog),
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
  })
  .then(() => {
    successHandler({ element: resultEditing, message: `Blog with id = ${idInputPut.value} updated` })
  })
  .catch((e) => {
    errorHandler({ element: resultEditing, message: `id = ${idInputPut.value} does not exist` })
  })
}

editBlogButton.addEventListener('click', editBlog);

const deleteBlog = () => {
  fetch(`${HOST}${PATH}/${idInputDelete.value}`, {
    method: 'DELETE',
  })
  .then(() => {
    successHandler({ element: resultDeleting, message: `Blog with id = ${idInputDelete.value} deleted` })
  })
  .catch(e => {
    errorHandler({ element: resultDeleting, message: `id = ${idInputDelete.value} does not exist` })
  });
};

deleteBlogButton.addEventListener('click', deleteBlog);
