const tabletMediaQuery = window.matchMedia('screen and (max-width: 574px)'); //tablet media query
const desktopMediaQuery = window.matchMedia('screen and (min-width: 900px)'); //desktop media query
const main = document.querySelector('main'); //Main tag selector


///////////////////////////////////Functions//////////////////////////////////////////////////////

//Hide the delete and edit container if the user has less than 574px while editing a comment/reply
const deleteAndEditContainerResponsive = (the_container) => {
  if (tabletMediaQuery.matches) {
    the_container.style = "display: none !important";
  }
}


//Render default comments from JSON file or LocalStorage
const renderComments = (comments) => {
  comments.forEach((element, index) => { //For each comment

    const div = document.createElement("div"); //Create a div
    div.classList.add('comment-div'); //Mark the div as a comment
    div.classList.add("card");
    div.classList.add("position-relative");
    div.dataset.index = `${element.id}`; //Add id


    div.innerHTML = `
    <!--Comment user data-->
    <div class="user-data d-flex align-items-center gap-3 col-lg-8">
  <img class="profile-picture" src="${element.user.image.webp}" alt="profile picture">
  <span class="username">${element.user.username}</span>
  <span class="created-at">${element.createdAt}</span>
  </div>

    <!--Comment content-->
  <p class="comment comment-${element.id}">${element.content}
  </p>

  <!--Comment score-->
  <div class="comment-score d-flex align-items-center justify-content-between">
  <img class="plus-sign" src="./images/icon-plus.svg" alt="plus">
  <span class="score-number">${element.score}</span>
  <img class="minus-sign"src="./images/icon-minus.svg" alt="minus">
  </div>

  <!--Comment reply button-->
  <div class="reply-button-container d-flex align-items-center">
  <img class="reply-button" src="./images/icon-reply.svg" alt="reply button">
  <a href="#!" data-index-reply=${comments[index].id}>Reply</a>
 </div>
  
`;


    main.appendChild(div); //Append to main


  });

}


//Upvote comment functionality
const upvoteComment = (score_selector) => {
  const plusSign = document.querySelectorAll("img.plus-sign"); //Select all the plus signs
  const minusSign = document.querySelectorAll('img.minus-sign'); //Select all the minus signs


  plusSign.forEach((sign, index) => { //For each plus sign img
    let wasUpvoted = false; //set wasUpvoted as false

    let score = Number(score_selector[index].textContent); //Convert comment score textContent to Number
    sign.addEventListener('click', function upvote(ev) { //Upvote func
      //Apply filter to image
      sign.style = "filter: brightness(0) saturate(100%) invert(42%) sepia(74%) saturate(556%) hue-rotate(200deg) brightness(73%) contrast(93%);";
      //Remove minusSign img style
      minusSign[index].style = " ";
      if (wasUpvoted === false) { // if wasUpvoted flag === false
        score++; //Increment score
        score_selector[index].textContent = score; //Update with the new score

        wasUpvoted = true; //Set flag true

        sign.removeEventListener('click', upvote); //Remove the upvote event

      }
      sign.addEventListener('click', function cancelUpvote() { //Cancel upvote func
        sign.style = " "; //Remove styling
        minusSign[index].style = " "; //Remove styling
        if (wasUpvoted === true) { //if flag is true
          score--; //Decrement score
          score_selector[index].textContent = score; //Update with the new score
          wasUpvoted = false; //Set flag to false

          sign.removeEventListener('click', cancelUpvote); //Remove cancel upvote func
          sign.addEventListener('click', upvote); //Add upvote function back (for toggling)
        }

      })


    })
  })

}


//Downvote comment functionality
const downvoteComment = (score_selector) => {
  const minusSign = document.querySelectorAll('img.minus-sign'); //Select all the plus signs
  const plusSign = document.querySelectorAll("img.plus-sign"); //Select all the minus signs
  minusSign.forEach((sign, index) => {  //For each minus sign img
    let wasDownvoted = false; //set wasDownvoted flag as false

    let score = Number(score_selector[index].textContent); //Convert comment score textContent to Number

    //Downvote funct
    sign.addEventListener('click', function downvote() {
      //Apply filter to image
      sign.style = "filter: brightness(0) saturate(100%) invert(42%) sepia(74%) saturate(556%) hue-rotate(200deg) brightness(73%) contrast(93%);";
      //Remove plus sign img style
      plusSign[index].style = " ";
      if (wasDownvoted === false) { //If flag is false
        score--; //Decrement score

        score_selector[index].textContent = score; //Update score
        wasDownvoted = true; //Set flag true

        sign.removeEventListener('click', downvote); //Remove downvote function

      }


      //Add cancel downvote function
      sign.addEventListener('click', function cancelDownvote() {
        sign.style = " "; //Remove styling
        plusSign[index].style = " "; //Remove styling
        if (wasDownvoted === true) { //If flag is true
          score++; //Increment score back

          score_selector[index].textContent = score; //Update score
          wasDownvoted = false; //set flag false

          sign.removeEventListener('click', cancelDownvote); //Remove cancel Downvote funct
          sign.addEventListener('click', downvote); //Add downvote func back

        }
      })


    })

  })

}




