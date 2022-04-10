/* global data */
/* exported data */

var $form = document.querySelector('form');

var $defaultImage = document.querySelector('.default-image');

var $url = document.querySelector('#journal-URL');

var $title = document.querySelector('#journal-title');

var $note = document.querySelector('#journal-notes');

var $dataEntryId = data.nextEntryId;

$url.addEventListener('input', function updateImage(event) {
  var urlPhoto = $form.elements.photo.value;
  $defaultImage.setAttribute('src', urlPhoto);
});

function handleSubmit(event) {
  event.preventDefault();

  var $titleValue = $title.value;
  var $urlValue = $url.value;
  var $notesValue = $note.value;

  var dataValue = {
    title: $titleValue,
    photo: $urlValue,
    note: $notesValue,
    entryId: $dataEntryId
  };
  $dataEntryId++;
  data.entries.unshift(dataValue);
  $defaultImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  $ul.prepend(newEntries(dataValue));
  noEntry();
  entriesNav();
}
$form.addEventListener('submit', handleSubmit);

var $ul = document.querySelector('.entry-list');

function newEntries(object) {
  var $domList = document.createElement('li');
  $domList.setAttribute('class', 'domList row');
  $domList.setAttribute('data-entry-id', object.entryId);

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

  var $editDiv = document.createElement('div');
  $editDiv.setAttribute('class', 'flex-justify-end');
  $secondDiv.appendChild($editDiv);

  var $h1 = document.createElement('h1');
  $h1.textContent = object.title;
  $editDiv.appendChild($h1);

  var $i = document.createElement('i');
  $i.setAttribute('class', 'fa-solid fa-pencil');
  $editDiv.appendChild($i);

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

$ul.addEventListener('click', editForm);
function editForm(event) {
  if (event.target.tagName === 'I') {
    formNav();
    var $formTitle = document.querySelector('.form-title');
    $formTitle.textContent = 'Edit Entry';
    var editClicked = event.target.closest('li');
  }
  for (var i = 0; i < data.entries.length; i++) {
    var editGetEntryId = editClicked.getAttribute('data-entry-id');
    var editEntryId = data.entries[i].entryId;
    if (editGetEntryId === editEntryId.toString()) {
      data.editing = data.entries[i];
    }
  }
  $title.value = data.editing.title;
  $url.value = data.editing.photo;
  $note.value = data.editing.note;
  $defaultImage.setAttribute('src', data.editing.photo);
}

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
