angular.module('ILikeThis.recommendations', [])

.controller('RecController', function($scope, Globals) {
  $scope.recs = [{
      "tag": "Theme-Absurdist",
      "count": 2,
      "title": "Alice's Adventures in Wonderland",
      "type": "Books",
      "author": "[\"Lewis Carroll\"]",
      "bookImage": "http://pngimg.com/upload/book_PNG2111.png",
      "bookData": {
        "title": "Alice's Adventures in Wonderland",
        "director": [
          "Lewis Carroll"
        ],
        "publisher": "Allen Lane",
        "publishedDate": "2010-02-25",
        "industryIdentifiers": [
          {
            "type": "ISBN_10",
            "identifier": "184614339X"
          },
          {
            "type": "ISBN_13",
            "identifier": "9781846143397"
          }
        ],
        "readingModes": {
          "text": false,
          "image": false
        },
        "pageCount": 368,
        "printType": "BOOK",
        "averageRating": 3.5,
        "ratingsCount": 46,
        "maturityRating": "NOT_MATURE",
        "allowAnonLogging": false,
        "contentVersion": "preview-1.0.0",
        "language": "en",
        "previewLink": "http://books.google.com/books?id=yFEwkgEACAAJ&dq=Alice+in+Wonderland&hl=&cd=1&source=gbs_api",
        "infoLink": "http://books.google.com/books?id=yFEwkgEACAAJ&dq=Alice+in+Wonderland&hl=&source=gbs_api",
        "canonicalVolumeLink": "http://books.google.com/books/about/Alice_s_Adventures_in_Wonderland.html?hl=&id=yFEwkgEACAAJ",
        "largeImage": "http://pngimg.com/upload/book_PNG2111.png",
        "type": "Movies"
      },

    }]

  // $scope.recs = Globals.returnRecs()
})

