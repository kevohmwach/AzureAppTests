var PDF_URL  = 'example2.pdf';
let pageContent = "";
//var finalString = "";
//var textItems = "";

/**
* Retrieves the text of a specif page within a PDF Document obtained through pdf.js 
 * 
 * @param {Integer} pageNum Specifies the number of the page 
 * @param {PDFDocument} PDFDocumentInstance The PDF document obtained 
 **/

function myFunction() {
    getPages();
}

function getPages(){
    //getItems(i);
    //console.log(getItems(1));

    //var pages =0;
    //PDFJS.getDocument(PDF_URL).then(function (PDFDocumentInstance) {
    pdfjsLib.getDocument(PDF_URL).promise.then(function (PDFDocumentInstance) {
         var totalPages = PDFDocumentInstance.numPages;
         var startPage = 1;

         for(let i=startPage; i<=totalPages; i++){
            getItems(i);
            //console.log(getItems(i));
        }
        // Extract the text
    }, function (reason) {
        // PDF loading error
        document.getElementById("demo").innerHTML = reason;
        console.error(reason);
    });
}

function getPageText(pageNum, PDFDocumentInstance) {
    // Return a Promise that is solved once the text of the page is retrieven
    return new Promise(function (resolve, reject) {
        PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
            // The main trick to obtain the text of the PDF page, use the getTextContent method
            pdfPage.getTextContent().then(function (textContent) {

                var textItems = textContent.items;
                var finalString = "";
                textItems = textContent.items;
                // Concatenate the string of the item to the final string
                for (var i = 0; i < textItems.length; i++) {
                    var item = textItems[i];
                    finalString += item.str + " ";
                }
                //if(pageNum%2==0){
                    resolve(finalString);
                    //console.log('ytuyiuooiouiuiyy');
                    
                //}
                //else{getPageText(pageNum+1, PDFJS.getDocument(PDF_URL).then());}
                // Solve promise with the text retrieven from the page
                //resolve(finalString);
                //console.log(finalString);
            });
        });
    });
}


function getItems(page){

    //var PDF_URL  = 'example1.pdf';
    //return new Promise(function (resolve, reject) {
        pdfjsLib.getDocument(PDF_URL).promise.then(function (PDFDocumentInstance) {
        //PDFJS.getDocument(PDF_URL).then(function (PDFDocumentInstance) {

            var totalPages = PDFDocumentInstance.numPages;
            var pageNumber = page;
            //var doc = new jsPDF('p', 'mm', 'a4');

            // Extract the text
            getPageText(pageNumber , PDFDocumentInstance).then(function(textPage){
                // Show the text of the page in the console
                //pageContent  =  textPage + pageContent;
                //console.log(textPage);
                
                //return pageContent;
                //saveDocument(textPage,pageNumber);
                //finalString  = "";
                //var finalString  = "";
                //resolve('textPage');
                pageContent += textPage+ " ";
                if(page%1==0){
                    saveDocument(pageContent,pageNumber);
                    pageContent = " ";
                }


            });

        //}, function (reason) {
            // PDF loading error
           // document.getElementById("demo").innerHTML = reason;
            //console.error(reason);
        //});
        //console.log(pageContent);
    });
    
}

function saveDocument(textPage, pageNumber){
    
    //pageContent  =  textPage + pageContent;
    //pageContent += textPage + " ";
    //*
    //if(pageNumber%2==0){
        var doc = new jsPDF('p', 'mm', 'a4');
        //var splitTitle = doc.splitTextToSize(textPage, 270);
        var splitTitle = doc.splitTextToSize(textPage, 270);
        var pageHeight = doc.internal.pageSize.height;
        doc.setFontType("normal");
        doc.setFontSize("11");
        var y = 7;
        for (var j = 0; j < splitTitle.length; j++) {                
            if (y > 280) {
                y = 10;
                doc.addPage();
            }
            doc.text(15, y, splitTitle[j]);
            y = y + 7;
        }
        //pageContent  = "";
        doc.save('1.pdf');
        //var finalString  = "";
        console.log(pageContent);
        //pageContent  = "";
    //}else{
        //pageContent  =  textPage + pageContent;
        //console.log(pageContent);
    //}//*/
    //console.log(pageContent);
    //console.log(pageNumber);
}