//Styling on hover function for rendered default (old) comments
const deleteStylingOldComments = (delete_selector) => {
  delete_selector.forEach((container, index) => { //For each container that has both of Edit and Delete containers
    const trashBin = document.querySelectorAll(".delete > img"); //Select the Delete image
    const deleteLink = document.querySelectorAll(".delete > a"); //Selct the Delete link
    container.addEventListener('mouseenter', () => { //On mouse enter
      /*Apply filters*/
      trashBin[index].style = "filter: brightness(0) saturate(100%) invert(85%) sepia(88%) saturate(7056%) hue-rotate(289deg) brightness(104%) contrast(104%);";//add filter
      deleteLink[index].style = "color:var(--primary-pale-red);";
    })

    container.addEventListener('mouseleave', (ev) => { //On mouse leave
      /*Remove filters*/
      trashBin[index].style = "";//filter
      deleteLink[index].style = "color:var(--primary-soft-red);";
    })

  })
}



//Styling on hover function for newly inserted comments and replies
const deleteStylingNewComments = (delete_selector) => {
  delete_selector.forEach((container, index) => {
    const trashBin = document.querySelectorAll('.delete-new > img');
    const deleteLink = document.querySelectorAll(".delete-new > a");
    container.addEventListener('mouseenter', () => {

      trashBin[index].style = "filter: brightness(0) saturate(100%) invert(85%) sepia(88%) saturate(7056%) hue-rotate(289deg) brightness(104%) contrast(104%);";//add filter
      deleteLink[index].style = "color:var(--primary-pale-red);";
    })

    container.addEventListener('mouseleave', (ev) => {

      trashBin[index].style = "";//filter
      deleteLink[index].style = "color:var(--primary-soft-red);";
    })

  })
}


//Edit styling and functionality for rendered default (old) comments
const editSelectorStyling_Functionality_OldComments = (edit_selector) => {
  edit_selector.forEach((container, index) => { //For each Edit container
    const pencilImage = document.querySelectorAll(".edit > img");
    const editLink = document.querySelectorAll(".edit > a");

    container.addEventListener('mouseenter', () => {
      pencilImage[index].style = "filter: brightness(0) saturate(100%) invert(79%) sepia(29%) saturate(532%) hue-rotate(201deg) brightness(100%) contrast(88%);";
      editLink[index].style = "color:var(--primary-light-grayish-blue);";

    })

    container.addEventListener('mouseleave', () => {
      pencilImage[index].style = "";
      editLink[index].style = "color:var(--primary-moderate-blue);";


    })
    /*Styling*/


    /*When the user clicks on the Edit*/
    container.addEventListener('click', (evt) => {
      const comment_html = evt.currentTarget.parentNode.parentNode.children[1]; //Nearest comment selector
      let comment_text = evt.currentTarget.parentNode.parentNode.children[1].textContent; //Nearest comment text

      const card_reply_selector = evt.currentTarget.parentNode.parentNode; //Parent div selector
      let textarea = `<textarea class="form-control update-com">${comment_text}</textarea>`; //Create a text area and add the comment text inside it

      comment_html.insertAdjacentHTML('afterend', textarea); //Insert the textarea
      card_reply_selector.style = "bottom: unset; top: unset;"; //Unset bottom and top for parent
      comment_html.style = "display: none"; //Hide the comment


      const delete_edit_selector = evt.currentTarget.parentNode; //Delete + edit container selector
      delete_edit_selector.style = "bottom: unset; top: 20px;"; //Move the container to top

      const updateButton = document.createElement('div'); //Create the Update button
      updateButton.classList.add('update-btn-container'); //Add specific class
      updateButton.style = "bottom: 13px;" //Set the button bottom
      updateButton.innerHTML = `<button type="button" class="btn">UPDATE</button>`;//Update btn html
      card_reply_selector.appendChild(updateButton); //Append the Update button to the parent div

      deleteAndEditContainerResponsive(delete_edit_selector);
      //Add responsive delete and edit container (eg. so that the container doesn't overlap with the text on smaller screens)


      /*When the user clicks on Update*/
      updateButton.addEventListener('click', (ev) => {
        const text_area = ev.currentTarget.parentNode.children[2]; //Nearest textarea selector
        let reply_comm_text = ev.currentTarget.parentNode.children[1]; //Comment text - hidden
        const span_text = reply_comm_text.children[0]; //Replying to span
        const card_reply = ev.currentTarget.parentNode; //Card selector

        let span_created_at = ev.currentTarget.parentNode.children[0].children[3]; //Created at

        let user_data = ev.currentTarget.parentNode.children[0]; //User data selector



        //If the repying to is not undefined and textarea contains the @someuser text
        if (span_text != undefined && text_area.value.includes(span_text.textContent)) {
          let textWithoutUser = text_area.value.replace(`${span_text.textContent}`, '');
          /*Get the textarea text but without the @someuser 
          so that it doesn't append to the comment each time the btn is clicked*/

          /*Update the comment text*/
          reply_comm_text.innerHTML = `<span class="replying-to">${span_text.textContent}</span>${textWithoutUser}`;
          text_area.style = "display: none"; //Hide the textarea
          reply_comm_text.style = "display: unset"; //Show the edited comment

          card_reply.removeChild(text_area); //Remove textarea from card
          card_reply.removeChild(updateButton); //Remove updateBtn from card
          delete_edit_selector.style = "top: unset; bottom: 23px;"; //Move the edit and edit container to original position

          /*Add edited text reminder*/
          if (!user_data.textContent.includes('Edited')) {
            const edited_span = document.createElement("span");
            edited_span.style = "color: var(--neutral-grayish-blue); text-decoration: underline;";
            edited_span.innerText = 'Edited';
            span_created_at.insertAdjacentElement('afterend', edited_span);
          }


        }
        else if (span_text == undefined) { //If the span selector ev.target is different than the one defined, do the same thing 

          reply_comm_text.innerHTML = `${text_area.value}`;
          text_area.style = "display: none";
          reply_comm_text.style = "display: unset";
          card_reply.removeChild(text_area);
          card_reply.removeChild(updateButton);
          delete_edit_selector.style = "top: unset; bottom: 23px;";
          if (!user_data.textContent.includes('Edited')) {
            const edited_span = document.createElement("span");
            edited_span.style = "color: var(--neutral-grayish-blue); text-decoration: underline;";
            edited_span.innerText = 'Edited';
            span_created_at.insertAdjacentElement('afterend', edited_span);
          }

        }


      })


    })




  })

}

