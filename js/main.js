/* global data */
/* exported data */

var $form = document.querySelector('form');

var $defaultImage = document.querySelector('.default-image');

var $url = document.querySelector('#journal-URL');

$url.addEventListener('input', function updateImage(event) {
  var urlPhoto = $form.elements.photo.value;
  $defaultImage.setAttribute('src', urlPhoto);
});

function handleSubmit(event) {
  event.preventDefault();

  var $titleValue = $form.elements.title.value;
  var $urlValue = $form.elements.photo.value;
  var $notesValue = $form.elements.notes.value;
  var dataValue = {
    title: $titleValue,
    photo: $urlValue,
    note: $notesValue,
    nextEntryId: data.nextEntryId
  };
  data.entries.unshift(dataValue);
  data.nextEntryId++;
  $defaultImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  noEntry();
  entriesNav();
  $ul.prepend(newEntries(dataValue));
}
$form.addEventListener('submit', handleSubmit);

var $ul = document.querySelector('.entry-list');

function newEntries(object) {
  var $domList = document.createElement('li');
  $domList.setAttribute('class', 'domList row');

  var $firstDiv = document.createElement('div');
  $firstDiv.setAttribute('class', 'column-half');
  $domList.appendChild($firstDiv);

  var $img = document.createElement('img');
  $img.setAttribute('src', object.photo);
  $img.setAttribute('class', 'entry-image padding-left-none');
  $firstDiv.appendChild($img);

  var $secondDiv = document.createElement('div');
  $secondDiv.setAttribute('class', 'column-half');
  $domList.appendChild($secondDiv);

  var $h1 = document.createElement('h1');
  $h1.textContent = object.title;
  $secondDiv.appendChild($h1);

  var $p = document.createElement('p');
  $p.textContent = object.note;
  $secondDiv.appendChild($p);

  return $domList;
}

window.addEventListener('DOMContentLoaded', function loadEntries(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var entryValue = newEntries(data.entries[i]);
    $ul.prepend(entryValue);
  }
});

var $center = document.querySelector('.text-center');

function noEntry() {
  if (data.entries.length === 0) {
    $center.setAttribute('class', 'text-center');
  } else {
    $center.setAttribute('class', 'hidden');
  }
}

var $entrypage = document.querySelector('.entry');

var $formpage = document.querySelector('.form-yet-hidden');

function entriesNav() {
  $entrypage.className = 'container';
  $formpage.className = 'hidden';
  noEntry();
}

function formNav() {
  $entrypage.className = 'hidden';
  $formpage.className = 'not-hidden';
}

var $anchor = document.querySelector('a');

$anchor.addEventListener('click', entriesNav);

var $new = document.querySelector('.newBtn');

$new.addEventListener('click', formNav);
