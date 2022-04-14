/* global data */
/* exported data */

var $form = document.querySelector('form');

var $defaultImage = document.querySelector('.default-image');

var $url = document.querySelector('#journal-URL');

var $title = document.querySelector('#journal-title');

var $note = document.querySelector('#journal-notes');

var $formTitle = document.querySelector('.form-title');

$url.addEventListener('input', function updateImage(event) {
  $defaultImage.setAttribute('src', $url.value);
});

var $allList = document.querySelectorAll('li');

function handleSubmit(event) {
  event.preventDefault();

  if (data.editing === null) {
    var dataValue = {
      title: $title.value,
      photo: $url.value,
      note: $note.value,
      entryId: data.nextEntryId
    };
    data.nextEntryId++;
    data.entries.unshift(dataValue);
    $ul.prepend(newEntries(dataValue));
  } else {
    var editValue = {
      title: $title.value,
      photo: $url.value,
      note: $note.value,
      entryId: data.editing.entryId
    };

    for (var i = 0; i < $allList.length; i++) {
      var allListEntryId = parseInt($allList[i].getAttribute('data-entry-id'));

      if (editValue.entryId === allListEntryId) {
        $allList[i].replaceWith(newEntries(editValue));
      }
    }
    data.editing = null;
  }
  $form.reset();
  $defaultImage.setAttribute('src', 'images/placeholder-image-square.jpg');
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
  $img.setAttribute('class', 'entry-image');
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
  showDeleteBtn();
  $title.value = data.editing.title;
  $url.value = data.editing.photo;
  $note.value = data.editing.note;
  $defaultImage.setAttribute('src', data.editing.photo);
}

var $center = document.querySelector('.text-center');

function noEntry() {
  if (data.entries.length === 0) {
    $center.className = 'text-center';
  } else {
    $center.className = 'hidden';
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
  $form.reset();
  $defaultImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  hideDeleteBtn();

}

var $anchor = document.querySelector('a');

$anchor.addEventListener('click', entriesNav);

var $new = document.querySelector('.newBtn');

$new.addEventListener('click', formNav);

var $anchordeleteBtn = document.querySelector('.delete');
var $saveBtnToLeft = document.querySelector('#btnToLeft');

function showDeleteBtn() {
  $anchordeleteBtn.className = 'delete';
  $saveBtnToLeft.className = 'column-full btn-display-space-between';
}

function hideDeleteBtn() {
  $anchordeleteBtn.className = 'delete hidden';
  $saveBtnToLeft.className = 'column-full btn-display';
}

var $popupLayout = document.querySelector('.popup-layout');
var $cancelConfirmButton = document.querySelector('.button-cancel');
var $deleteConfirmButton = document.querySelector('.button-confirm');

$anchordeleteBtn.addEventListener('click', function (event) {
  $popupLayout.className = 'popup-layout';
}
);

$cancelConfirmButton.addEventListener('click', popupHidden);

function popupHidden(event) {
  $popupLayout.className = 'hidden';
}

$deleteConfirmButton.addEventListener('click', remove);
function remove(event) {

  for (var i = 0; i < $allList.length; i++) {
    var allListEntryId = parseInt($allList[i].getAttribute('data-entry-id'));
    if (data.editing === allListEntryId) {
      $allList[i].remove();
    }
  }
  popupHidden();
  entriesNav();
}
