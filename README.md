## Quote-cookie
#### Description

This project, named "Quote cookie" is to practice how to use React.js with node.js, which is my first web project.

<img width="720" alt="Screen Shot 2021-05-12 at 12 32 59 AM" src="https://user-images.githubusercontent.com/33059448/117852237-b2990a00-b2b9-11eb-9d90-7ab3e116b9bb.png">

Quote cookie is a website provides people to get a personal quote according to any keyword that a user provides, the concept is from "Fortune cookie".

Quote cookie has been deployed to Heroku since 2019, and the link is: https://quote-cookie.herokuapp.com/.
Just use username: `test`, and password `test` to pass the login step.

There is also a demo video on youtube: https://youtu.be/6Q-Wb7VTKec (include feature demo and technical details)

Here is a simple use case: <br/>
Cindy is in a bad mood today, and she wants some words to cheer her up. 
She can visit this website and enter any keyword she want (for example again, she type coffee).
Then, Quote cookie would show her a related positive quote. 
Cindy can choose to collect the quote to her place or drop it, she can also chaeck out how many quotes did she collect.
Besides query quotes from quote cookie, Cindy can also write down her own quote to this system, and someone would get a quote which author is Cindy someday.

More development or feature details are listed below.

---

#### [107-2] Web Programming Final
#### Project Description - Team 18
* Project Name: quote-cookie
* A sentence for describing this project: Searching your own quote by your own key word.
* Deployment: https://quote-cookie.herokuapp.com (login ID: test, password: test)
* Installation from downloading the file from github:
  * Backend (in quote-cookie directory):
    ```
    cd quote-backend
    npm install
    npm start
    ```
  * Front end:
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
3. [Dataset](https://www.kaggle.com/akmittal/quotes-dataset)
#### Gain knowledge:
In this experience, front end did cost me a lot of time, especially live wall and show page. The UI design of both page was inspired by the google trend visualizer and a animal.cc. Although there are some information about how to showing text on canvas on the Internet, to turn them into react framework still needs a lot of time. Not to mention that there is no related code for live wall. To finish all of the job by myself is not easy, but after finish the project, I am sure that I've learned more than the midterm project. And the skills I learn this time includes redux, promise, and the process of authoentication in a react project, which must be helpful in the future. It is a very great experience to create a project and design, implement, and deploy only by my own, thanks to this course. 
