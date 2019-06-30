### [107-2] Web Programming Final
### Team 18
### Project Name: quote-cookie
#### A sentence for describing this project: Searching your own quote by your own key word.
#### Deployment: https://quote-cookie.herokuapp.com
#### Installation from downloading the file from github:
##### Backend (in quote-cookie directory):
```
cd quote-backend
npm install
npm start
```
##### Front end:
```
git clone https://github.com/b05705019/quote-cookie.git
cd quote-cookie
cd fortune-quote-cookies
npm install
npm start
```
##### Note: backend will serve on port 3000, thus if terminal ask you to open the front end on another port just choose yes.
#### Pages and functions in this website:
1. live wall: a dynamic wall for showing key word that was searched by other people. 
2. login page: including JWT authentication with redux in front end, if you successfully logged in, you won't have to login again before you logout.
3. navigation page: navigate to QuoteSearch or PersonalPage
4. seaching page: type in a word about you or what you care, and click on the square button to search for a quote.
5. show page: 
  * Show the quote according to what you type in the searching page. 
  * Here I use a NLP function, NATURAL, of javascript in the backend, which can help find a similar quote for you.
  * You can erase the quote on the screen by the cursor, just for relax. Using canvas to complete this work.
  * click on the "like" or "dislike" button on the bottom right corner, to collect the quote to your collection or just give up the quote.
6. collection page: show your collection according to the category of the quote, hover the picture of the man in the left of the screen, and will show a function bar, click on the cross symbol, you can go to add quote page.
7. add quote page: type in the author name, quote content, and choose a category of the quote, click on the sealed button on the bottom right corner, and submit your own quote to the dataset. Notice: Whether you successfully added the quote will be shown on the bottom of the screen.

#### Reference:
1. JWT authentication - front end: https://reurl.cc/NMn7q
2. JWT authentication - backend: https://reurl.cc/Qqmvb

#### Gain knowledge:

#### Demo link:
