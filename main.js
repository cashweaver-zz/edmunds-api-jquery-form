/*
 * Simple array generation
 *
 * Assumes
 *  1. start is an integer
 *  1. end is an integer
 */
const range = (start, end, step) => {
  if (!Number.isInteger(start) || !Number.isInteger(end)) {
    console.error('Invalid input. Expected integers.')
    return null;
  }

  let effectiveStep = step;
  if (typeof effectiveStep == 'undefined') {
    effectiveStep = (start <= end) ? 1 : -1
  } else if (effectiveStep === 0) {
    console.error('Invalid step Step cannot be 0');
    return null;
  }

  if (effectiveStep < 0 && start < end) {
    console.error('Invalid input. Start must be greater than End when using a negative step');
    return null;
  } else if (effectiveStep > 0 && start > end) {
    console.error('Invalid input. Start must be less than End when using a positive step');
    return null;
  }

  const r = [];
  if (effectiveStep > 0) {
    for (let i = start; i < end; i += effectiveStep) {
      r.push(i);
    }
  } else {
    for (let i = start; i > end; i += effectiveStep) {
      r.push(i);
    }
  }
  return r;
};


$(() => {
  // Store our form elements for easy access
  const $formElements = {
    year: $('#vehicle-form-year'),
    make: $('#vehicle-form-make'),
    model: $('#vehicle-form-model'),
    trim: $('#vehicle-form-trim'),
    engine: $('#vehicle-form-engine'),
    transmission: $('#vehicle-form-transmission'),
    mileage: $('#vehicle-form-mileage'),
    zipcode: $('#vehicle-form-zipcode'),
  };

  const disableField = ($el) => {
    $el.prop('disabled', true);
  };

  const enableField = ($el) => {
    $el.prop('disabled', false);
  };

  const fieldChangeHandler = (opts) => {
    if (opts.val === 'None') {
      opts.backtrack(opts.val);
    } else {
      opts.proceed(opts.val);
    }
  };

  const handleChange = {
    year: function () {
      fieldChangeHandler({
        val: $(this).val(),
        backtrack: () => {
          resetFormTo($formElements.year);
        },
        proceed: () => {
          // TODO: Make API call to Edmunds and populate the make field
          resetFormTo($formElements.make);
        },
      });
    },
    make: function () {
      fieldChangeHandler({
        val: $(this).val(),
        backtrack: () => {
          resetFormTo($formElements.make);
        },
        proceed: () => {
          // TODO: Make API call to Edmunds and populate the model field
          resetFormTo($formElements.model);
        },
      });
    },
    model: function () {
      fieldChangeHandler({
        val: $(this).val(),
        backtrack: () => {
          resetFormTo($formElements.model);
        },
        proceed: () => {
          // TODO: Make API call to Edmunds and populate the model field
          resetFormTo($formElements.trim);
        },
      });
    },
    trim: function () {
      fieldChangeHandler({
        val: $(this).val(),
        backtrack: () => {
          resetFormTo($formElements.trim);
        },
        proceed: () => {
          // TODO: Make API call to Edmunds and populate the model field
          resetFormTo($formElements.engine);
        },
      });
    },
    engine: function () {
      fieldChangeHandler({
        val: $(this).val(),
        backtrack: () => {
          resetFormTo($formElements.engine);
        },
        proceed: () => {
          // TODO: Make API call to Edmunds and populate the model field
          resetFormTo($formElements.transmission);
        },
      });
    },
    transmission: function () {
      fieldChangeHandler({
        val: $(this).val(),
        backtrack: () => {
          resetFormTo($formElements.transmission);
        },
        proceed: () => {
          // TODO: Make API call to Edmunds and populate the model field
          //resetFormTo($formElements.model);
        },
      });
    },
  };

  // Attach listeners
  for (key in $formElements) {
    if (typeof handleChange[key] !== 'undefined') {
      $formElements[key].on('change', handleChange[key]);
    }
  }

  // ============================================
  // Setup

  const resetFormTo = ($el) => {
    let keysToIgnore = [];
    if ($el === $formElements.year) {
      keysToIgnore = [
        'year',
      ];
    } else if ($el === $formElements.make) {
      keysToIgnore = [
        'year',
        'make',
      ];
    } else if ($el === $formElements.model) {
      keysToIgnore = [
        'year',
        'make',
        'model',
      ];
    } else if ($el === $formElements.trim) {
      keysToIgnore = [
        'year',
        'make',
        'model',
        'trim',
      ];
    } else if ($el === $formElements.engine) {
      keysToIgnore = [
        'year',
        'make',
        'model',
        'trim',
        'engine',
      ];
    } else if ($el === $formElements.transmission) {
      keysToIgnore = [
        'year',
        'make',
        'model',
        'trim',
        'engine',
        'transmission',
      ];
    }

    // Always ignore mileage and zipcode. They never need to be disabled.
    keysToIgnore = keysToIgnore.concat(['mileage', 'zipcode']);

    // Disable fields
    for (key in $formElements) {
      if (keysToIgnore.includes(key)) {
        enableField($formElements[key]);
      } else {
        disableField($formElements[key]);
      }
    }
  };
  resetFormTo($formElements.year);

  // ============================================
  // Year

  // Populate the Year field
  const years = range(2017, 1989).map((year) => (
    `<option>${year}</option>`
  ));
  years.unshift('<option>None</option>')
  $formElements.year.html(years);

});

