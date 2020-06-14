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

    let commentHandles = document.createElement('div');
    commentHandles.className = 'comments__handles'
    block.appendChild(commentHandles);

    let del = document.createElement('button');
    del.className = 'comments__delete';
    del.setAttribute('value',param.id);
    del.innerText = 'Delete';
    commentHandles.appendChild(del);
    // commentsUnit.appendChild(del);

    let like = document.createElement('button');
    like.className = 'comments__like  fa fa-thumbs-up';
    like.setAttribute('value',param.id);
    // like.innerText = '  Like';
    commentHandles.appendChild(like);

    let likes = document.createElement('p');
    likes.className = 'comments__counter';
    likes.innerText = `${param.likes}`;
    commentHandles.appendChild(likes);
    

    container.prepend(commentsUnit);

    const delComment = document.querySelector('.comments__delete');
    delComment.addEventListener('click', function(event) {
        console.log(event.toElement.value);
        confirmDel();
    });

    const likeComment = document.querySelector('.comments__like');
    likeComment.addEventListener('click', function(event) {
        console.log(event.toElement.value);
        axios.put(`https://project-1-api.herokuapp.com/comments/${event.toElement.value}/like${myKey2}`)
            .then(res=>{
                getComments();
            })
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


const confirmDel = () => {
    let res = confirm("Are you sure you want to delete this comment?");
    if (res == true) {
        axios.delete(`https://project-1-api.herokuapp.com/comments/${event.toElement.value}${myKey2}`)
        .then(res=>{
            getComments();
        })
    }
}