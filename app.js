$(function() {

  function initSort() {

    // Makes whole lists sortable on columns
    $(".column")
      .sortable({
        cursor: "move",
        connectWith: ".column",
        handle: ".list-header",
        helper: "clone",
        placeholder: "sortable-placeholder",
        revert: true
      });

    $(".list-cards")
      .sortable({
        snap: ".column",
        revert: true,
        drop: function (event, ui) {
          swapNodes($(this).get(0),$(ui.draggable).get(0));
        }
    });

      function swapNodes(a, b) {
        var aparent= a.parentNode;
        var asibling= a.nextSibling===b? a : a.nextSibling;
        b.parentNode.insertBefore(a, b);
        aparent.insertBefore(b, asibling);
      }
  }

  // Allows to move cards between lists
  function initCardSort() {
    $( ".list-cards" ).sortable({
      connectWith: ".list-cards"
    }).disableSelection();
  }

  initSort();
  initCardSort();
  

  $(".datepicker").dateDropper(); // Kolla datedropper - fin plugin

  // Adds new column / list
  function addList(event) {
    event.preventDefault(); // This prevents the submit to not reload the page.

    var formData = $(event.target).offsetParent().find("form").serializeArray();

    var newColumn = `<div class="column">
        <div class="list">
            <div class="list-header">
                ${formData[0].value}
                <button class="button delete">
                    X
                    <button class="button delete">X</button>
                </div>
                <ul class="list-cards wrapword">
                    <li class="card">
                      <a id="card-properties" href="">Card #1</a>
                      <p class="card-description"></p>
                      <p class="due-date"></p>
                      <button class="button delete">X</button>
                      <span class="button edit">Edit</span>
                    </li>
                    <li class="add-new">
                        <form class="new-card" action="index.html">
                            <input type="text" name="title" placeholder="Please name the card" />
                            <button class="button add">Add new card</button>
                        </form>
                    </li>
                </ul>
            </div>
        </div>`;

    $(".board").append(newColumn);
    
    initSort(); // init the sorting again after adding new lists/columns
  }

  // $("#list-creation-dialog").tabs();


  // Card properties dialog
  cardDialog = $("#card-properties-dialog").dialog({
    autoOpen: false,
    height: "auto",
    width: 270,
    modal: false,
    show: { effect: 'blind', speed: 1000 },
    hide: { effect: 'blind', speed: 1000 },
    buttons: {
      Save: function(event) {
        updateCard(event);
        cardDialog.dialog("close");
      },
      Cancel: function() {
        cardDialog.dialog("close");
      }
    }
  });
  
  // Tabs in card properties dialog
  function createTabs() {
    $("#card-properties-dialog #card-tabs").tabs();
  };
  createTabs();
  
  // New list dialog
  dialog = $("#list-creation-dialog").dialog({
    autoOpen: false,
    height: "auto",
    width: 270,
    modal: false,
    show: { effect: 'blind', speed: 1000 },
    hide: { effect: 'blind', speed: 1000 },
    buttons: {
      Save: addList,
      Cancel: function() {
        dialog.dialog("close");
      }
    }
  });

  // Clicklistener for opening "card properties dialog"
  $("body").on("click", ".edit", openCardDialog);

  function openCardDialog(event) {
    event.preventDefault();

    var el = $(this).parent();
    var title = $(el).find('.card-properties').text();
    var description = $(el).find('.card-description').text();
    var date = $(el).find('.due-date').text();


    $("body").find(".card-title").html(title);
    $("body").find(".card-description").html(description);
    $("body").find(".card-due-date").html(date);

    cardDialog
      .data('element', el)
      .dialog("open");
  };

  // Clicklistener for opening "new list dialog"
  $("#new-list").click(function() {
    dialog.dialog("open");
  });

  // Removes targeted list
  $("body").on("click", ".list-header .delete", function(event) {
    $(event.target).parent().toggle("explode");
    $(event.target).closest(".column").remove();
  });

  // Adds new card to list
  $('body').on("submit", ".new-card", addCard);

  function addCard(event) {
    event.preventDefault(); // This prevents the submit to not reload the page.
    var formData = $(event.target).serializeArray();
    $(event.target).find("input").val("");
    
    var newCard = `<li class="card">
    <a class="card-properties" href="">${formData[0].value}</a>
    <p class="card-description"></p>
    <p class="due-date"></p>
    <button class="button delete">X</button>
    <span class="button edit">Edit</span>
    </div>`;
    
    $(event.target).closest(".add-new").before(newCard);
  };

  // Update card name

  function updateCard(event) {
    event.preventDefault();
    var targetEl = $(cardDialog.data('element'))[0];
    var formData = $(event.target).offsetParent().find("form").serializeArray();

    // Checks if the input for card title isset
    if (formData[0].value !== '') {
      $(targetEl).find(".card-properties").html(formData[0].value).effect("bounce");
    }

    $(targetEl).find(".card-description").html(formData[1].value).effect("bounce");
    $(targetEl).find(".due-date").html(formData[2].value).effect("bounce");
  }


  // Removes targeted card
  $("body").on("click", ".list-cards .card .delete", deleteCard);

  function deleteCard(event) {
    event.preventDefault();
    $(event.target).parent().toggle("explode");
    $(event.target).parent().remove();
  };
});