/*New comments/replies edit container hover effect*/
const editNewStyling = (edit_selector) => {
  edit_selector.forEach((container, index) => {
    const pencilImage = document.querySelectorAll(".edit-new > img");
    const editLink = document.querySelectorAll(".edit-new > a");

    container.addEventListener('mouseenter', () => {
      pencilImage[index].style = "filter: brightness(0) saturate(100%) invert(79%) sepia(29%) saturate(532%) hue-rotate(201deg) brightness(100%) contrast(88%);";
      editLink[index].style = "color:var(--primary-light-grayish-blue);";

    })
    container.addEventListener('mouseleave', () => {
      pencilImage[index].style = "";
      editLink[index].style = "color:var(--primary-moderate-blue);";


    })
  })
}



/*Edit functionality but for inserted comments/replies*/
const editNewFunctionality = (edit_new_single, comment_new, edit) => {

  edit_new_single.addEventListener('click', (evt) => {//The specific new Edit container to attach the event listener

    /*The specific comment selector*/
    const comment_html = document.querySelector(`${comment_new}` + CSS.escape(evt.currentTarget.parentNode.children[1].id.replace(`${edit}`, "")));
    comment_html.style = "display: none"; //Hide the comment

    let comment_text = comment_html.textContent/*edit_btn.closest('div.reply').querySelector('p.content').textContent;*/ 


    const card_reply_selector = evt.currentTarget.parentNode.parentNode;  //Reply card

    let textarea = `<textarea class="form-control update-com">${comment_text}</textarea>`; //Textarea

    comment_html.insertAdjacentHTML('afterend', textarea); //Insert textarea

    card_reply_selector.style = "bottom: unset; top: unset;"; //Unset top and bottom
    const delete_edit_selector = evt.currentTarget.parentNode; //
    delete_edit_selector.style = "bottom: unset; top: 20px;";

    const updateButton = document.createElement('div'); //Create update btn
    updateButton.classList.add('update-btn-container');
    updateButton.style = "bottom: 13px;"
    updateButton.innerHTML = `<button type="button" class="btn">UPDATE</button>`;
    card_reply_selector.appendChild(updateButton); //Append update btn

    deleteAndEditContainerResponsive(delete_edit_selector); //Show or hide the Delete Edit container based on viewport



    updateButton.addEventListener('click', (ev) => { //Update btn functionality
      const text_area = ev.currentTarget.parentNode.children[2]; //Textarea
      const reply_comm_text = ev.currentTarget.parentNode.children[1]; //Reply comment
      const card_reply = ev.currentTarget.parentNode; //Reply card
      const span_created_at = ev.currentTarget.parentNode.children[0].lastElementChild; //Created at
      const user_data = ev.currentTarget.parentNode.children[0]; //User data div
      let updatebtn = ev.currentTarget.parentNode.children[4]; //Update btn
    

      reply_comm_text.innerHTML = `${text_area.value}`; //Reply comment gets the textarea text
      text_area.style = "display: none"; //Hide textarea
      reply_comm_text.style = "display: unset"; //Show modified reply comment

      card_reply.removeChild(text_area); //Remove textarea
      ev.currentTarget.parentNode.removeChild(ev.currentTarget.parentNode.children[4]); //Remove update button from card; for some reason it does not work properly with updatebtn variable
      delete_edit_selector.style = "top: unset; bottom: 23px;"; //Place edit delete container back bottom

      /*Add edited tag*/
      if (!user_data.textContent.includes('Edited')) {
        const edited_span = document.createElement("span");
        edited_span.style = "color: var(--neutral-grayish-blue); text-decoration: underline";
        edited_span.innerText = 'Edited';
        span_created_at.insertAdjacentElement('afterend', edited_span);
      }



    })


  })

}



