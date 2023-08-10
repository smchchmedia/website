const file_path =  "./data/event_list.json"

function next(){
    count++;
    if(count >= photos.length){
        count = 0;
        imgTag.src = photos[count];
    }else{
        imgTag.src = photos[count];
    }
}

function prev(){
    count--;
    if(count < 0){
        count = photos.length -1;
        imgTag.src = photos[count];
    }else{
        imgTag.src = photos[count];
    }
}

fetch(file_path)
.then((response) => response.json())
.then((out) => {
    let eventList = out.events
    eventList.map(function(event) {

    });

})
.catch(function(error) {
    console.log(error);
});
