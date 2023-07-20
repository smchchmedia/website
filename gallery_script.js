let gallery = document.getElementById("fh5co-gallery");
const folderlist = document.createDocumentFragment();
const url = "https://script.google.com/macros/s/AKfycbz6DkGEvI58ZTUN-TtmHyYavY8fF_hiXQfsYPimRZaERIMbUa-OF4ejiBUBE6hrXfcC/exec";
const image_url_prefix = "https://drive.google.com/uc?export=view&id="


let loaderBg = document.getElementById("loading-bg");

// showing loading
function displayLoading() {
    loaderBg.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loaderBg.classList.remove("display");
    }, 5000);
}

function hideLoading() {
    loaderBg.classList.remove("display");
}

displayLoading()
fetch(url, {
    redirect: "follow",
    method: "GET",
    headers: {
        "Content-Type": "text/plain;charset=utf-8",
    },
})
    .then((response) => {
        return response.json();
    })
    .then((out) => {
        let folders = out.data;
        hideLoading()
        console.log(out);
        folders.map(function(folder) {
            console.log(folder.folder_name);
            let folderRow = document.createElement('div');
            folderRow.classList.add("row")
            
            let folderDiv = document.createElement('div');
            folderDiv.classList.add("col-md-12");
            folderDiv.classList.add("col-md-offset-0");
            let folderName = document.createElement('h3');
            folderName.classList.add("gallery_header")
            folderName.innerHTML = `${folder.folder_name}`;
            folderDiv.appendChild(folderName)
            let photos = folder.image_files
            let mainImageDiv = document.createElement('div');
            mainImageDiv.classList.add("gallery");
            mainImageDiv.classList.add("current_image");
            let mainImageElement = document.createElement("img");
            mainImageElement.setAttribute("name", folder.folder_id)
            let firstPhoto = photos[0]
            mainImageElement.src = image_url_prefix+ firstPhoto.img_id;
            mainImageElement.alt = "Photo " + firstPhoto.img_id;
            mainImageDiv.appendChild(mainImageElement);
            folderDiv.appendChild(mainImageDiv);
            
            
            let imageThumbs = document.createElement('ul');
            imageThumbs.id = "carousel"

            photos.map(function(imageObject) {
                let imgItem = document.createElement("div");
                imgItem.classList.add("slide");
                let thumb = document.createElement("img");
                thumb.classList.add("thumb");
                thumb.src = image_url_prefix + imageObject.img_id;
                thumb.alt = "Photo " + imageObject.img_id;
                thumb.setAttribute("folder_id", folder.folder_id)
                thumb.addEventListener(
                    "click", function() {
                        let folderId = this.getAttribute("folder_id")
                        let mainElement= document.getElementsByName(folderId)[0]
                        mainImageElement.src = this.src;
                        mainImageElement.alt = this.alt;
                    }
                );
                imgItem.appendChild(thumb);
                imageThumbs.appendChild(imgItem);
            });
            folderDiv.appendChild(imageThumbs)

            folderRow.appendChild(folderDiv);

            folderlist.appendChild(folderRow)
        });

        
        gallery.appendChild(folderlist);

    })
    .catch(function(error) {
        console.log(error);
    });