/*Modal*/
const Modal = (delete_selector, main) => {
  const dialog = document.createElement('div');
  const background = document.createElement('div');
  delete_selector.forEach(elem => {
    elem.addEventListener('click', (event) => { //For each delete container elem, onclick
      background.classList.add('background'); //Add modal background

      dialog.classList.add('dialog'); //Add dialog class


      dialog.innerHTML = `<p class="title">Delete comment?</p>
      <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
      <div class="d-flex justify-center align-items-center">
      <button class="cancel" value="cancel-delete">NO, CANCEL</button>
      <button class="delete-modal-button" value="delete-comment">YES, DELETE</button>
      </div>
   
      `;
      dialog.classList.add('d-flex');
      dialog.classList.add("flex-column")
      dialog.style = "display: unset;";
      background.style = "display: unset;";



      background.appendChild(dialog); //Append dialog to background
      main.appendChild(background); //Append background to main

      if (document.querySelectorAll('.dialog')) { //If there are elements with dialog class

        const cancel = document.querySelectorAll('.cancel'); //Select all cancel btns
        const deleteCommentModal = document.querySelectorAll('.delete-modal-button'); //Select all delete comment btn from the modal
        cancel.forEach(button => { //For each canel btn
          button.addEventListener('click', (ev) => { //On click, remove the modal
            const background = document.querySelector('.background');
            const dialog = document.querySelector(".dialog");
            dialog.style = "";
            background.style = "";
            background.style = "display: none";
            dialog.style = "display: none";
            background.removeChild(dialog);
            main.removeChild(background);
          })
        })

        deleteCommentModal.forEach(button => { //For each delete comment btn from modal
          button.addEventListener('click', (delete_event) => {//On click
            const background = document.querySelector(".background");
            const dialog = document.querySelector('.dialog');
            /*Hide and remove modal*/ 
            dialog.style = "";
            background.style = "";
            background.style = "display: none";
            dialog.style = "display: none";
            background.removeChild(dialog);
            main.removeChild(background);


            /*Remove comment/reply based on it's closest parent (either comment or reply)*/
            if (event.target.closest('div.comment-div')) {
              main.removeChild(event.target.closest('div.comment-div'));
            } else if (event.target.closest('div.reply')) {
              main.removeChild(event.target.closest('div.reply'));
            }

          })
        })

      }

    })
  })

}

/*Delete + Modal functionality but for new comments/replies */
const deleteCommentFunctionality = (delete_new_single, dialog, background) => {

  delete_new_single.addEventListener('click', (event) => {


    background.classList.add('background');

    dialog.classList.add('dialog');


    dialog.innerHTML = `<p class="title">Delete comment?</p>
  <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
  <div class="d-flex justify-center align-items-center">
  <button class="cancel" value="cancel-delete">NO, CANCEL</button>
  <button class="delete-modal-button" value="delete-comment">YES, DELETE</button>
  </div>

  `;
    dialog.classList.add('d-flex');
    dialog.classList.add("flex-column")
    dialog.style = "display: unset;";
    background.style = "display: unset;";



    background.appendChild(dialog);
    main.appendChild(background);


    if (document.querySelector('.dialog')) {

      const cancel = document.querySelector('.cancel');
      const deleteCommentModal = document.querySelector('.delete-modal-button');

      cancel.addEventListener('click', (ev) => {
        const background = document.querySelector('.background');
        const dialog = document.querySelector(".dialog");
        dialog.style = "";
        background.style = "";
        background.style = "display: none";
        dialog.style = "display: none";
        background.removeChild(dialog);
        main.removeChild(background);
      })



      deleteCommentModal.addEventListener('click', (delete_event) => {
        const background = document.querySelector(".background");
        const dialog = document.querySelector('.dialog');
        dialog.style = "";
        background.style = "";
        background.style = "display: none";
        dialog.style = "display: none";
        background.removeChild(dialog);
        main.removeChild(background);


        if (event.target.closest('div.comment-div')) {
          main.removeChild(event.target.closest('div.comment-div'));
          newCommentCounter--; //Decrement comments no.
        } else if (event.target.closest('div.reply')) {
          main.removeChild(event.target.closest('div.reply'));
          newReplyCounter--; //Decrement replies no.
        }

      })


    }

  })

}






