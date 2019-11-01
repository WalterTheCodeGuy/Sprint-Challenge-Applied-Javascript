// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Stduy the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
//
// Create a card for each of the articles and add the card to the DOM.

const entryPointCards = document.querySelector('.cards-container');

axios.get('https://lambda-times-backend.herokuapp.com/articles')
  .then(response => {
    const allArticles = Object.values(response.data.articles).flat();
    allArticles.forEach(article => {
      entryPointCards.appendChild(createCard(article));
    });
    console.log(response);
    console.log(allArticles);
  })

  function createCard(data) {
    // Elements
    const card = document.createElement('div'),
          headline = document.createElement('div'),
          author = document.createElement('div'),
          imgBox = document.createElement('div'),
          img = document.createElement('img'),
          by = document.createElement('span');

    // Structure
    card.appendChild(headline);
    card.appendChild(author);
    author.appendChild(imgBox);
    imgBox.appendChild(img);
    author.appendChild(by);

    // Class Names
    card.classList.add('card');
    headline.classList.add('headline');
    author.classList.add('author');
    imgBox.classList.add('img-container');

    // Content
    img.src = `${data.authorPhoto}`;
    headline.textContent = `${data.headline}`;
    by.textContent = `${data.authorName}`;

    return card;
  }