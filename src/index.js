const imageContainerEl = document.querySelector(".image-container");

const state = {
	images: []
};

// SERVER FUNCTIONS

function getImages() {
	return fetch("http://localhost:3000/images").then((resp) => resp.json()); // Promise<images>
}

// RENDER FUNCTIONS
function renderImage(image) {
	const articleEl = document.createElement("article");
	articleEl.setAttribute("class", "image-card");

	const titleEl = document.createElement("h2");
	titleEl.setAttribute("class", "title");
	titleEl.textContent = image.title;

	const imgEl = document.createElement("img");
	imgEl.setAttribute("class", "image");
	imgEl.setAttribute("src", image.image);

	const buttonsDiv = document.createElement("div");
	buttonsDiv.setAttribute("class", "likes-section");

	const likesEl = document.createElement("span");
	likesEl.setAttribute("class", "likes");
	likesEl.textContent = `${image.likes} likes`;

	const likeBtn = document.createElement("button");
	likeBtn.setAttribute("class", "like-button");
	likeBtn.textContent = "♥";

	buttonsDiv.append(likesEl, likeBtn);

	const commentsList = document.createElement("ul");
	commentsList.setAttribute("class", "comments");

	for (const comment of image.comments) {
		const commentLi = document.createElement("li");
		commentLi.textContent = comment.content;
		commentsList.append(commentLi);
	}

	const commentForm = document.createElement("form");
	commentForm.setAttribute("class", "comment-form");

	const commentInput = document.createElement("input");
	commentInput.setAttribute("class", "comment-input");
	commentInput.setAttribute("type", "text");
	commentInput.setAttribute("name", "comment");
	commentInput.setAttribute("placeholder", "Add a comment...");

	const commentBtn = document.createElement("button");
	commentBtn.setAttribute("class", "comment-button");
	commentBtn.setAttribute("type", "submit");
	commentBtn.textContent = "Post";

	commentForm.append(commentInput, commentBtn);

	articleEl.append(titleEl, imgEl, buttonsDiv, commentsList, commentForm);
	imageContainerEl.append(articleEl);
}

function renderImages() {
	imageContainerEl.innerHTML = "";
	for (const image of state.images) {
		renderImage(image);
	}
}

function render() {
	renderImages();
}

render();
getImages().then(function (images) {
	state.images = images;
	render();
});