let newCommentCounter = 0; //Set inserted comments no. to 0
const createNewComment = (textarea, insertcomment, comments_d) => { //Create new comment function
  if (textarea.value != '') { //Allow the user to enter comment as long as the textarea is not empty

    const createdAtNow = 'Now'; //Created at Now

    const div = document.createElement('div'); //Create div

    let dataIndex = document.querySelectorAll('[data-index]'); //Select all the comments and replies's data-index attribute

    let dataIndexKeys = Object.keys(dataIndex)[dataIndex.length - 1];//Get the last element's key
    let dataIndexId_number = Number(dataIndexKeys); //Convert to number

    const score = 0; //Comment score set to 0 by default

    div.innerHTML = `
    <!--New comment-->
<div class="comment-div card position-relative" data-index=${(dataIndexId_number + 1)}>

<!--User data-->
<div class="user-data d-flex align-items-center gap-3 col-lg-8">
  <img class="profile-picture" src="${comments_d.currentUser.image.webp}" alt="profile picture">
  <span class="username">${comments_d.currentUser.username}</span>
  <span class="you-div">you</span>
  <span class="created-at">${createdAtNow}</span>
  </div>

  <!--Comment content-->
  <p id="comment-new-${newCommentCounter}"class="comment">${textarea.value}
  </p>
  <!--Comment score-->
  <div class="comment-score d-flex align-items-center justify-content-between">
  <img class="plus-sign" src="./images/icon-plus.svg" alt="plus">
  <span class="score-number score-number-new">${score}</span>
  <img class="minus-sign"src="./images/icon-minus.svg" alt="minus">
  </div>
  
  <!--Delete-edit container-->
  <div class="delete-edit-container d-flex align-items-center">
  <!--Delete container-->
  <div id="delete-${newCommentCounter}" class="delete d-flex align-items-center gap-1 delete-new">
  <img src="./images/icon-delete.svg" alt="delete comment">
  <a class="delete-button" href="#!">Delete</a>
  </div>
  <!--Edit container-->
  <div id="edit-${newCommentCounter}"class="edit d-flex align-items-center gap-1 edit-new">
  <img src="./images/icon-edit.svg" alt="edit comment">
  <a class="edit-button" href="#!">Edit</a>
  </div>

  </div>

  </div>`
      ;



    insertcomment.insertAdjacentHTML('beforebegin', div.innerHTML); //Insert before the comment insert div


    const delete_new_comments = document.querySelectorAll('div.delete-new'); //Select new Delete containers
    const edit_new_comments = document.querySelectorAll('div.edit-new'); //Select new Edit containers
    deleteStylingNewComments(delete_new_comments); //Add hover effect to Delete containers
    editNewStyling(edit_new_comments); //Add hover effect to Edit containers



    const dialog = document.createElement('div'); //Dialog
    const background = document.createElement('div'); //Dialog's background
    const delete_new_single = document.querySelector("#delete-" + CSS.escape(newCommentCounter)); //Select the newest comment's delete container
    const edit_new_single = document.querySelector("#edit-" + CSS.escape(newCommentCounter)); //Select the newest comment's edit container
    const score_selector = document.querySelectorAll('.score-number'); //Comment score selector


    deleteCommentFunctionality(delete_new_single, dialog, background); //Delete comment + Modal functionality
    editNewFunctionality(edit_new_single, "#comment-new-", "edit-"); //Edit comment functionality
    upvoteComment(score_selector); //Upvote comment func
    downvoteComment(score_selector); //Downvote comment func
    newCommentCounter++; //Increase new comment counter
    textarea.value = ''; //Reset the textarea value

  } else {
    alert('Enter a valid comment!'); //Display a simple alert when the user tries to enter an empty comment
  }

}



