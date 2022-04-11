/* global data */
/* exported data */

var $form = document.querySelector('form');

var $defaultImage = document.querySelector('.default-image');

var $url = document.querySelector('#journal-URL');

var $title = document.querySelector('#journal-title');

var $note = document.querySelector('#journal-notes');

var $dataEntryId = data.nextEntryId;

var $formTitle = document.querySelector('.form-title');

$url.addEventListener('input', function updateImage(event) {
  var urlPhoto = $url.value;
  $defaultImage.setAttribute('src', urlPhoto);
});

function handleSubmit(event) {
  event.preventDefault();

  if (data.editing === null) {
    var dataValue = {
      title: $title.value,
      photo: $url.value,
      note: $note.value,
      entryId: $dataEntryId
    };
    $dataEntryId++;
    data.entries.unshift(dataValue);
  } else if (data.editing !== null) {
    var editValue = {
      title: $title.value,
      photo: $url.value,
      note: $note.value,
      entryId: data.editing.entryId
    };
    var $allList = document.querySelectorAll('li');

    for (var i = 0; i < $allList.length; i++) {
      var allListEntryId = parseInt($allList[i].getAttribute('data-entry-id'));

      if (editValue.entryId === allListEntryId) {
        $allList[i].replaceWith(newEntries(editValue));
      }
    }
    data.editing = null;
  }
  $defaultImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
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

$ul.addEventListener('click', editEntries);
function editEntries(event) {
  if (event.target.tagName === 'I') {
    formNav();
    $formTitle.textContent = 'Edit Entry';
  }
  for (var i = 0; i < data.entries.length; i++) {
    var editLi = event.target.closest('li');
    var editGetEntryId = editLi.getAttribute('data-entry-id');
    var editEntryId = data.entries[i].entryId;
    if (parseInt(editGetEntryId) === editEntryId) {
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
  $formTitle.textContent = 'New Entry';
}

var $anchor = document.querySelector('a');

$anchor.addEventListener('click', entriesNav);

var $new = document.querySelector('.newBtn');

$new.addEventListener('click', formNav);
