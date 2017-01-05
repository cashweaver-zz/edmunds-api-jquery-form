// TODO: replace API_KEY with the api key or somehow get it in here.

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

// ref: http://stackoverflow.com/a/111545/7347047
function encodeQueryData(data) {
  let ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
};

/*
 * Edmunds request helper
 *
 * ref: http://stackoverflow.com/a/111545/7347047
 */
const edmundBaseUrl = 'https://api.edmunds.com/api/vehicle/v2';
const edmundAPIRequest = ({ endpoint, parameters={}, success }) => {
  // Set the format to JSON if not otherwise specified
  if (!('fmt' in parameters)) {
    parameters.fmt = 'json';
  }

  const url = `${edmundBaseUrl}${endpoint}?${encodeQueryData(parameters)}`;
  console.log('url', url);

  // $.get(url, success);
  if (endpoint === '/makes') {
    success({
   "makes":[
      {
         "id":200002038,
         "name":"Acura",
         "niceName":"acura",
         "models":[
            {
               "id":"Acura_ILX",
               "name":"ILX",
               "niceName":"ilx",
               "years":[
                  {
                     "id":100538929,
                     "year":2013,
                     "states":["USED","NEW"]
                  },
                  {
                     "id":200471908,
                     "year":2014,
                     "states":["NEW"]
                  }
               ],
               "states":["NEW","USED"]
            },
            {
               "id":"Acura_ZDX",
               "name":"ZDX",
               "niceName":"zdx",
               "years":[
                  {
                     "id":100537249,
                     "year":2012,
                     "states":["USED","NEW"]
                  },
                  {
                     "id":200441835,
                     "year":2013,
                     "states":["NEW"]
                  }
               ],
               "states":["USED","NEW"]
            }
         ]
      },
      {
         "id":200010382,
         "name":"Volvo",
         "niceName":"volvo",
         "models":[
            {
               "id":"Volvo_C30",
               "name":"C30",
               "niceName":"c30",
               "years":[
                  {
                     "id":200425618,
                     "year":2013,
                     "states":["NEW"]
                  }
               ],
               "states":["USED","NEW"]
            },
            {
               "id":"Volvo_XC90",
               "name":"XC90",
               "niceName":"xc90",
               "years":[
                  {
                     "id":100539229,
                     "year":2013,
                     "states":["USED","NEW"]
                  },
                  {
                     "id":200484498,
                     "year":2014,
                     "states":["NEW"]
                  }
               ],
               "states":["USED","NEW"]
            }
         ]
      },
      {
         "id":200038885,
         "name":"smart",
         "niceName":"smart",
         "models":[
            {
               "id":"smart_fortwo",
               "name":"fortwo",
               "niceName":"fortwo",
               "years":[
                  {
                     "id":200418482,
                     "year":2013,
                     "states":["NEW"]
                  }
               ],
               "states":["USED","NEW"]
            }
         ]
      }
   ],
   "makesCount":46
});
  } else if (endpoint === '/acura/models') {
    success({
"models": [
    {
      "id": "Lexus_CT_200h",
      "name": "CT 200h",
      "niceName": "ct200h",
      "years": [
        {
          "id": 200437666,
          "year": 2013,
          "styles": [
            {
              "id": 200437667,
              "name": "4dr Hatchback (1.8L 4cyl gas\/electric hybrid CVT)",
              "submodel": {
                "body": "Hatchback",
                "modelName": "CT 200h Hatchback",
                "niceName": "hatchback"
              },
              "trim": "Base"
            }
          ]
        }
      ]
    },
    {
      "id": "Lexus_RX_450h",
      "name": "RX 450h",
      "niceName": "rx450h",
      "years": [
        {
          "id": 200419837,
          "year": 2013,
          "styles": [
            {
              "id": 200419839,
              "name": "4dr SUV AWD (3.5L 6cyl gas\/electric hybrid CVT)",
              "submodel": {
                "body": "SUV",
                "modelName": "RX 450h SUV",
                "niceName": "suv"
              },
              "trim": "Base"
            },
            {
              "id": 200419838,
              "name": "4dr SUV (3.5L 6cyl gas\/electric hybrid CVT)",
              "submodel": {
                "body": "SUV",
                "modelName": "RX 450h SUV",
                "niceName": "suv"
              },
              "trim": "Base"
            }
          ]
        }
      ]
    }
  ],
  "modelsCount": 16
    });
  } else if (endpoint === '/acura/ct200h/2017/styles') {
    success({
"styles": [
  {
    "id": 101353967,
    "name": "4dr SUV (3.5L 6cyl 6A)",
    "make": {
      "id": 200001623,
      "name": "Lexus",
      "niceName": "lexus"
    },
    "model": {
      "id": "Lexus_RX_350",
      "name": "RX 350",
      "niceName": "rx350"
    },
    "year": {
      "id": 100533091,
      "year": 2011
    },
    "submodel": {
      "body": "SUV",
      "modelName": "RX 350 SUV",
      "niceName": "suv"
    },
    "trim": "Base"
  },
 ]
    });
  } else if (endpoint === '/styles/101353967/engines') {
    success({
"engines": [
        {
                          "id": "200478098",
                          "name": "5.7L V8 Engine (EZH)",
                          "equipmentType": "ENGINE",
                          "availability": "OPTIONAL",
          "options": [
            {
                                      "id": "200478145",
                                      "name": "5.7L V8 HEMI MDS VVT Engine (S Rwd)",
                                      "description": "5.7L V8 16V VVT engine rated at 363 hp @ 5200 rpm and 394 lb.-ft. of torque @ 4200 rpm; 5-speed automatic transmission; 160 mph primary speedometer; 215mm rear axle; 4 wheel independent performance suspension; Anti-lock 4-wheel performance disc brakes; Gross vehicle weight of 5350 lbs.",
                                      "equipmentType": "OPTION",
                                      "availability": "S Rwd",
              "attributes": [
                {
                                                  "name": "Front Suspension Classification",
                                                  "value": "independent"
                },
                {
                                                  "name": "Independent Suspension",
                                                  "value": "four-wheel"
                },
                {
                                                  "name": "Rear Suspension Classification",
                                                  "value": "independent"
                },
                {
                                                  "name": "Antilock Braking System",
                                                  "value": "4-wheel ABS"
                },
                {
                                                  "name": "Gross Vehicle Weight",
                                                  "value": "5350"
                }
              ],
                                      "manufactureOptionName": "5.7L V8 HEMI MDS VVT Engine",
                                      "manufactureOptionCode": "EZH",
                                      "category": "Package",
              "price": {
                                            "baseMSRP": 2200.0,
                                            "baseInvoice": 1958.0,
                                            "estimateTmv": false
              }
            }
          ],
                          "compressionRatio": 10.5,
                          "cylinder": 8,
                          "size": 5.7,
                          "displacement": 5654.0,
                          "configuration": "V",
                          "fuelType": "regular unleaded",
                          "horsepower": 363,
                          "torque": 394,
                          "totalValves": 16,
                          "manufacturerEngineCode": "EZH",
                          "type": "gas",
                          "code": "8VNAG5.7",
                          "compressorType": "NA"
        },
        {
                          "id": "200478096",
                          "name": "3.6L V6 Engine (300S Only)",
                          "equipmentType": "ENGINE",
                          "availability": "STANDARD",
                          "compressionRatio": 10.2,
                          "cylinder":6,"size": 3.6,
                          "displacement": 3604.0,
                          "configuration": "V",
                          "fuelType": "flex-fuel (unleaded/E85)",
                          "horsepower": 300,
                          "torque": 264,
                          "totalValves": 24,
                          "manufacturerEngineCode": "ERB",
                          "type": "flex-fuel (FFV)",
                          "code": "6VNAF3.6",
                          "compressorType": "NA"
        }
      ],
              "enginesCount":2
    });
  } else if (endpoint === '/styles/101353967/transmissions') {
    success({
      "transmissions": [
        {
                "id": "200478100",
                "name": "5A",
                "equipmentType": "TRANSMISSION",
                "availability": "OPTIONAL",
          "options": [
            {
                        "id": "200478145",
                        "name": "5.7L V8 HEMI MDS VVT Engine (S Rwd)",
                        "description": "5.7L V8 16V VVT engine rated at 363 hp @ 5200 rpm and 394 lb.-ft. of torque @ 4200 rpm; 5-speed automatic transmission; 160 mph primary speedometer; 215mm rear axle; 4 wheel independent performance suspension; Anti-lock 4-wheel performance disc brakes; Gross vehicle weight of 5350 lbs.",
                        "equipmentType": "OPTION",
                        "availability": "S Rwd",
              "attributes": [
                {
                                "name": "Front Suspension Classification",
                                "value": "independent"

                },
                {
                                "name": "Independent Suspension",
                                "value": "four-wheel"

                },
                {
                                "name": "Rear Suspension Classification",
                                "value": "independent"

                },
                {
                                "name": "Antilock Braking System",
                                "value": "4-wheel ABS"

                },
                {
                                "name": "Gross Vehicle Weight",
                                "value": "5350"

                }

              ],
                        "manufactureOptionName": "5.7L V8 HEMI MDS VVT Engine",
                        "manufactureOptionCode": "EZH",
                        "category": "Package",
              "price": {
                            "baseMSRP": 2200.0,
                            "baseInvoice": 1958.0,
                            "estimateTmv": false

              }

            }

          ],
                "automaticType": "Shiftable automatic",
                "transmissionType": "AUTOMATIC",
                "numberOfSpeeds": "5"

        },
        {
                "id": "200478101",
                "name": "8A",
                "equipmentType": "TRANSMISSION",
                "availability": "STANDARD",
                "automaticType": "Shiftable automatic",
                "transmissionType": "AUTOMATIC",
                "numberOfSpeeds": "8"

        }

      ],
        "transmissionsCount": 2
    });
  }
};