let newReplyCounter = 0; //Set inserted replies no. to 0
const insertReply = (btn) => { //Insert reply functionality
  btn.addEventListener('click', (ev) => { //Add button click event
    const p = document.createElement('p');
    p.classList.add('content');
    const textar = ev.currentTarget.parentNode.parentNode.parentNode.children[0].value; //Text area selector
    if (textar != undefined) {

      const replying_to = ev.currentTarget.parentNode.parentNode.parentNode.children[0].textContent.split(",");//Replying to text, to be inserted later into span
      const the_div = ev.currentTarget.parentNode.parentNode.parentNode; //The reply div
      let data_index_id = Array.from(document.querySelectorAll('[data-index]')); //All the comments&replies

      let arr = []; //Array for storing the index numbers

      /*Get the index number and push it into array*/
      const constructArray = (data_index) => {
        data_index.forEach((el, index) => { //for each item
          arr.push(data_index[index].getAttribute('data-index')); //push into arr
        })
      }

      constructArray(data_index_id); //call the function


      let max = arr.reduce(function (a, b) { //Find the maximum
        return Math.max(a, b);
      }, -Infinity);


      the_div.setAttribute('data-index', ++max); //Set reply data-index attribute to ++max
      the_div.classList.add('position-relative');
      the_div.classList.add('card');
      the_div.classList.add('reply');


      the_div.innerHTML = `
      <!--User data-->
      <div class="user-data d-flex align-items-center gap-3"> 
      <img class="profile-picture" src="./images/avatars/image-juliusomo.webp" alt="profile picture">
      <span class="username">juliusomo</span><span class="you-div">you</span>
      <span class="created-at">Now</span>
      </div>

      <!--Reply content-->
      <p id="reply-new-${newReplyCounter}" class="content">
      <span class="replying-to">${replying_to[0]}</span>${textar.replace(`${replying_to[0]}`, "")}
      </p>

      <!--Reply score-->
      <div class="comment-score d-flex align-items-center justify-content-between">
      <img class="plus-sign" src="./images/icon-plus.svg" alt="plus">
      <span class="score-number">0</span><img class="minus-sign" src="./images/icon-minus.svg" alt="minus">
      </div>

      <!--Delete-edit container that has both delete and edit containers inside-->
      <div class="delete-edit-container d-flex align-items-center">
      <!--Delete container-->
      <div id="delete-reply-${newReplyCounter}" class="delete d-flex align-items-center gap-1 delete-new">
      <img src="./images/icon-delete.svg" alt="delete comment">
      <a class="delete-button" href="#!">Delete</a>
      </div>


      <!--Edit container-->
      <div id="edit-reply-${newReplyCounter}" class="edit d-flex align-items-center gap-1 edit-new">
      <img src="./images/icon-edit.svg" alt="edit comment">
      <a class="edit-button" href="#!">Edit</a>
      </div>

      <!--End of reply-->
      </div>`;


      the_div.classList.remove('insert-reply'); //Insert reply class (temporary);
      the_div.classList.remove('is-reply'); //This class will force the reply card to have a smaller width than the comment card



      const delete_new_comments = document.querySelectorAll('div.delete-new'); //Select all new delete buttons
      const edit_new_comments = document.querySelectorAll('div.edit-new'); //Select all new edit butons
      const delete_new_single = document.querySelector("#delete-reply-" + CSS.escape(newReplyCounter)); //Select the newly created Delete button
      const edit_new_single = document.querySelector("#edit-reply-" + CSS.escape(newReplyCounter)); //Select the newly created Edit button
      const score_selector = document.querySelectorAll(".score-number"); //Select all the comment scores
      const dialog = document.createElement('div'); //Dialog
      const background = document.createElement('div'); //Dialog's background

      deleteStylingNewComments(delete_new_comments); //Add hover effect to new Delete buttons
      editNewStyling(edit_new_comments); //Add edit effect to new Edit buttons

      editNewFunctionality(edit_new_single, "#reply-new-", "edit-reply-"); //Add Edit button functionality
      deleteCommentFunctionality(delete_new_single, dialog, background); //Add Delete button functionality + Modal
      upvoteComment(score_selector); //Upvote functionality
      downvoteComment(score_selector); //Downvote functionality

      newReplyCounter++; //Increase the no. of replies



    }
    else if (textar == undefined) { // If ev.currentTarget.parentNode.parentNode.parentNode.children[0].value does not exist (eg. different elements in the card);
      const textarrMobile = ev.currentTarget.parentNode.parentNode.children[0].value;
      const replying_to = ev.currentTarget.parentNode.parentNode.children[0].textContent.split(",");
      const the_div = ev.currentTarget.parentNode.parentNode;
      let data_index_id = Array.from(document.querySelectorAll('[data-index]')); //All the comments&replies

      let arr = []; //Array for storing the index numbers

      /*Get the index number and push it into array*/
      const constructArray = (data_index) => {
        data_index.forEach((el, index) => { //for each item
          arr.push(data_index[index].getAttribute('data-index')); //push into arr
        })
      }

      constructArray(data_index_id); //call the function


      let max = arr.reduce(function (a, b) { //Find the maximum
        return Math.max(a, b);
      }, -Infinity);


      the_div.setAttribute('data-index', ++max); //Set reply data-index attribute to ++max
      the_div.classList.add('position-relative');
      the_div.classList.add('card');
      the_div.classList.add('reply');
      the_div.innerHTML = `
      <!--User data-->
      <div class="user-data d-flex align-items-center gap-3"> 
      <img class="profile-picture" src="./images/avatars/image-juliusomo.webp" alt="profile picture">
      <span class="username">juliusomo</span><span class="you-div">you</span>
      <span class="created-at">Now</span>
      </div>


      <!--New reply content-->
      <p id="reply-new-${newReplyCounter}" class="content">
      <span class="replying-to">${replying_to[0]}
      </span>${textarrMobile.replace(`${replying_to[0]}`, "")}
      </p>

      <!--Reply score-->
      <div class="comment-score d-flex align-items-center justify-content-between">
      <img class="plus-sign" src="./images/icon-plus.svg" alt="plus">
      <span class="score-number">0</span>
      <img class="minus-sign" src="./images/icon-minus.svg" alt="minus">
      </div>

      <!--Delete-edit container-->
      <div class="delete-edit-container d-flex align-items-center">

      <!--Delete container-->
      <div id="delete-reply-${newReplyCounter}" class="delete d-flex align-items-center gap-1 delete-new">
      <img src="./images/icon-delete.svg" alt="delete comment">
      <a class="delete-button" href="#!">Delete</a></div>

      <!--Edit container-->
      <div id="edit-reply-${newReplyCounter}" class="edit d-flex align-items-center gap-1 edit-new">
      <img src="./images/icon-edit.svg" alt="edit comment">
      <a class="edit-button" href="#!">Edit</a>
      </div>

      </div>`;


      the_div.classList.remove('insert-reply');
      the_div.classList.remove('is-reply'); //This class will force the reply card to have a smaller width than the comment card


      const delete_new_comments = document.querySelectorAll('div.delete-new');//Select all new delete buttons
      const edit_new_comments = document.querySelectorAll('div.edit-new'); //Select all new edit butons
      const delete_new_single = document.querySelector("#delete-reply-" + CSS.escape(newReplyCounter)); //Select the newly created Delete button
      const edit_new_single = document.querySelector("#edit-reply-" + CSS.escape(newReplyCounter)); //Select the newly created Edit button
      const dialog = document.createElement('div'); //Dialog
      const background = document.createElement('div'); //Dialog's background

      deleteStylingNewComments(delete_new_comments); //Add hover effect to new Delete buttons
      editNewStyling(edit_new_comments);  //Add edit effect to new Edit buttons

      editNewFunctionality(edit_new_single, "#reply-new-", "edit-reply-"); //Add edit functionality
      deleteCommentFunctionality(delete_new_single, dialog, background); //Add delete + modal functionality
       upvoteComment(score_selector); //Upvote functionality
      downvoteComment(score_selector); //Downvote functionality
      newReplyCounter++; //Increase no. of new replies

    }
  })
}




