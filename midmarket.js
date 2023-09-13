/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HDI - MidMarket Tool
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 01. GLOBAL VARIABLES
// 02. HELPER FUNCTIONS
// 03. LIMITS / CURRENCIES FUNCTIONS
// 04. TRANSLATOR FUNCTIONS
// 05. TABLE FUNCTIONS

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 01. GLOBAL VARIABLES /////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const inter = "inter";
const it = "it";

const currencies_country = {
  "Italy": "EUR",
  "South Africa": "ZAR",
};

// Domain handling for Link generatiom
const full_domain = window.location.href;
const full_domain_arr = full_domain.split("/");
const domain = full_domain_arr[2];
const packageId = Instanda.Variables.PackageId;

/////////////////////////////////////
// 02. HELPER FUNCTIONS /////////////
/////////////////////////////////////

function getStringBetween(str, start, end) {
  const result = str.match(new RegExp(start + "(.*)" + end));
  return result[1];
}

function getTableLinks(quoteRef) {
  return ({
    edit_link: "https://" + domain + "/Public/ViewEditQuote?packageId=" + packageId + "&quoteRef=" + quoteRef + "",
    view_link: "https://" + domain + "/Public/ViewEditQuote?packageId=" + packageId + "&quoteRef=" + quoteRef + "",
    view_all_docs_link: "https://" + domain + "/Public/AgentAllDocs?packageId=" + packageId + "&quoteRef=" + quoteRef + "&showNB=True",
    upload_docs_link: "https://" + domain + "/Public/UploadDocuments?quoteRef=" + quoteRef + "&packageId=" + packageId + "",
    copy_link: "https://" + domain + "/Public/CopyQuote?packageId=" + packageId + "&quoteRef=" + quoteRef + "",
    mail_link: "https://" + domain + "/Public/EmailListForQuote?packageId=" + packageId + "&quoteRef=" + quoteRef + "",
    delete_link: "https://" + domain + "/Public/AbandonChange?quoteRef=" + quoteRef + "&packageId=" + packageId + "",
    cancel_link: "https://" + domain + "/Public/CancelPolicy?quoteRef=" + quoteRef + "&packageId=" + packageId + "&pageNumber=1",
    complete_link: "https://" + domain + "/Public/ViewQuoteOrPolicy?packageId=" + packageId + "&quoteRef=" + quoteRef + "&viewPolicy=False",
  });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 03. LIMITS / CURRENCIES FUCTIONS /////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Change Limits
function changeLimits(limits) {
  setTimeout(function () {
    $.each(limits, function (key, value) {
      $('#' + key).text(value);
    });
  }, 400);
}

// Fill input fields with default values
function fillLimits(limits) {
  setTimeout(function () {
    $.each(limits, function (key, value) {
      const defaultValue = value;
      const currentValue = $('[name^=' + key + ']').val();
      if (currentValue === '0' || currentValue === '0.00') {
        $('[name^=' + key + ']').val(defaultValue);
      } else {
        $('[name^=' + key + ']').val(currentValue);
      }
    });
  }, 400);
}

// Merge lang with limits
function replaceClaims(claims, limits) {
  $.each(claims, function (key1, value1) {

    $.each(limits, function (key2, value2) {
      if (key1 === key2) {
        $('#' + key1 + ' .instanda-question-label .control-label').text(value1 + value2);
        // console.log('Merged claims with limits!')
      }
    });
    
  });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 04. TRANSLATOR FUNCTIONS /////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Change Nav links
function changeNavLinks(navigation) {
  $('.navbar .nav li:eq(0) a').text(navigation[0]);
  $('.navbar .nav li:eq(1) a').text(navigation[1]);
}

// Stepper
function replaceStepper(stepper) {
  $.each(stepper, function (key, value) {
    $('#' + key).text(value);
    $('.stepper li').append('<i class="line-anker"></i>');
  });
}

// Change headlines in quote table (Dashboard)
function replaceTableHeadlines(headlines) {
  // Your active Quotes Table
  $('#quotesTableCustom thead th:nth-child(1)').text(headlines[0]);   // Actions
  $('#quotesTableCustom thead th:nth-child(2) a').text(headlines[1]); // Quote No.
  $('#quotesTableCustom thead th:nth-child(3) a').text(headlines[3]); // Status
  $('#quotesTableCustom thead th:nth-child(4) a').text(headlines[4]); // Underwriter
  $('#quotesTableCustom thead th:nth-child(5) a').text(headlines[5]); // Date
  // Your active Policies Table 
  $('#policiesTableCustom thead th:nth-child(1)').text(headlines[0]);   // Actions
  $('#policiesTableCustom thead th:nth-child(2) a').text(headlines[2]); // Quote No.
  $('#policiesTableCustom thead th:nth-child(3) a').text(headlines[1]); // Status
  $('#policiesTableCustom thead th:nth-child(4) a').text(headlines[4]); // Underwriter
  $('#policiesTableCustom thead th:nth-child(5) a').text(headlines[5]); // Date
}

// Upload docs screen
function replaceUploadPage(docs_page) {
  $('#tableUploadedDocuments thead th:nth-child(1)').text(docs_page[0]);   // Reason
  $('#tableUploadedDocuments thead th:nth-child(2)').text(docs_page[1]);   // Reason
  $('#tableUploadedDocuments thead th:nth-child(3)').text(docs_page[2]);   // Reason
  $('#tableUploadedDocuments thead th:nth-child(4)').text(docs_page[3]);   // Reason
  $('#tableUploadedDocuments thead th:nth-child(5)').text(docs_page[4]);   // Reason
}

// Change status in quote table (Dashboard)
function replaceStatus(new_values, old_values) {
  var gridRows_quotesTableCustom = $("#quotesTableCustom tbody tr");
  if (gridRows_quotesTableCustom.length > 0) {
    for (let i = 0; i < gridRows_quotesTableCustom.length; i++) {
      // Get the text of the column
      var text = $('#quotesTableCustom tbody tr:eq(' + i + ') td:eq(2)').text();
      // Remove blanks from text
      text = text.trim();
      // Get the index of old_values
      const index = old_values.indexOf(text);
      // Put in new text by index
      $('#quotesTableCustom tbody tr:eq(' + i + ') td:eq(2)').text(new_values[index]);
    }
  }
}

// ID TEXT 
function replaceIds(id, param) {
  $.each(id, function (key, value) {
    $('#' + key).text(value);
  });
}

// H3 Headlines
function replaceHeadlines(headlines) {
  $.each(headlines, function (key, value) {
    $('#' + key + ' h3').text(value);
    $('#' + key + ' h4').text(value);
    // H3 on page-agentalldocs
    $('.page-agentalldocs #' + key + '').text(value);
    // Translate coverrage names in Quote screen
    // We re-used the question id's from the headlines to translate the coverrage names in the quote
    $('.page-quote #' + key + '').text(value);
  });
}

// Labels
function replaceLabels(labels) {
  $.each(labels, function (key, value) {
    $('#' + key + ' .instanda-question-label .control-label').text(value);
    // For Multiitems
    $('#' + key + ' .instanda-question-item .instanda-question-multi-item-question-text-label .control-label').text(value);
    // For address field on Page: Company, (it is a combined address field)
    $("#question228399 div:eq(0)").addClass("instanda-address-label"); // add a class to address field, because there isn't a class
    $('#question228399 .' + key + ' label').text(value); // Translate "Address, City and Postcode labels"
    // Translate labels in Quote screen
    // We re-used the question id's from the labels to translate the labels in the quote
    $('.page-quote #' + key + '').text(value);
    // For classes
    $('.' + key + '').text(value);
  });
}

// Buttons
function replaceButtons(buttons) {
  $.each(buttons, function (key, value) {
    $('#innerBody button[name=' + key + ']').text(value);
    $('#innerBody button[formaction=' + key + ']').text(value);
    $('#' + key).text(value);
    $('input[id=' + key + ']').prop("value", value);
    $('.instanda-buttonlist-payment-online-billing-details .' + key).html(value);
    $('.' + key).text(value);
  });
}

function replaceYesNoRadioButtons(radiobutton) {

  $('.instanda-text-question .instanda-question-input label.instanda-question-yes-no-parent-yes, label.instanda-question-yes-no-yes')
    // Get all child nodes including text and comment
    .contents()
    // Iterate and filter out elements
    .filter(function () {
      // check node is text and non-empty
      return this.nodeType === 3 && this.textContent.trim().length;
      // replace it with new text
    }).replaceWith(radiobutton.yes);

  $('.instanda-text-question .instanda-question-input label.instanda-question-yes-no-parent-no, label.instanda-question-yes-no-no')
    // get all child nodes including text and comment
    .contents()
    // iterate and filter out elements
    .filter(function () {
      // check node is text and non-empty
      return this.nodeType === 3 && this.textContent.trim().length;
      // replace it with new text
    }).replaceWith(radiobutton.no);
}

function replaceMultiRadioButtons(buttons) {

  $.each(buttons, function (key, value) {
    for (let i = 0; i < value.length; i++) {

      $('#' + key + ' .instanda-text-question .instanda-question-input label:eq(' + (i) + ')')
        // Get all child nodes including text and comment
        .contents(function (content) {
          console.log(content);
        })
        // Iterate and filter out elements
        .filter(function () {
          // check node is text and non-empty
          return this.nodeType === 3 && this.textContent.trim().length;
          // replace it with new text
        }).replaceWith(value[i]);

    }
  });

}

// Change the radiobuttons text for the deductibles on RCT, RCP and RCO
function replaceRadioButtonsDeductibles(text, data) {

  for (let i = 0; i < data.length; i++) {
    $('#' + data[i] + ' .instanda-text-question .instanda-question-input label:eq(0).instanda-question-yes-no-parent-yes')
      // Get all child nodes including text and comment
      .contents()
      // Iterate and filter out elements
      .filter(function () {
        // check node is text and non-empty
        return this.nodeType === 3 && this.textContent.trim().length;
        // replace it with new text
      }).replaceWith(text.fixed);

    $('#' + data[i] + ' .instanda-text-question .instanda-question-input label:eq(1).instanda-question-yes-no-parent-yes')
      // Get all child nodes including text and comment
      .contents()
      // Iterate and filter out elements
      .filter(function () {
        // check node is text and non-empty
        return this.nodeType === 3 && this.textContent.trim().length;
        // replace it with new text
      }).replaceWith(text.percentage);
  };
}

// Yes - No // Solution to translate the problematic questions on Page: Additional Information (Yes/No Parent)
function replaceSpecial() {
  var translation

  if (localStorage.getItem('selectedLanguage') === "inter") {
    translation = "No"
  } else {
    translation = "No"
  }

  $('#question234085 .instanda-question-parent-yes-no .instanda-question-input label:eq(0), #question246274 .instanda-question-parent-yes-no .instanda-question-input label:eq(0)')
    // Get all child nodes including text and comment
    .contents(function (content) {
      console.log('test');
    })
    // Iterate and filter out elements
    .filter(function () {
      // check node is text and non-empty
      return this.nodeType === 3 && this.textContent.trim().length;
      // replace it with new text
    }).replaceWith(translation);
}

// Search Labels
function replaceSearchLabel(search_labels) {
  $('#agentSearchParameters label:eq(0)').text(search_labels[0]);
  $('#agentSearchParameters label:eq(1)').text(search_labels[1]);
  $('#agentSearchParameters label:eq(2)').text(search_labels[2]);
}

// Login Page
function replaceLogin(login_labels) {
  // LOGIN PAGE ////////////////////////////////////////////////
  // Headline "Please enter your credentials"
  $('.page-agentlogin .enter-credentials').text(login_labels.enter_credentials);
  // Username & Password label
  $('.page-agentlogin label[for=username]').text(login_labels.username);
  $('.page-agentlogin label[for=password]').text(login_labels.password);
  // Username & Password label
  $('.page-agentlogin .agent-login-forgot-password').text(login_labels.forgot_password);
  // Sign In (Button)
  $('.page-agentlogin button').text(login_labels.login_button);
  // RESET PASSWORD PAGE ////////////////////////////////////////
  // Headline
  $('#instanda-agent-forgot-password-form h4').text(login_labels.reset_password);
  // Info text
  $('#instanda-agent-forgot-password-form p').text(login_labels.info_text);
  // Input field (Delete placeholder)
  $('#instanda-agent-forgot-password-form input').attr("placeholder", "");
  // Submit (Button)
  $('#instanda-agent-forgot-password-form button').text(login_labels.submit_button);
}

// Tool Tips
function replaceTooltip(tooltips) {
  $.each(tooltips, function (key, value) {
    // For inception date and expiration date
    $('#' + key + ' .instanda-question-input .date').attr({'data-toggle': "popover", 'data-content': '' + value + ''});
    $('#' + key + ' .instanda-question-input .date').attr({'data-toggle': "popover", 'data-content': '' + value + ''});
    // For the dashboard icons
    $('.' + key + '').attr({'data-toggle': "popover", 'data-content': '' + value + ''});
  });
}

/////////////////////////////////////
// 05. TABLE FUNCTIONS //////////////
/////////////////////////////////////

// Table 1, 2  (Homepage: Open Projects, Finished Projects)
function addIconsTo_Table(rows, tableId) {

  $("#" + tableId + " thead tr:first").prepend('<th class="sortableColumn">Actions</th>');

  for (let i = 0; i < rows.length; i++) {

    // Get the link from the column
    var link = rows[i].cells[0].childNodes[1].href;
    // Get the quoteRef out of link
    var quoteRef = getStringBetween(link, 'quoteRef=', '&viewPolicy')
    // Links
    var links = getTableLinks(quoteRef);

    // Add Icons to column
    // Open Projects
    if (tableId === 'quotesTableCustom') {
      // Checking AgentGroupRefID, if AgentGroupRefID is NL Risk Analysis, then show Delete Icon Link
      if (Instanda.Variables.SalespersonRefId === 'Approver') {
        showDeleteLink = ' <a class="delete-tooltip" data-toggle="popover" data-content="Delete" href="' + links.delete_link + '"><i class="fa fa-trash"></i></a>';
      } else {
        showDeleteLink = '';
      }
      $("#" + tableId + " tbody tr:eq(" + i + ")").prepend('<td><a class="edit-tooltip" data-toggle="popover" data-content="Edit" href="' + links.edit_link + '"><i class="fa fa-edit"></i></a> <a class="view-docs-tooltip" data-toggle="popover" data-content="View Docs" href="' + links.view_all_docs_link + '"><i class="fa fa-file pl-5"></i></a> <a class="upload-docs-tooltip" data-toggle="popover" data-content="Upload Docs" href="' + links.upload_docs_link + '"><i class="fa fa-upload pl-5"></i></a> <a class="copy-tooltip" data-toggle="popover" data-content="Copy" href="' + links.copy_link + '"><i class="fa fa-copy pl-5"></i></a> <a class="complete-tooltip" data-toggle="popover" data-content="Complete" href="' + links.complete_link + '"><i class="fa fa-forward"></i></a> ' + showDeleteLink + '</td>');

    }

    // Finished Projects
    if (tableId === 'policiesTableCustom') {
      // Checking AgentGroupRefID, if AgentGroupRefID is Approver, then show Cancel Icon Link
      if (Instanda.Variables.SalespersonRefId === 'Approver') {
          showCancelLink = ' <a class="delete-tooltip" data-toggle="popover" data-content="Cancel" href="' + links.cancel_link + '"><i class="fa fa-ban"></i></a>';
      } else {
          showCancelLink = '';
      }
      $("#policiesTableCustom tbody tr:eq(" + i + ")").prepend('<td><a class="view-policy-tooltip" data-toggle="popover" data-content="View Policy" href="' + links.view_link + '"><i class="fa fa-eye"></i></a> <a class="view-docs-tooltip" data-toggle="popover" data-content="View Docs" href="' + links.view_all_docs_link + '"><i class="fa fa-file pl-5"></i></a> <a class="upload-docs-tooltip" data-toggle="popover" data-content="Upload Docs" href="' + links.upload_docs_link + '"><i class="fa fa-upload pl-5"></i></a> <a class="copy-tooltip" data-toggle="popover" data-content="Copy" href="' + links.copy_link + '"><i class="fa fa-copy pl-5"></i></a> <a class="view-emails-tooltip" data-toggle="popover" data-content="View E-Mails" href="' + links.mail_link + '"><i class="fa fa-envelope pl-5"></i></a>' + showCancelLink + '</td>');
    }

    // Remove link
    $("#" + tableId + " tbody tr:eq(" + i + ") td:eq(1) a").each(function () {
      var link_text = $(this).text();
      $("#" + tableId + " tbody tr:eq(" + i + ") td:eq(1)").text(link_text);
    });

    // Remove link
    $("#" + tableId + " tbody tr:eq(" + i + ") td:eq(2) a").each(function () {
      var link_text = $(this).text();
      $("#" + tableId + " tbody tr:eq(" + i + ") td:eq(2)").text(link_text);
    });

  } // for end

} // function end

// Table 3, 4 (Search-Results Page)
function addIconsTo_SearchTableTwo(rows, tableId) {

  // Open Certificates
  if (tableId === 'divQuoteResults') {

    $("#" + tableId + " tbody tr:first th:first").remove();
    $("#" + tableId + " tbody tr:first").prepend('<th>Actions</th>');

    for (let i = 1; i < rows.length; i++) {

      // Certificates can expire! When expired childNodes[2] will be undefined, because the index changes.
      // To fix that, we need to check if childNodes[2] is empty
      if (rows[i].cells[0].childNodes[2].href === undefined) {

        const link = rows[i].cells[0].childNodes[1].href
        const quoteRef = getStringBetween(link, 'quoteRef=', '&')
        const links = getTableLinks(quoteRef);

        // Checking AgentGroupRefID, if AgentGroupRefID is NL Risk Analysis, then show Delete Icon Link
        if (Instanda.Variables.SalespersonRefId === 'Approver') {
          showDeleteLink = ' <a class="delete-tooltip" data-toggle="popover" data-content="Delete" href="' + links.delete_link + '"><i class="fa fa-trash"></i></a>';
        } else {
          showDeleteLink = '';
        }
        const new_links = '<td><a class="edit-tooltip" data-toggle="popover" data-content="Edit" href="' + links.edit_link + '"><i class="fa fa-edit"></i></a> <a class="view-docs-tooltip" data-toggle="popover" data-content="View Docs" href="' + links.view_all_docs_link + '"><i class="fa fa-file pl-5"></i></a> <a class="upload-docs-tooltip" data-toggle="popover" data-content="Upload Docs" href="' + links.upload_docs_link + '"><i class="fa fa-upload pl-5"></i></a> <a class="copy-tooltip" data-toggle="popover" data-content="Copy" href="' + links.copy_link + '"><i class="fa fa-copy pl-5"></i></a> <a class="complete-tooltip" data-toggle="popover" data-content="Complete" href="' + links.complete_link + '"><i class="fa fa-forward"></i></a> ' + showDeleteLink + '</td>';
        // const new_links = '<td><a data-toggle="popover" data-content="Edit" href="' + links.edit_link + '"><i class="fa fa-edit"></i></a> <a data-toggle="popover" data-content="View Docs" href="' + links.view_all_docs_link + '"><i class="fa fa-file pl-5"></i></a> <a data-toggle="popover" data-content="Upload Docs" href="' + links.upload_docs_link + '"><i class="fa fa-upload pl-5"></i></a> <a data-toggle="popover" data-content="Copy" href="' + links.copy_link + '"><i class="fa fa-copy pl-5"></i></a>' + showDeleteLink + '</td>';
        $("#" + tableId + " tbody tr:eq(" + i + ") td:eq(0)").remove();
        $("#" + tableId + " tbody tr:eq(" + i + ")").prepend(new_links);

      } else {

        const link = rows[i].cells[0].childNodes[2].href
        const quoteRef = getStringBetween(link, 'quoteRef=', '&')
        const links = getTableLinks(quoteRef);

        // Checking AgentGroupRefID, if AgentGroupRefID is NL Risk Analysis, then show Delete Icon Link
        if (Instanda.Variables.SalespersonRefId === 'Approver') {
          showDeleteLink = ' <a class="delete-tooltip" data-toggle="popover" data-content="Delete" href="' + links.delete_link + '"><i class="fa fa-trash"></i></a>';
        } else {
          showDeleteLink = '';
        }

        const new_links = '<td><a class="edit-tooltip" data-toggle="popover" data-content="Edit" href="' + links.edit_link + '"><i class="fa fa-edit"></i></a> <a class="view-docs-tooltip" data-toggle="popover" data-content="View Docs" href="' + links.view_all_docs_link + '"><i class="fa fa-file pl-5"></i></a> <a class="upload-docs-tooltip" data-toggle="popover" data-content="Upload Docs" href="' + links.upload_docs_link + '"><i class="fa fa-upload pl-5"></i></a> <a class="copy-tooltip" data-toggle="popover" data-content="Copy" href="' + links.copy_link + '"><i class="fa fa-copy pl-5"></i></a> <a class="complete-tooltip" data-toggle="popover" data-content="Complete" href="' + links.complete_link + '"><i class="fa fa-forward"></i></a> ' + showDeleteLink + '</td>';
        // const new_links = '<td><a data-toggle="popover" data-content="Edit" href="' + links.edit_link + '"><i class="fa fa-edit"></i></a> <a data-toggle="popover" data-content="View Docs" href="' + links.view_all_docs_link + '"><i class="fa fa-file pl-5"></i></a> <a data-toggle="popover" data-content="Upload Docs" href="' + links.upload_docs_link + '"><i class="fa fa-upload pl-5"></i></a> <a data-toggle="popover" data-content="Copy" href="' + links.copy_link + '"><i class="fa fa-copy pl-5"></i></a>' + showDeleteLink + '</td>';
        $("#" + tableId + " tbody tr:eq(" + i + ") td:eq(0)").remove();
        $("#" + tableId + " tbody tr:eq(" + i + ")").prepend(new_links);

      }
    }
  }

  // Issued Certificates
  if (tableId === 'divPolicyResults') {

    $("#" + tableId + " thead tr:first th:first").remove();
    $("#" + tableId + " thead tr:first").prepend('<th>Actions</th>');

    // Remove every row
    $("td:contains('Adjustments disabled')").parent().remove();

    var new_rows = $("#divPolicyResults tbody tr");

    for (let i = 0; i < new_rows.length; i++) {

      if (new_rows[i].cells[0].childNodes[2].href === undefined) {

        var link = new_rows[i].cells[0].childNodes[1].href
        var quoteRef = getStringBetween(link, 'quoteRef=', '&')
        var links = getTableLinks(quoteRef);

        // Checking AgentGroupRefID, if AgentGroupRefID is Approver, then show Cancel Icon Link
        if (Instanda.Variables.SalespersonRefId === 'Approver') {
          showCancelLink = ' <a class="cancel-policy-tooltip" data-toggle="popover" data-content="Cancel" href="' + links.cancel_link + '"><i class="fa fa-ban"></i></a>';
        } else {
          showCancelLink = '';
        }

        var new_links = '<td><a class="view-policy-tooltip" data-toggle="popover" data-content="View Policy" href="' + links.view_link + '"><i class="fa fa-eye"></i></a> <a class="view-docs-tooltip" data-toggle="popover" data-content="View Docs" href="' + links.view_all_docs_link + '"><i class="fa fa-file pl-5"></i></a> <a class="upload-docs-tooltip" data-toggle="popover" data-content="Upload Docs" href="' + links.upload_docs_link + '"><i class="fa fa-upload pl-5"></i></a> <a class="copy-tooltip" data-toggle="popover" data-content="Copy" href="' + links.copy_link + '"><i class="fa fa-copy pl-5"></i></a> <a class="view-emails-tooltip" data-toggle="popover" data-content="View E-Mails" href="' + links.mail_link + '"><i class="fa fa-envelope pl-5"></i></a>' + showCancelLink + '</td>';
        $("#" + tableId + " tbody tr:eq(" + i + ") td:eq(0)").remove();
        $("#" + tableId + " tbody tr:eq(" + i + ")").prepend(new_links);

      } else {

        var link = new_rows[i].cells[0].childNodes[2].href
        var quoteRef = getStringBetween(link, 'quoteRef=', '&')
        var links = getTableLinks(quoteRef);

        // Checking AgentGroupRefID, if AgentGroupRefID is Approver, then show Cancel Icon Link
        if (Instanda.Variables.SalespersonRefId === 'Approver') {
          showCancelLink = ' <a class="cancel-policy-tooltip" data-toggle="popover" data-content="Cancel" href="' + links.cancel_link + '"><i class="fa fa-ban"></i></a>';
        } else {
          showCancelLink = '';
        }

        var new_links = '<td><a class="view-policy-tooltip" data-toggle="popover" data-content="View Policy" href="' + links.view_link + '"><i class="fa fa-eye"></i></a> <a class="view-docs-tooltip" data-toggle="popover" data-content="View Docs" href="' + links.view_all_docs_link + '"><i class="fa fa-file pl-5"></i></a> <a class="upload-docs-tooltip" data-toggle="popover" data-content="Upload Docs" href="' + links.upload_docs_link + '"><i class="fa fa-upload pl-5"></i></a> <a class="copy-tooltip" data-toggle="popover" data-content="Copy" href="' + links.copy_link + '"><i class="fa fa-copy pl-5"></i></a> <a class="view-emails-tooltip" data-toggle="popover" data-content="View E-Mails" href="' + links.mail_link + '"><i class="fa fa-envelope pl-5"></i></a>' + showCancelLink + '</td>';
        $("#" + tableId + " tbody tr:eq(" + i + ") td:eq(0)").remove();
        $("#" + tableId + " tbody tr:eq(" + i + ")").prepend(new_links);

      }
    }
  }
}

// Table 5 (Upload Docs Page)
function addIconsTo_DocsTable(rows, tableId) {
  for (let i = 0; i < rows.length; i++) {
    var link = rows[i].cells[0].childNodes[0].href;
    var quoteRef = getStringBetween(link, 'quoteRef=', '&uploadedDocumentId');
    var docId = getStringBetween(link, '&uploadedDocumentId=', '');
    var delete_link = "https://" + domain + "/Public/DeleteQuoteDocument?quoteRef=" + quoteRef + "&uploadedDocumentId=" + docId + "&packageId=" + packageId + "&backButtonRoute=https%3A%2F%2Fdesign.instanda.com%2FPublic%2FAgentDashboard";
    $("#" + tableId + " tbody tr:eq(" + i + ") td:eq(6)").html('<a class="delete-link" href="' + delete_link + '"><i class="fa fa-trash"></i></a>');
  }
}

function changeLanguageInNav() {
  if (localStorage.getItem("langMidMarket") === "inter") {
    $('.current-language').html('<a href="#"><button class="btn btn-lang languageSelect-0-2-183" name="languageButton" type="button"> <img src="https://www.hdi.global/globalassets/global/assets/flag-icons/aa.svg" class="flagImage-0-2-182" alt="Change language"><span class="currentLanguage-0-2-181">International</span></button></a>');
  }
  if (localStorage.getItem("langMidMarket") === "it") {
    $('.current-language').html('<a href="#"><button class="btn btn-lang languageSelect-0-2-183" name="languageButton" type="button"> <img src="https://www.hdi.global/globalassets/global/assets/flag-icons/it.svg" class="flagImage-0-2-182" alt="Change language"><span class="currentLanguage-0-2-181">Italy</span></button></a>');
  }
}

function changeLanguage(param) {
  try {
    // Store the old language and use it in replaceStatus()
    const old_language = localStorage.getItem('langMidMarket')
    // Update localStorage
    localStorage.setItem('langMidMarket', param);

    // Login Page and Reset password
    replaceLogin(language[param].login_labels);

    // Navigation
    changeNavLinks(language[param].navigation);
    // Stepper
    replaceStepper(language[param].stepper);

    // Dashboard
    // 1. Search Labels
    replaceSearchLabel(language[param].search_label);
    // 2. Quotes table Headlines
    replaceTableHeadlines(language[param].table_header);
    // 3. Quotes table Status
    replaceStatus(language[param].quote_status_value, language[old_language].quote_status_value)

    // Other replace functions
    replaceIds(language[param].id_data);
    replaceHeadlines(language[param].headline);
    replaceLabels(language[param].label);
    replaceButtons(language[param].button);
    replaceYesNoRadioButtons(language[param].radiobutton_yes_no);
    replaceMultiRadioButtons(language[param].radiobutton_multi);
    replaceSpecial();
    changeLanguageInNav();
    replaceClaims(language[param].claims, limits[currencies_country[Instanda.Variables.AgentGroupCountry]].claims);
    replaceTooltip(language[param].tooltip);
    replaceRadioButtonsDeductibles(language[param].text_radiobutton_fixed_percentage, language[param].radiobutton_fixed_percentage);
  
    replaceUploadPage(language[param].upload_docs_page)
  } catch(error) {
    console.log(error);
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DOC READY FUNCTION ///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function() {

  // Set language after login
  // if(Instanda.Variables.currency === "EUR") {
  //   localStorage.setItem('langMidMarket', 'it');
  // } else {
  //   localStorage.setItem('langMidMarket', 'inter');
  // }

  console.log(Instanda.Variables);

  // Change favicon
  // Add <link> after <meta name="viewport"> in the <head> section
  $('meta[name="viewport"]').after('<link id="favicon" rel="shortcut icon" type="image/png" href="https://www.hdi.de/assets/img/favicon_hdi.png" />');
  
  changeLimits(limits[currencies_country[Instanda.Variables.AgentGroupCountry]])

  // Page: Coverages
  // Fill limits in inputs when the add Button for RCT, RCP, RCO is clicked
  // RCT
  $("#rct_PQ_MIaddButton").click(function(){
    changeLimits(limits[currencies_country[Instanda.Variables.AgentGroupCountry]])
    fillLimits(limit_inputs[currencies_country[Instanda.Variables.AgentGroupCountry]].RCT)
  });
  // RCO
  $("#rco_PQ_MIaddButton").click(function(){
    changeLimits(limits[currencies_country[Instanda.Variables.AgentGroupCountry]])
    fillLimits(limit_inputs[currencies_country[Instanda.Variables.AgentGroupCountry]].RCO)
  });
  // RCP
  $("#rcp_PQ_MIaddButton").click(function(){
    changeLimits(limits[currencies_country[Instanda.Variables.AgentGroupCountry]])
    fillLimits(limit_inputs[currencies_country[Instanda.Variables.AgentGroupCountry]].RCP)
  });

  // Page: Additional Coverages
  // Fill limits in inputs when the add Button is clicked
  // RCP.01
  $("#additional_rcp_01_PQ_MIaddButton").click(function(){
    changeLimits(limits[currencies_country[Instanda.Variables.AgentGroupCountry]])
    fillLimits(limit_inputs[currencies_country[Instanda.Variables.AgentGroupCountry]].RCP01)
  });
  // RCP.02
  $("#additional_rcp_02_PQ_MIaddButton").click(function(){
    changeLimits(limits[currencies_country[Instanda.Variables.AgentGroupCountry]])
    fillLimits(limit_inputs[currencies_country[Instanda.Variables.AgentGroupCountry]].RCP02)
  });
  // RCP.03
  $("#additional_rcp_03_PQ_MIaddButton").click(function(){
    changeLimits(limits[currencies_country[Instanda.Variables.AgentGroupCountry]])
    fillLimits(limit_inputs[currencies_country[Instanda.Variables.AgentGroupCountry]].RCP03)
  });
  // RCP.04
  $("#additional_rcp_04_PQ_MIaddButton").click(function(){
    changeLimits(limits[currencies_country[Instanda.Variables.AgentGroupCountry]])
    fillLimits(limit_inputs[currencies_country[Instanda.Variables.AgentGroupCountry]].RCP04)
  });
  // RCP.06
  $("#additional_rcp_06_PQ_MIaddButton").click(function(){
    changeLimits(limits[currencies_country[Instanda.Variables.AgentGroupCountry]])
    fillLimits(limit_inputs[currencies_country[Instanda.Variables.AgentGroupCountry]].RCP06)
  });
  // RCP.08
  $("#additional_rcp_08_PQ_MIaddButton").click(function(){
    changeLimits(limits[currencies_country[Instanda.Variables.AgentGroupCountry]])
    fillLimits(limit_inputs[currencies_country[Instanda.Variables.AgentGroupCountry]].RCP08)
  });
  // RCT.05
  $("#additional_rct_05_PQ_MIaddButton").click(function(){
    changeLimits(limits[currencies_country[Instanda.Variables.AgentGroupCountry]])
    fillLimits(limit_inputs[currencies_country[Instanda.Variables.AgentGroupCountry]].RCT05)
  });
  // RCT.20
  $("#additional_rct_20_PQ_MIaddButton").click(function(){
    changeLimits(limits[currencies_country[Instanda.Variables.AgentGroupCountry]])
    fillLimits(limit_inputs[currencies_country[Instanda.Variables.AgentGroupCountry]].RCT20)
  });
  // RCT.24
  $("#additional_rct_24_PQ_MIaddButton").click(function(){
    changeLimits(limits[currencies_country[Instanda.Variables.AgentGroupCountry]])
    fillLimits(limit_inputs[currencies_country[Instanda.Variables.AgentGroupCountry]].RCT24)
  });

  /////////////////////////////////////
  // CHANGE TABLE STYLES //////////////
  /////////////////////////////////////

  // Table 1  (Homepage: Open Certificates)
  var gridRows_quotesTableCustom = $("#quotesTableCustom tbody tr");
  if (gridRows_quotesTableCustom.length > 0) {
    addIconsTo_Table(gridRows_quotesTableCustom, 'quotesTableCustom')
  }
  // -----------------------------------------------------------------------------------
  // Table 2 (Homepage: Issued Certificates)
  var gridRows_policiesTableCustom = $("#policiesTableCustom tbody tr");
  if (gridRows_policiesTableCustom.length > 0) {
    addIconsTo_Table(gridRows_policiesTableCustom, 'policiesTableCustom');
  }
  // -----------------------------------------------------------------------------------
  // Table 3 (Search-Results Page: Open Certificates)
  var gridRows_divQuoteResults = $("#divQuoteResults tbody tr");
  if (gridRows_divQuoteResults.length > 0) {
    addIconsTo_SearchTableTwo(gridRows_divQuoteResults, 'divQuoteResults');
  }
  // -----------------------------------------------------------------------------------
  // Table 4 (Search-Results Page: Issued Certificates)
  var gridRows_divPolicyResults = $("#divPolicyResults tbody tr");
  if (gridRows_divPolicyResults.length > 0) {
    addIconsTo_SearchTableTwo(gridRows_divPolicyResults, 'divPolicyResults');
  }
  // -----------------------------------------------------------------------------------
  // Table 5 (Upload Docs Page)
  var gridRows_tableUploadedDocuments = $("#tableUploadedDocuments tbody tr");
  addIconsTo_DocsTable(gridRows_tableUploadedDocuments, 'tableUploadedDocuments');

  /////////////////////////////////////
  // HIDE ELEMENTS ////////////////////
  /////////////////////////////////////

  // Buttons //////////////////////////
  // Notes button
  $(".instanda-notes-button").css({ "display": "none" });
  /////////////////////////////////////

  // Index
  if (Instanda.Variables.PageName === "index") {
    $(".stepper-anker").css({ "display": "none" });
    // Hide Sub Navigation/Breadcrump
    $("#breadcrump").css({ "display": "none" });
  }

  // viewquoteorpolicy
  if (Instanda.Variables.PageName === "viewquoteorpolicy") {
    // Hide all buttons on viewquoteorpolicy page
    $('.policy-view-options-action-buttons').css({ "display": "none" });
    $('.btnCompletePolicyBuy').attr('id', 'completePolicyBuy');

    setTimeout(function () {
      document.getElementById("completePolicyBuy").click();
      ShowWaitingAnimation();
      window.addEventListener('load', function () {
        HideWaitingAnimation()
      }) 
    }, 300);

  }

  // Welcome Box: Add currency
  $("#welcome-box .bg-green .row div:nth-child(3)").after("<div class='col-xs-12 mt-2'><span class='login-text' id='currency'>Currency: </span></div><div class='col-xs-12'><span id='currency-value'></span></div>");

  // Login Page
  if (Instanda.Variables.PageName === "agentlogin") {
    // Hide Sub Navigation/Breadcrump
    $("#breadcrump").css({ "display": "none" });
    // SIDEBAR /////////////////////////////////
    // Hide Login Label (Your are logged in as:)
    $(".login-text").css({ "display": "none" });
    // Change Login Status Message
    $(".login-name").text("Please sign in");
    // Welcome box: 
    // Hide Login Button
    $("#welcome-box .btn").css({ "display": "none" });
    // Hide welcome message
    $("#welcome-box .bg-green h5").text("Welcome to the Mid Market - General Liability Tool");
    // Hide currency
    $("#welcome-box .bg-green .row div:nth-child(5)").css({ "display": "none" });
  }

  // Password Reset Page
  if (Instanda.Variables.PageName === "forgotsalespersonpassword") {
    // Hide Login Button
    $("#welcome-box .btn").css({ "display": "none" }); 
    $(".stepper-anker").css({ "display": "none" });
    // Hide Sub Navigation/Breadcrump
    $("#breadcrump").css({ "display": "none" });
    $(".login-text").css({ "display": "none" });
  }

  // Hide Site Environment in Welcome Box when variable is not set
  if (!Instanda.Variables.SiteEnvironment) {
    $(".site, .site-environment").css({ "display": "none" });
  }

  // Stepper Box (Hide on specific pages)
  if (Instanda.Variables.PageName === "agentlogin" 
      || Instanda.Variables.PageName === "agentdashboard" 
      || Instanda.Variables.PageName === "viewquoteorpolicy" 
      || Instanda.Variables.PageName === "agentalldocs" 
      || Instanda.Variables.PageName === "uploaddocuments" 
      || Instanda.Variables.PageName === "emaillistforquote" 
      || Instanda.Variables.PageName === "getagentsearchresults"
      || Instanda.Variables.PageName === "displayemail"
      ) {
      $(".stepper-anker").css({ "display": "none" });
      // Hide Sub Navigation/Breadcrump
      $("#breadcrump").css({ "display": "none" });

  }

  if (Instanda.Variables.PageName === "prequotequestions" && Instanda.Variables.PageNumber === 6) {
    $("#selectedCurrency").text(Instanda.Variables.currency_PQ_CH);
  }

  //////////////////////////////////////////////////////////////

  // Quote Screen
  if (Instanda.Variables.PageName === "quote") {
    $("#copyQuoteButton").css({ "display": "none" });
    $("#continueButton").text("Issue Quote");
  }

  // Pre Quote Questions
  if (Instanda.Variables.PageName === "prequotequestions") {
    $(".instanda-pre-quote-content .instanda-upper-content").css({ "display": "none" });
  }
  if (Instanda.Variables.PageName === "prequotequestions" && Instanda.Variables.PageNumber === 1) {
    $(".instanda-pre-quote-content .instanda-upper-content").css({ "display": "none" });
    $("#breadcrump").css({ "display": "none" });
  }
  if (Instanda.Variables.PageName === "prequotequestions" && Instanda.Variables.PageNumber === 2) {
    $(".instanda-address-country-label, .instanda-address-country").css({ "display": "none" });
  }

  // Post Quote Questions
  if (Instanda.Variables.PageName === "postquotequestions") {
    $("#breadcrump").css({ "display": "none" });
  }

  // Confirmation Page
  if (Instanda.Variables.PageName === "confirmation2") {
    $("#breadcrump").css({ "display": "none" });
  }

  // Customer documents Page
  if (Instanda.Variables.PageName === "agentalldocs") {
    // Remove headline H3
    // $(".agent-all-docs-responsive h3").css({ "display": "none" });
    $(".agent-all-docs-responsive h3").attr('id', 'headline_upload_docs');
    // Store the content of #modalDialog
    // const modal = $(".agent-all-docs-responsive #modalDialog" ).html();
    // // rebuild "agent-all-docs-responsive" with a <span> inside and add the modal afterwards
    // $(".agent-all-docs-responsive").html('<span id="docs_text">TEST</span>' + modal);
    // $(".modal-dialog").addClass( "modal fade" );
    // $(".modal-dialog").attr('role', 'dialog');
  }

  // Search Results Page
  if (Instanda.Variables.PageName === "getagentsearchresults") {
    // Remove Search inputs fields
    $(".questionList .form-group").remove();
    $(".instanda-agent-retrieve-quotes .instanda-agent-search-fields").remove();
  }
  
  // Show Emails Page 
  if (Instanda.Variables.PageName === "displayemail") {
    // Remove H3 Headline
    $(".emailBodyDiv h3").remove();
    // Put instanda-main-content into a row to fix a display error
    const content = $(".instanda-main-content").html();
    $(".instanda-main-content").html('<div class="row">' + content + '</div>');
  }

  // Upload Documnets Page
  if (Instanda.Variables.PageName === "uploaddocuments") {
    // Remove unwanted elemnts in table header and upload section
    // Delete it two times! When deleting the first th:eq(4), th:eq(5) becomes th:eq(4)!
    $("#tableUploadedDocuments thead tr th:eq(4)").remove();
    $("#tableUploadedDocuments thead tr th:eq(4)").remove();
    $(".rowStyledDiv div:eq(2)").remove();
    $(".rowStyledDiv div:eq(2)").remove();

    const rows = $("#tableUploadedDocuments tbody tr");

    for (let i = 0; i < rows.length; i++) {
      $("#tableUploadedDocuments tbody tr:eq(" + i + ") td:eq(4)").remove();
      $("#tableUploadedDocuments tbody tr:eq(" + i + ") td:eq(4)").remove();
    }
  }

  // Retrieve Quote
  if (Instanda.Variables.PageName === "retrievequote") {
    $(".stepper-anker").css({ "display": "none" });
    // Remove Search inputs fields
    $(".search-fields div:nth-child(3)").remove();
    // Remove Headline (Retrieve quote and policy data for cprisk)
    $(".instanda-agent-search-fields h4").remove();
    $("h3").html("Search for");
    $("label:contains('Search for')").remove();
  }

  // Cancel Policy
  if (Instanda.Variables.PageName === "cancelpolicy") {
    $(".stepper-anker").css({ "display": "none" });
  }

  // Review Referrals
  if (Instanda.Variables.PageName === "reviewreferrals") {
    $(".stepper-anker").css({ "display": "none" });
    // Hide Sub Navigation/Breadcrump
    $("#breadcrump").css({ "display": "none" });
  }

  // Referrals Review Line
  if (Instanda.Variables.PageName === "referralreviewline") {
    $(".stepper-anker").css({ "display": "none" });
    // Hide Sub Navigation/Breadcrump
    $("#breadcrump").css({ "display": "none" });
  }

  ////////////////////////////////////////
  // TOOL TIPS SETTINGS  (POPOVER) ///////
  ////////////////////////////////////////

  $(function () {
    $('[data-toggle="popover"]').popover({
      trigger: 'hover',
      placement: 'top',
      delay: { "show": 0, "hide": 0 }
    })
  })

  /////////////////////////////
  // REPLACE WORDS ////////////
  /////////////////////////////

  $("h3:contains('Retrieve Certificate')").text("Search Options");
  $("h3:contains('Policies')").text("Issued Policies");
  $("h3:contains('Quotes')").text("Open Quotes");
  $(".instanda-multi-item h3:contains('Coverage')").text("Coverage");

  $("h3:contains('Country')").text("Country");
  $("h3:contains('RCT')").text("RCT");
  $("h3:contains('RCO')").text("RCO");
  $("h3:contains('RCP')").text("RCP");
  $("h3:contains('Claim information')").text("Claim information");
  $("button:contains('Download Quotes')").text("Download Open Quotes");
  $("button:contains('Download Policies')").text("Download Issued Policies");

  $('[id^=heading_countries_mi]').css({ "display": "none" });

  ///////////////////////////////////
  // RADIO BUTTONS and CHECKBOXES ///
  ///////////////////////////////////

  // Add a little helper to style the radio buttons
  $('.instanda-text-question .instanda-question-input label').append('<i class="input-helper"></i>');
  $('.referral-review-line label').append('<i class="input-helper"></i>'); // Referal Screen
  // Add a little helper to style the radio buttons
  $('#question194007 .instanda-question-input .radio-inline input').after('<i class="input-helper"></i>');

  $(".instanda-multi-item-remove span").html('Delete');

  /////////////////////////////
  // EXTERNAL FILES ///////////
  /////////////////////////////

  // Add custom.css to head
  $("head link[rel='stylesheet']").last().after("<link rel='stylesheet' href='https://florian-seelmann.de/public//hdi-midmarket/css/custom.css' type='text/css' media='screen'>");
  
  ///////////////////////////////////
  // LANGUAGE SELECT BUTTON /////////
  ///////////////////////////////////

  $('.navbar-nav').append('<li class="current-language"></li>');
  const international = '<a href="#" onClick="changeLanguage(inter)" class="country-0-2-32" target=""><img src="https://www.hdi.global/globalassets/global/assets/flag-icons/aa.svg" class="countryFlag-0-2-33"><span class="countryName-0-2-34">International website (English)</span></a>'
  const italian = '<a href="#" onClick="changeLanguage(it)" class="country-0-2-32" target=""><img src="https://www.hdi.global/globalassets/global/assets/flag-icons/it.svg" class="countryFlag-0-2-33"><span class="countryName-0-2-34">Italy</span></a>'

  // Add Options to Language Modal
  $('#languageModal .countries-0-2-29').append(international);
  $('#languageModal .countries-0-2-30').append(italian);

  /////////////////////////////
  // Initialization ///////////
  /////////////////////////////

  // Initialize localStorage
  if (localStorage.getItem("langMidMarket")) {
    console.log(localStorage.getItem("langMidMarket"));
  } else {
    localStorage.setItem('langMidMarket', 'inter');
    console.log('Default-Language set: International');
  }

  // Initialize language
  changeLanguage(localStorage.getItem('langMidMarket'))

  // Initialize limits and currency
  // Add currency to sidebar container "currency-value"
  $("#welcome-box .bg-green #currency-value").text(currencies_country[Instanda.Variables.AgentGroupCountry]);  

  //////////////////////////////////////////////////////////////////
  // MODAL LANGUAGE SELECT /////////////////////////////////////////
  //////////////////////////////////////////////////////////////////

  $(".current-language").on("click", function () {
    $("#languageModal").css("display", "block");
  });

  // User can close modal with keyborad button "ESC"
  $(document).keydown(function (event) {
    if (event.keyCode == 27) {
      $('#languageModal').hide();
    }
  });

  // Close modal via icon
  $(".closeIconLabel-0-2-11").on("click", function () {
    $("#languageModal").css("display", "none");
  });

  // Close modal automaticly
  $(".country-0-2-32").on("click", function () {
    setTimeout(function () {
      $("#languageModal").css("display", "none");
    }, 300);
  });

  ///////////////////////////////////
  // HELPERS ////////////////////////
  ///////////////////////////////////

  // Stepper box, add line anker
  $('.stepper li').append('<i class="line-anker"></i>');

  const scrollContainer = document.querySelectorAll(".table-responsive");

  for (let i = 0; i < scrollContainer.length; i++) {
    scrollContainer[i].addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer[i].scrollLeft += evt.deltaY;
    });
  }

  });