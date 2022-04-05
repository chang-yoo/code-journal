/* global data */
/* exported data */

var $form = document.querySelector('form');

var $defaultImage = document.querySelector('.default-image');

var $url = document.querySelector('#journal-URL');

$url.addEventListener('input', function updateImage(event) {
  var newImage = $form.elements.photo.value;
  $defaultImage.setAttribute('src', newImage);
});

var $title = document.querySelector('#journal-title');
var $notes = document.querySelector('#journal-notes');
$title.addEventListener('input', handleInput);
$notes.addEventListener('input', handleInput);

function handleInput(event) {
}

var datas = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

function handleSubmit(event) {
  event.preventDefault();
  var $titleValue = $form.elements.title.value;
  var $photoValue = $form.elements.photo.value;
  var $notesValue = $form.elements.notes.value;
  var dataValue = {
    title: $titleValue,
    photo: $photoValue,
    notes: $notesValue,
    nextEntryId: datas.nextEntryId
  };
  datas.nextEntryId++;
  datas.entries.unshift(dataValue);
  $defaultImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}

$form.addEventListener('submit', handleSubmit);

window.addEventListener('beforeunload', function storage(event) {
  var JSONData = JSON.stringify(datas.entries);
  localStorage.setItem('datas', JSONData);
});