//Reply functionality
const replyToComment = (reply_button_container, data) => {

  reply_button_container.forEach(btn => { //For each btn inside reply container (eg. image and text)

    //On click
    btn.addEventListener('click', (ev) => {
 
      const comment_select = ev.currentTarget.parentNode; //Comment selector

      const comment_select_username = ev.currentTarget.parentNode.children[0].children[1].textContent; //Username selector

      const contains_reply_class = comment_select.classList.contains('reply'); //Checks if the comment has the class "reply"


      const replyCard = document.createElement('div'); //Creat reply card
      replyCard.classList.add('card');
      replyCard.classList.add('insert-reply');
      replyCard.classList.add('position-relative');

      const replyCard_index_no = ev.currentTarget.parentNode.getAttribute('data-index'); //Get the parent's data-index attribute


      const responsiveReply = (replyCard, comment_select) => {

        if (contains_reply_class == true) { //Checks if the comment has the class "reply"
          replyCard.classList.add('is-reply'); //Apply reply styling - aka shorter width than the comment
        }

        if (desktopMediaQuery.matches) { //Reply card gets this HTML structure on desktop

          replyCard.innerHTML = `
         
          <textarea class="form-control reply-textarea" placeholder="Add a comment...">@${comment_select_username}, </textarea>
        <div>
        <div class="position-absolute">
        <img class="profile-picture" src="${data.currentUser.image.webp}" alt="profile picture">
        </div>
        <div class="position-absolute button-send">
    
        <button type="button" id="reply-new-${replyCard_index_no}" class="btn">REPLY</button>
        </div></div>
        </div>
    
          `;


          comment_select.insertAdjacentElement('afterend', replyCard); //Insert reply after comment


        }

        else if (!desktopMediaQuery.matches) {// Reply card gets this HTML structure on mobile

          replyCard.innerHTML = `
        <textarea class="form-control" placeholder="Add a comment..." >@${comment_select_username}, </textarea>
        <div class="d-flex align-items-center justify-content-between"><img class="profile-picture" src="${data.currentUser.image.webp}">
          <button type="button" id="reply-new-${replyCard_index_no}" class="btn">REPLY</button></div>
          
    `;

          comment_select.insertAdjacentElement('afterend', replyCard); //Insert reply after comment

        }
        const reply_id_select = document.querySelector('#reply-new-' + CSS.escape(replyCard_index_no)); //Select the reply button
        insertReply(reply_id_select); //Add functionality to it
      }


      responsiveReply(replyCard, comment_select); //Responsive reply card


    })

  })
}


/*Gets all the replies associated with the comments*/
const replyChecker = (comments) => {

  let data_index_divs = Array.from(document.querySelectorAll("[data-index]")); //Select all comments/replies data-index attribute
  let username = Array.from(document.querySelectorAll(".username")); //Select all users
  const div = document.createElement("div"); //Create reply


  for (let i = 0; i < comments.length; i++) { //for each comment
    for (let j = 0; j < comments[i].replies.length; j++) {//for each reply
      for (let k = 0; k < username.length; k++)//for each user
        if (comments[i].replies[j] != undefined &&
          comments[i].replies[j].replyingTo.includes(username[k].textContent)) {
          //If there are replies that point to the current user
          /*Append reply to corresponding user comment card*/
          div.innerHTML = `

          <!--Reply-->
          <div class="reply card position-relative" data-index="${comments[i].replies[j].id}">

          <!--User data-->
          <div class="user-data d-flex align-items-center gap-3"> 
          <img class="profile-picture" src="${comments[i].replies[j].user.image.webp}" alt="profile picture">
          <span class="username">${comments[i].replies[j].user.username}</span>
          <span class="created-at">${comments[i].replies[j].createdAt}</span>
          </div>

          <!--Reply content-->
          <p class='content reply-${comments[i].replies[j].id}'><span class="replying-to">@${comments[i].replies[j].replyingTo}</span> ${comments[i].replies[j].content}
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

          const insertReplyDefault = (div) => { //Insert replies function
            data_index_divs[k].insertAdjacentHTML('afterend', div.innerHTML); //Insert the reply right after the comment
            const updateUsers = () => { //Update no. of users
              username = Array.from(document.querySelectorAll('.username')); //Update no. of users so that it doesn't skip him on the next loop
            }

            const updateDataIndex = () => {
              data_index_divs = Array.from(document.querySelectorAll("[data-index]")); //Update no of. replies/comments with data-index attribute
            }

            updateUsers(); //Call updateUsers()
            updateDataIndex(); //Call updateDataIndex()

          }

          insertReplyDefault(div); //Insert replies


        }

    }

  }
}




/*Get current user and insert YOU div and Edit + Delete buttons on each comment/reply of his*/
const getCurrentUser = (comments_data) => {
  const username = document.querySelectorAll(".username");
  const you_div = document.createElement("div");
  const data_indexes = document.querySelectorAll("[data-index]");
  const reply_container = document.querySelectorAll(".reply-button-container");

  data_indexes.forEach((elem, index) => {
    if (elem.innerHTML.includes(`<span class=\"username\">${comments_data.currentUser.username}</span>`)) {
      const delete_edit_container = document.createElement("div");
      elem.removeChild(reply_container[index]);
      delete_edit_container.classList.add("delete-edit-container");
      delete_edit_container.classList.add("d-flex");
      delete_edit_container.classList.add("align-items-center");
      delete_edit_container.innerHTML = `<div class="delete d-flex align-items-center gap-1"><img src="./images/icon-delete.svg" alt="delete comment"><a class="delete-button" href="#!">Delete</a></div><div class="edit d-flex align-items-center gap-1"><img src="./images/icon-edit.svg" alt="edit comment"><a class="edit-button" href="#!">Edit</a></div>`;
      elem.appendChild(delete_edit_container);

    }
  })

  username.forEach(user => {
    if (comments_data.currentUser.username === user.textContent) {
      you_div.innerHTML = "<span class='you-div'>you</span>";
      user.insertAdjacentHTML('afterend', you_div.innerHTML);
    }


  })



}



