'use strict'

/**
 * Clamp between two numbers
 *
 * @param      {number}  min     The minimum
 * @param      {number}  max     The maximum
 * @param      {number}  val     The value to clamp
 */
function clamp(min, max, val) {
  return Math.min(max, Math.max(min, val));
}

/**
 * Fix num cores, allowing blanks to remain
 */
function fix_num_cores() {
  // let node_type_input = $('#batch_connect_session_context_node_type');
  let num_cores_input = $('#batch_connect_session_context_num_cores');

  if(num_cores_input.val() === '') {
    return;
  }

  // set_ppn_by_node_type(node_type_input, num_cores_input);
}

/**
 * Sets the ppn by node type.
 *
 * @param      {element}  node_type_input  The node type input
 * @param      {element}  num_cores_input  The number cores input
 */
function set_ppn_by_node_type(node_type_input, num_cores_input) {
  let data = node_type_input.find(':selected').data();

  num_cores_input.attr('max', data.maxPpn);
  num_cores_input.attr('min', data.minPpn);

  // Clamp value between min and max
  num_cores_input.val(
    clamp(data.minPpn, data.maxPpn, num_cores_input.val())
  );
}

/**
 * Toggle the visibilty of a form group
 *
 * @param      {string}    form_id  The form identifier
 * @param      {boolean}   show     Whether to show or hide
 */
function toggle_visibility_of_form_group(form_id, show) {
  let form_element = $(form_id);
  let parent = form_element.parent();

  if(show) {
    parent.show();
  } else {
    form_element.val('');
    parent.hide();
  }
}


/**
 * Toggle GPU Options
 */

function num_gpus_change_handler() {
  let gpu_type_visibility = $('#batch_connect_session_context_num_gpus')[0].value == "0" ? false : true;
  // if just made visible, select first item
  if ( $('#batch_connect_session_context_gpu_type').is(':hidden') ) {
    $('#batch_connect_session_context_gpu_type').val( $('#batch_connect_session_context_gpu_type').children()[0].value );
  }
  toggle_visibility_of_form_group(
    '#batch_connect_session_context_gpu_type',
    gpu_type_visibility
  ); 
}

function set_gpu_change_handler() {
  let gpus = $('#batch_connect_session_context_num_gpus');
  num_gpus_change_handler();
  gpus.change(num_gpus_change_handler);
}


/**
 * Main
 */

// Set controls to align with the values of the last session context
fix_num_cores();

// Install event handlers
set_gpu_change_handler();
