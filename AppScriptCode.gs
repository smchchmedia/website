// used only as GoogleAppScript to retrieve photos from google drive
var folderlinks = [];
var mimetypes = ["image/png","image/jpeg","image/jpg","image/bmp"];

function doGet(e) {

  var fid ="1RUnQrbeRGlIwrX7AYmx_mObCiFx-NkNe";
  console.log(fid);
  var data = travseItems(fid);
  return   buildSuccessResponse(data, 1);
  
}


function travseItems(folderid){
 var folder = DriveApp.getFolderById(folderid);
 var subFolders = folder.getFolders();  
  var x=0;
  
  while(subFolders.hasNext()){
    
    var subFolderFile = subFolders.next();

    var subfolderId = subFolderFile.getId()
    console.log(subfolderId+"\n\n");
    var subFolder = DriveApp.getFolderById(subfolderId);
    var files = subFolder.getFiles()
    var folderLink = {};
    folderLink['folder_id'] = subfolderId;
    folderLink['folder_name'] = subFolder.getName();
    var imageFiles = [];
    console.log(folderLink['folder_name']+"\n\n");

    while(files.hasNext()){
      var file = files.next();

      if( mimetypes.indexOf(file.getMimeType()) != -1) { 
          
        var imageFile ={};
        imageFile['img_id']=file.getId();
      
        console.log(imageFile['img_id']+"\n\n");
        imageFiles.push(imageFile);
      }
      
    }
    folderLink['image_files'] = imageFiles
    folderlinks.push(folderLink);

  }  //is file
 
  return folderlinks;
}


function buildSuccessResponse(posts, pages) {
  var output = JSON.stringify({
    status: 'success',
    data: posts,
    pages: pages
  });
  
  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
}