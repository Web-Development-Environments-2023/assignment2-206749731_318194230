$(function() {
    // Initialize the dialog
    $("#dialog").dialog({
      autoOpen: false,  // Don't open the dialog automatically
      modal: true,      // Make the dialog modal
      closeOnEscape: true,  // Close the dialog when Esc is pressed
      draggable: false,      // Make the dialog not draggable
      resizable: false,      // Make the dialog not resizable
      buttons: {
        "Close": function() {  // Add a "Close" button
          $(this).dialog("close");
        }
      }
    });
  
    // Open the dialog when the button is clicked
    $("#open-dialog").click(function() {
      $("#dialog").dialog("open");
    });
  
    // Close the dialog when the overlay is clicked
    $(".ui-widget-overlay").click(function() {
      $("#dialog").dialog("close");
    });
  });
  
