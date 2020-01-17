var lengthPictures = 25;
var description = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];
var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Функция для генерации рандома между min и max
var randomInteger = function ( min, max ) {
  var rand = min - 0.5 + Math.random() * ( max - min + 1 );
  rand = Math.round(rand);
  return rand;
}

// Функция для генерации массива картинок
var generatePictures = function ( picCol ) {
  var pictures = [];
  var colComments = randomInteger(1,10);
  var commentaries = [];

  for ( var i = 1; i <= picCol; i++ ) {
    pictures[i] = {
      url: 'photos/'+i+'.jpg',
      likes: randomInteger(15, 200),
      comments: [],
      description: description[randomInteger(0, description.length-1)]
    };

    for ( var j = 0; j < colComments; j++ ) {
      commentaries[j] = comments[randomInteger(0, comments.length-1)]+' '+comments[randomInteger(0, comments.length-1)];
    }

    pictures[i].comments = commentaries;
  }

  return pictures;
};

// Подготовка к манипуляциям со списком картиночек
var picturesArray   = generatePictures(lengthPictures);
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictureBox      = document.querySelector('.pictures');
var items           = document.createDocumentFragment();


// Цикл для наполнения .pictures
for ( var i = 1; i < picturesArray.length; i++ ) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picturesArray[i].url;
  pictureElement.querySelector('.picture__likes').textContent = picturesArray[i].likes;
  pictureElement.querySelector('.picture__comments').textContent = picturesArray[i].comments.length;

  items.appendChild(pictureElement);
}

pictureBox.appendChild(items);



// попап .big-picture с одним изображением
var bigPicture = document.querySelector('.big-picture');

// Функция для работы с этим попапом
var showBigPicture = function () {
  var socialCommentsList = bigPicture.querySelector('.social__comments');
  var items              = document.createDocumentFragment();

  // открываем попап с первой фоткой и добавляем ему всякое из П.4
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = picturesArray[1].url;
  bigPicture.querySelector('.likes-count').textContent = picturesArray[1].likes;
  bigPicture.querySelector('.comments-count').textContent = picturesArray[1].comments.length;
  bigPicture.querySelector('.social__caption').textContent = picturesArray[1].description;

  // Добавляем комментарии в этот попап
  for ( var j = 0; j < picturesArray[1].comments.length; j++ ) {
    var li  = document.createElement('li');
    var img = document.createElement('img');
    var p   = document.createElement('p');

    li.classList.add('social__comment');
    li.classList.add('social__comment--text');

    img.classList.add('social__picture');
    img.src = 'img/avatar-'+randomInteger(1,6)+'.svg';
    img.alt = 'Аватар комментатора фотографии';
    img.width = 35;
    img.height = 35;

    p.classList.add('social__text');
    p.textContent = picturesArray[1].comments[j];

    li.appendChild(img);
    li.appendChild(p);

    items.appendChild(li);
  }

  socialCommentsList.appendChild(items);

  // П.5 прячем счетчики и загрузки новых комментариев
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
};

showBigPicture();
