let commentArray = [
    {
        name: "Micheal Lyons",
        comment: "They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed",
        date: "12/18/2018"
    },
    {
        name: "Gary Wong",
        comment: "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!",
        date: "12/12/2018"
    },
    {
        name: "Theodore Duncan",
        comment: "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!",
        date: "11/15/2018"
    },
];

const addComment = () => {
    let dateNow = new Date();
    let comment = {
        name: document.getElementById('txtName').value,
        comment: document.getElementById("txtComment").value,
        date: `${dateNow.getMonth()+1}/${dateNow.getDate()}/${dateNow.getFullYear()}`
    };
    displayComment(comment);
}
const processComment = () => {
    console.log(commentArray);
    let content = "";
    commentArray.forEach((comment) => 
    {
        content += parseContent(comment); 
    });
    document.querySelector('.comments').innerHTML = content;
}
const displayComment = (comment) => {
    document.querySelector('.comments').innerHTML = parseContent(comment) + document.querySelector('.comments').innerHTML;
}
const parseContent = (comment) => {
    return `<div class="comments__unit">
                <div class=comments__pic-wrapper>
                    <div class="comments__pic"></div>
                </div>
                <div class="comments__block">
                    <div class="comments__bio">
                        <h3 class="comments__name">${comment.name}</h2>
                        <p class="comments__date">${comment.date}</p>
                    </div>
                    <p class="comments__text">${comment.comment}</p>
                </div>
            </div>`; 
}