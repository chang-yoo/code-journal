/* global data */
/* exported data */

var $form = document.querySelector('form');

var $defaultImage = document.querySelector('.default-image');

var $url = document.querySelector('#journal-URL');

$url.addEventListener('input', function updateImage(event) {
  var newImage = $form.elements.photo.value;
  $defaultImage.setAttribute('src', newImage);
});

function handleSubmit(event) {
  event.preventDefault();
  var $titleValue = $form.elements.title.value;
  var $photoValue = $form.elements.photo.value;
  var $notesValue = $form.elements.notes.value;
  var dataValue = {
    title: $titleValue,
    photo: $photoValue,
    notes: $notesValue,
    nextEntryId: data.nextEntryId
  };
  data.entries.unshift(dataValue);
  data.nextEntryId++;
  $defaultImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}

$form.addEventListener('submit', handleSubmit);
