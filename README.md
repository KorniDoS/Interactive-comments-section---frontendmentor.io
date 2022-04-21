# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.


### Screenshot

![](.images/screenshots/screenshot.png)

### Links

- Solution URL: [Frontend mentor solution](https://www.frontendmentor.io/solutions/interactive-comments-section-using-vanilla-js-jquery-and-bootstrap-rJDPu6AV5)
- Live Site URL: [Interactive comments section](https://interactive-comments-kornidos.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla Javascript
- [jQuery](https://jquery.com) - Javascript framework
- [Bootstrap](https://getbootstrap.com/) - CSS framework


### What I learned

- When to use event.target vs event.currentTarget
- How to find the closest parent using closest();
- How to find the closest matching selector with jQuery prevAll().first()
- How to use data-* attributes
- How to use parentNode/children property
- How to render comments dynamically from the json file
- How to dynamically generate a json file
- How to use LocalStorage


```js
/*Gets all the replies associated with the comments*/
const replyChecker = (comments) => {
  let data_index_divs = Array.from(document.querySelectorAll("[data-index]")); //Select all comments/replies data-index attribute
  let username = Array.from(document.querySelectorAll(".username")); //Select all users
  let comment_div = document.querySelectorAll('.comment-div');
  const div = document.createElement("div"); //Create reply

  for (let i = 0; i < comments.length; i++) {
    //for each comment
    for (let j = 0; j < comments[i].replies.length; j++) {
      //for each reply
      for (
        let k = 0;
        k < username.length;
        k++ //for each user
      )
        if (
          comments[i].replies[j] != undefined &&
          comments[i].replies[j].replyingTo.includes(username[k].textContent)
        ) {
          //If there are replies that point to the current user
          /*Append reply to corresponding user comment card*/

          div.innerHTML = `

          <!--Reply-->
          <div id="reply-${comments[i].replies[j].id}" class="reply card position-relative" data-index="${comments[i].replies[j].id}">

          <!--User data-->
          <div class="user-data d-flex align-items-center gap-3"> 
          <img class="profile-picture" src="${comments[i].replies[j].user.image.webp}" alt="profile picture">
          <span class="username">${comments[i].replies[j].user.username}</span>
          <span class="created-at">${comments[i].replies[j].createdAt}</span>
          </div>

          <!--Reply content-->
          <p class='content'><span class="replying-to">@${comments[i].replies[j].replyingTo}</span> ${comments[i].replies[j].content}
          </p>

          <!--Comment score-->
          <div class="comment-score d-flex align-items-center justify-content-between">
          <img class="plus-sign" src="./images/icon-plus.svg" alt="plus">
          <span class="score-number">${comments[i].replies[j].score}</span>
          <img class="minus-sign" src="./images/icon-minus.svg" alt="minus">
          </div>

          <!--Reply button-->
          <div class="reply-button-container d-flex align-items-center">
          <img class="reply-button" src="./images/icon-reply.svg" alt="reply-button">
          <a href="#!" data-index-reply=${comments[i].replies[j].id}>Reply</a>
          </div>
          </div>


          <!--End of reply-->
                  </div>
      `;

          const insertReplyDefault = (div) => {
            //Insert replies function

            data_index_divs[k].insertAdjacentHTML("afterend", div.innerHTML); //Insert the reply right after the comment
            const parent_comment_selector = $(`#reply-${comments[i].replies[j].id}`).prevAll('.comment-div').first(); //Get the closest comment (upwards)

            let parent_comment_selector_id = parent_comment_selector.attr('data-index'); //Get the data-index of the comment
            $(`#reply-${comments[i].replies[j].id}`).attr("data-parent", parent_comment_selector_id); //Add data-parent attribute (tells us who is the parent of this reply)



            const updateUsers = () => {
              //Update no. of users
              username = Array.from(document.querySelectorAll(".username")); //Update no. of users so that it doesn't skip him on the next loop
            };

            const updateDataIndex = () => {
              data_index_divs = Array.from(
                document.querySelectorAll("[data-index]")
              ); //Update no of. replies/comments with data-index attribute
            };

            updateUsers(); //Call updateUsers()
            updateDataIndex(); //Call updateDataIndex()
          };

          insertReplyDefault(div); //Insert replies
        }


    }
  }
};
}
```

### Continued development

  I would like to continue my development by learning Sass and React JS framework

### Useful resources
- [CSS color filter generator](https://angel-rs.github.io/css-color-filter-generator/) - Extremely good tool that helped me style the hover state for plus and minus sign images
- [MDN](https://developer.mozilla.org/en-US/) - Javascript documentation
- [Stackoverflow](https://stackoverflow.com/) - Javascript documentation, jQuery documentation

## Author

- Frontend Mentor - [@KorniDoS](https://www.frontendmentor.io/profile/KorniDoS)


