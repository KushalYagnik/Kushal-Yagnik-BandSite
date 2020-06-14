// let commentArray = [
//     {
//         name: "Micheal Lyons",
//         comment: "They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed",
//         date: "12/18/2018"
//     },
//     {
//         name: "Gary Wong",
//         comment: "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!",
//         date: "12/12/2018"
//     },
//     {
//         name: "Theodore Duncan",
//         comment: "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!",
//         date: "11/15/2018"
//     },
// ];


// const addComment = () => {
//     let dateNow = new Date();
//     let comment = {
//         name: document.getElementById('txtName').value,
//         comment: document.getElementById("txtComment").value,
//         date: `${dateNow.getMonth()+1}/${dateNow.getDate()}/${dateNow.getFullYear()}`
//     };
//     displayComment(comment);
// }
// const processComment = () => {
//     console.log(commentArray);
//     let content = "";
//     commentArray.forEach((comment) => 
//     {
//         content += parseContent(comment); 
//     });
//     document.querySelector('.comments').innerHTML = content;
// }
// const displayComment = (comment) => {
//     document.querySelector('.comments').innerHTML = parseContent(comment) + document.querySelector('.comments').innerHTML;
// }
// const parseContent = (comment) => {
//     return `<div class="comments__unit">
//                 <div class=comments__pic-wrapper>
//                     <div class="comments__pic"></div>
//                 </div>
//                 <div class="comments__block">
//                     <div class="comments__bio">
//                         <h3 class="comments__name">${comment.name}</h2>
//                         <p class="comments__date">${comment.date}</p>
//                     </div>
//                     <p class="comments__text">${comment.comment}</p>
//                 </div>
//             </div>`; 
// }


// >>>>>>>>>>>>>>>      NEW SCRIPT WITH API IMPLEMENTATION      <<<<<<<<<<<<<<<<<<<<
// let myKey = '?api_key=226c5472-44d6-4e27-afb5-4070724aba91';
// let commentArray = [];
// const getComments = () => {
//     axios.get('https://project-1-api.herokuapp.com/comments'+myKey)
//         .then(response => {
//             // console.log(response)
//             // console.log(response.data[0])
//             for(let i=0; i<response.data.length;i++){
//                 commentArray.push(response.data[i])                
//             }
//             // console.log(commentArray)
//             // console.log(commentArray[0].comment)
            
//         })
// }
// getComments()

const getKey = () => {
    axios.get('https://project-1-api.herokuapp.com/register')
        .then(res => {
            console.log(res);
        })
}

const myKey2 = "?api_key=a6ece6ac-e3b8-4849-a699-f9497aa4991e";
const myKey = '?api_key=226c5472-44d6-4e27-afb5-4070724aba91';
const container = document.querySelector('.comments__container');

let commentArray = [];

// Get APi comments
const getComments = () => {
    container.innerHTML = "";
    axios.get('https://project-1-api.herokuapp.com/comments'+myKey2)
        .then(response => {
            // console.log(response)
            // console.log(response.data[0])
            for(let i=0; i<response.data.length;i++){
                let param = response.data[i]
                commentArray.push(param)      
                parseComments(param)          
            }
            // console.log(commentArray)
            // console.log(commentArray[0].comment)
            
        })
}
getComments()


// Show API comments on page load
const parseComments = (param) => {
    let commentsUnit = document.createElement('div');
    commentsUnit.className = 'comments__unit';
    
    
    let picWrapper = document.createElement('div');
    picWrapper.className = 'comments__pic-wrapper';
    commentsUnit.appendChild(picWrapper);

    // <<< ACTIVATE THIS BLOCK IF IMAGE AVAILABLE >>>>
    let pic = document.createElement('img');
    // pic.setAttribute('src',param.image);
    pic.className = 'comments__pic';
    picWrapper.appendChild(pic);

    let block = document.createElement('div');
    block.className= 'comments__block';
    commentsUnit.appendChild(block);
    
    let bio = document.createElement('div');
    bio.className = 'comments__bio';
    block.appendChild(bio);

    let name = document.createElement('h3');
    name.className = 'comments__name';
    name.innerText = param.name;
    bio.appendChild(name);

    let date = new Date(param.timestamp).toDateString()
    let dateUnit = document.createElement('h3');
    dateUnit.className = 'comments__date';
    dateUnit.innerHTML = `${date}`;
    bio.appendChild(dateUnit);
    
    let comment = document.createElement('p');
    comment.className = 'comments__comment';
    comment.innerText = `${param.comment}`;
    block.appendChild(comment);

    // container.appendChild(commentsUnit);
    let likes = document.createElement('p');
    likes.className = 'comments__counter';
    likes.innerText = `${param.likes}`;
    commentsUnit.appendChild(likes);

    let del = document.createElement('button');
    del.className = 'comments__delete';
    del.setAttribute('value',param.id);
    del.innerText = 'Delete';
    commentsUnit.appendChild(del);

    let like = document.createElement('button');
    like.className = 'comments__like';
    like.setAttribute('value',param.id);
    like.innerText = 'Like';
    commentsUnit.appendChild(like);

    container.prepend(commentsUnit);

    const delComment = document.querySelector('.comments__delete');

    delComment.addEventListener('click',async function(event) {
        console.log(event.toElement.value);
        const response = await axios.delete(`https://project-1-api.herokuapp.com/comments/${event.toElement.value}${myKey2}`);
        getComments();
    });

    const likeComment = document.querySelector('.comments__like');

    likeComment.addEventListener('click',async function(event) {
        console.log(event.toElement.value);
        const response = await axios.put(`https://project-1-api.herokuapp.com/comments/${event.toElement.value}/like${myKey2}`);
        getComments();
    });



}



// Get form comments

const form = document.querySelector('.form');
form.addEventListener('submit',function(event){
    event.preventDefault();
    let fName = document.querySelector('.form__name').value;
    // console.log(fName);
    let fComm = document.querySelector('.form__comment').value;
    // console.log(fComm)
    if(fName && fComm){
        axios.post('https://project-1-api.herokuapp.com/comments'+myKey2,{
            name: `${fName}`,
            comment: `${fComm}`
        })
            .then(response => {
                // console.log(response);
                form.reset();
                parseComments(response.data);
                // location.reload();
            })        
    }
    else{
        alert("Please fill the form before submitting!")
    }
    
})