/*Different insert comment container based on viewport*/
const responsiveCommentInsertContainer = (data, container) => {


  if (!desktopMediaQuery.matches) {
    container.innerHTML = `
    <textarea class="form-control" placeholder="Add a comment..." id="main-textarea"></textarea>
    <div class="d-flex align-items-center justify-content-between"><img class="profile-picture" src="${data.currentUser.image.webp}" alt="profile picture"><button type="button" id="send" class="btn">SEND</button>`;
    main.appendChild(container);
  }
  else if (desktopMediaQuery.matches) {
    container.innerHTML = `
    <textarea class="form-control" placeholder="Add a comment..." id="main-textarea"></textarea>
    <div>
    <div class="position-absolute">
    <img class="profile-picture" src="${data.currentUser.image.webp}" alt="profile picture">
    </div>
    <div class="position-absolute button-send">

    <button type="button" id="send" class="btn">SEND</button>
    </div>`;

    main.appendChild(container);
  }


}

///////////////////////////////////Functions//////////////////////////////////////////////////////






//////////////////////////////////Main App///////////////////////////////////////////////////////
//Fetch data
const fetchData = async () => {
  /*
   if(localStorage.getItem('state')){
    ////////////////////
   } else 
   */
  const fetch_data = await fetch('./data.json'); //fetch
  const response = await fetch_data.json(); //await json
  let data = response;


  return new Promise((resolve, reject) => {
     //if(localStorage.getItem('state')){
  /////resolve(state)
  /////reject('Oops! Resource not found!');
  // } else{

    resolve(data);
   
    reject('Oops! Resource not found!');

  })

}



const createApp = async (fetchedJson) => {


  let comments_data = await fetchedJson; //await data
  let comments = comments_data.comments;

  //console.table(comments_data);


  renderComments(comments); //Render comments
  replyChecker(comments); //Append coresponding comments
  getCurrentUser(comments_data); //Get current user

  /*Add insert comment container*/
  const addCommentContainer = () => {
    const comment_container = document.createElement("div");
    comment_container.classList.add("insert-comment");
    comment_container.classList.add("card");

    comment_container.classList.add("position-relative");

    responsiveCommentInsertContainer(comments_data, comment_container);


  }

  addCommentContainer();


  /*Add event listeners*/

  const addEventListeners = () => {
    const delete_selector = document.querySelectorAll(".delete");
    const edit_selector = document.querySelectorAll(".edit");
    const reply_buttons = document.querySelectorAll('.reply-button-container');
    const send = document.querySelector("#send");
    const main_textarea = document.querySelector("#main-textarea");
    const insertcomment = document.querySelector(".insert-comment");
    const score_number = document.querySelectorAll('.score-number');

    const a = document.querySelectorAll("a");

    //Create a new comment when SEND button is pressed
    send.addEventListener('click', function () { createNewComment(main_textarea, insertcomment, comments_data) });

    /*Create a new comment on Enter key*/
    main_textarea.addEventListener('keyup', function onInsert(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        createNewComment(main_textarea, insertcomment, comments_data);
      }
    })
    
    
    main_textarea.addEventListener('click', (ev)=>{
      main_textarea.focus();
    })



    replyToComment(reply_buttons, comments_data); //Reply functionality


    deleteStylingOldComments(delete_selector); //Hover effect for delete btns
    Modal(delete_selector, main); //Initialize modal functionality
    editSelectorStyling_Functionality_OldComments(edit_selector); //Edit functionality


    upvoteComment(score_number); //Upvote functionality
    downvoteComment(score_number); //Downvote func





    a.forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault(); //Prevent links from scrolling to the top of the page after clicking
      })
    })
    //Responsive insert comment container on load
    window.addEventListener('DOMContentLoaded', function () { responsiveCommentInsertContainer(comments_data, document.querySelector('.insert-comment')) });
    //Responsive insert comment container on resize
    window.addEventListener('resize', function () { responsiveCommentInsertContainer(comments_data, document.querySelector('.insert-comment')) })


  }

  addEventListeners();



  /*Save state in LocalStorage just before the user leaves the page*/
  window.addEventListener('beforeunload', () => {
    const comment_div = document.querySelectorAll('.comment-div');
    const data_index = document.querySelectorAll('.comment-div[data-index]');
    const user = document.querySelectorAll('.comment-div .user-data')

    const p_comment_div = document.querySelectorAll('.comment-div p');
    const reply = document.querySelectorAll('reply');
    const createdAt = document.querySelectorAll('.comment-div span.created-at');
    const score = document.querySelectorAll('.comment-div .score-number');
    comment_div.forEach((comment, id) => {
      let comments_obj = JSON.stringify({
        "comments": [
          {
            "id": data_index[id].getAttribute('data-index'),
            "content": p_comment_div[id].textContent,
            "createdAt": createdAt[id].textContent,
            "score": score.textContent,

            "user": {
              "image": {
                "webp": `./images/avatars/image-${user[id].children[1].textContent}.webp`
              },
              "username": user[id].children[1].textContent
            },
            "replies": []
          }
        ]

      });

     // window.localStorage.setItem(`test-${id}`, comments_obj);

    })
    
  })

}


const fetched_DTA = fetchData(); //Get the Json data
createApp(fetched_DTA); //Create App

//////////////////////////////////Main App///////////////////////////////////////////////////////