$(() => {
  // Store our form elements for easy access
  const $formElements = {
    year: $('#vehicle-form-year'),
    make: $('#vehicle-form-make'),
    model: $('#vehicle-form-model'),
    style: $('#vehicle-form-style'),
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
        proceed: (year) => {
          edmundAPIRequest({
            endpoint: '/makes',
            parameters: {
              year,
              view: 'basic',
            },
            success: (data) => {
              const makeOptions = data.makes.map((make) => (
                `<option value="${make.niceName}">${make.name}</option>`
              ))
              makeOptions.unshift('<option value="None">None</option>')

              $formElements.make.html(makeOptions);
            },
          });

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
        proceed: (make) => {
          const year = $formElements.year.val();
          edmundAPIRequest({
            endpoint: `/${make}/models`,
            parameters: {
              year,
              view: 'basic',
            },
            success: (data) => {
              const modelOptions = data.models.map((model) => (
                `<option value="${model.niceName}">${model.name}</option>`
              ))
              modelOptions.unshift('<option value="None">None</option>')

              $formElements.model.html(modelOptions);
            },
          });

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
        proceed: (model) => {
          const year = $formElements.year.val();
          const make = $formElements.make.val();
          edmundAPIRequest({
            endpoint: `/${make}/${model}/${year}/styles`,
            parameters: {
              // TODO: api_key: API_KEY,
              style: 'basic',
            },
            success: (data) => {
              const styleOptions = data.styles.map((style) => (
                `<option value="${style.id}">${style.name}</option>`
              ))
              styleOptions.unshift('<option value="None">None</option>')

              $formElements.style.html(styleOptions);
            },
          });

          resetFormTo($formElements.style);
        },
      });
    },
    style: function () {
      fieldChangeHandler({
        val: $(this).val(),
        backtrack: () => {
          resetFormTo($formElements.style);
        },
        proceed: (style) => {
          console.log(style);
          edmundAPIRequest({
            endpoint: `/styles/${style}/engines`,
            parameters: {
              // TODO: api_key: API_KEY,
              style: 'basic',
            },
            success: (data) => {
              const engineOptions = data.engines.map((engine) => (
                `<option value="${engine.id}">${engine.name}</option>`
              ))
              engineOptions.unshift('<option value="None">None</option>')

              $formElements.engine.html(engineOptions);
            },
          });

          // I could enable both the transmission field and the engine field at
          // this point but choose not to for simplicity.
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
          const styleId = $formElements.style.val();
          console.log(styleId);
          edmundAPIRequest({
            endpoint: `/styles/${styleId}/transmissions`,
            parameters: {
              // TODO: api_key: API_KEY,
              style: 'basic',
            },
            success: (data) => {
              const transmissionOptions = data.transmissions.map((transmission) => (
                `<option value="${transmission.id}">${transmission.name} - ${transmission.transmissionType}</option>`
              ))
              transmissionOptions.unshift('<option value="None">None</option>')

              $formElements.transmission.html(transmissionOptions);
            },
          });

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
    } else if ($el === $formElements.style) {
      keysToIgnore = [
        'year',
        'make',
        'model',
        'style',
      ];
    } else if ($el === $formElements.engine) {
      keysToIgnore = [
        'year',
        'make',
        'model',
        'style',
        'engine',
      ];
    } else if ($el === $formElements.transmission) {
      keysToIgnore = [
        'year',
        'make',
        'model',
        'style',
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
    `<option value="${year}">${year}</option>`
  ));
  years.unshift('<option value="None">None</option>')
  $formElements.year.html(years);

});

