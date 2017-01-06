// TODO: replace API_KEY with the api key or somehow get it in here.
const ourAPIKey = 'YOUR_API_KEY_GOES_HERE';

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
  const defaultParameters = {
    fmt: 'json',
    api_key: ourAPIKey,
    view: 'basic',
  };

  const url = `${edmundBaseUrl}${endpoint}?${encodeQueryData($.extend(
    {},
    defaultParameters,
    parameters
  ))}`;

  $.get(url, success);
  /* Mocking out the API calls
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
  } else if (endpoint === '/maintenance/actionrepository/findbymodelyearid/') {
    success({
"actionHolder": [{
        "id": 563663,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 0,
        "intervalMonth": 1,
        "frequency": 4,
        "action": "Check operation",
        "item": "Lighting",
        "itemDescription": "The vehicle\u0027s electrical illumination.",
        "laborUnits": 0.0,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563673,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 0,
        "intervalMonth": 6,
        "frequency": 4,
        "action": "Inspect",
        "item": "Drive belt(s)",
        "itemDescription": "A belt that transfers the rotation of the engine through the crankshaft pulley to drive various devices, such as the alternator, water pump, air conditioning compressor or power steering pump.",
        "laborUnits": 0.0,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563714,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 30000,
        "frequency": 4,
        "action": "Inspect",
        "item": "Exhaust system",
        "itemDescription": "A system of tubing that routes exhaust gases from the exhaust manifold to the rear of the car and into the air. The exhaust system includes catalytic converters and mufflers that help reduce air and noise pollution generated by an engine.",
        "laborUnits": 0.05,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563685,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 0,
        "intervalMonth": 6,
        "frequency": 4,
        "action": "Inspect/clean",
        "item": "Body water drains",
        "itemDescription": "Drain holes in strategic locations that provide an escape route for water that would otherwise remain trapped within a vehicle\u0027s body.",
        "laborUnits": 0.0,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563716,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 0,
        "intervalMonth": 6,
        "frequency": 4,
        "action": "Inspect & lubricate",
        "item": "Hinges, locks & latches",
        "itemDescription": "The devices that allow or prevent the opening of doors and hatches.",
        "laborUnits": 0.0,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563708,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 0,
        "intervalMonth": 6,
        "frequency": 4,
        "action": "Inspect & adjust air pressure",
        "item": "Spare tire",
        "itemDescription": "A full-size or compact-size extra wheel and tire stored on a vehicle for use when necessary.",
        "laborUnits": 0.0,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563720,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 60000,
        "frequency": 4,
        "action": "Inspect/replace",
        "item": "Wheel bearings",
        "itemDescription": "The assemblies that permit smooth rotation between the wheel hub and spindle.",
        "laborUnits": 0.8,
        "partUnits": 0.0,
        "driveType": "4WD",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563671,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 0,
        "intervalMonth": 6,
        "frequency": 4,
        "action": "Inspect/adjust",
        "item": "Parking brake",
        "itemDescription": "The mechanical brake connected by cables to either a ratcheting hand lever or foot pedal used to hold or apply a vehicle\u0027s rear and sometimes front brakes while left unattended or under conditions of hydraulic circuit failure. Sometimes referred to as the emergency brake.",
        "laborUnits": 0.0,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563677,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 15000,
        "frequency": 4,
        "action": "Inspect",
        "item": "Ball joints",
        "itemDescription": "Movable joints in the steering linkage and suspension system of a vehicle that permit rotating movement in any direction between the parts that are joined.",
        "laborUnits": 0.1,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563718,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 105000,
        "frequency": 3,
        "action": "Flush/replace",
        "item": "Coolant",
        "itemDescription": "Also known as \"antifreeze.\" A mixture of water and ethylene glycol that has both a higher boiling point and a lower freezing point than plain water.",
        "laborUnits": 0.7,
        "partUnits": 2.0,
        "partCostPerUnit": 8.0,
        "note1": "Green coolant only. Do not mix orange with green coolant.",
        "note2": "As equipped.",
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563657,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "AUTOMATIC",
        "intervalMileage": 15000,
        "frequency": 4,
        "action": "Inspect",
        "item": "Automatic transmission fluid",
        "itemDescription": "The fluid used for lubricating and cooling an automatic transmission.",
        "laborUnits": 0.02,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563698,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 5000,
        "frequency": 4,
        "action": "Rotate",
        "item": "Wheels & tires",
        "itemDescription": "A circular frame of hard material that may be solid or partly solid, is capable of  turning on an axle, and holds the rubber cushion that contains compressed air.",
        "laborUnits": 0.3,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563689,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 15000,
        "frequency": 4,
        "action": "Inspect & lubricate",
        "item": "Steering & suspension",
        "itemDescription": "A vehicle\u0027s steering is the collection of components that enable the operator to direct a vehicle in a desired direction. Suspension is the assemblage of joints, links and other components between a vehicle and its wheels.",
        "laborUnits": 0.2,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563667,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 0,
        "intervalMonth": 6,
        "frequency": 4,
        "action": "Check operation",
        "item": "Windshield wipers & washer",
        "itemDescription": "Motorized mechanical arms with rubber inserts used to wipe the windshield or back glass.  A small pump and reservoir that can direct a jet of cleaning solution at the windshield or back glass.",
        "laborUnits": 0.0,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563669,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 0,
        "intervalMonth": 6,
        "frequency": 4,
        "action": "Inspect",
        "item": "Battery",
        "itemDescription": "A box containing lead plates filled with a water and acid mixture that stores electricity generated by the alternator. It is the source of power for parts of the car that operate on electricity.",
        "laborUnits": 0.2,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563680,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 15000,
        "frequency": 4,
        "action": "Inspect",
        "item": "Brake system",
        "itemDescription": "A vehicle\u0027s stopping mechanism comprised of a pedal connected to a hydraulic master cylinder that can actuate clamping and/or expanding devices at all four wheels that slow or stop a vehicle\u0027s rolling motion.  Components in a basic brake system are the master cylinder, calipers and/or wheel cylinders, linings or pads or shoes, rotors and/or drums.",
        "laborUnits": 0.3,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563695,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 100000,
        "frequency": 4,
        "action": "Replace",
        "item": "PCV valve",
        "itemDescription": "Positive Crankcase Ventilation valve, an emissions related device that allows venting of combustion gases from the crankcase to the intake system rather than the atmosphere.",
        "laborUnits": 0.2,
        "partUnits": 1.0,
        "partCostPerUnit": 3.3,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563651,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "AUTOMATIC",
        "intervalMileage": 30000,
        "frequency": 4,
        "action": "Change",
        "item": "Automatic transmission fluid",
        "itemDescription": "The fluid used for lubricating and cooling an automatic transmission.",
        "laborUnits": 0.5,
        "partUnits": 7.0,
        "partCostPerUnit": 2.8,
        "note1": "If equipped with AX4S, 4R70W, 4R100, 4F27E, or 4F0N",
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563700,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 45000,
        "frequency": 3,
        "action": "Flush/replace",
        "item": "Coolant",
        "itemDescription": "Also known as \"antifreeze.\" A mixture of water and ethylene glycol that has both a higher boiling point and a lower freezing point than plain water.",
        "laborUnits": 0.7,
        "partUnits": 2.0,
        "partCostPerUnit": 8.0,
        "note1": "Green coolant only. Do not mix orange with green coolant.",
        "note2": "As equipped.",
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563702,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 75000,
        "frequency": 3,
        "action": "Flush/replace",
        "item": "Coolant",
        "itemDescription": "Also known as \"antifreeze.\" A mixture of water and ethylene glycol that has both a higher boiling point and a lower freezing point than plain water.",
        "laborUnits": 0.7,
        "partUnits": 2.0,
        "partCostPerUnit": 8.0,
        "note1": "Green coolant only. Do not mix orange with green coolant.",
        "note2": "As equipped.",
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563684,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 0,
        "intervalMonth": 1,
        "frequency": 4,
        "action": "Inspect",
        "item": "Wheels & tires",
        "itemDescription": "A circular frame of hard material that may be solid or partly solid, is capable of  turning on an axle, and holds the rubber cushion that contains compressed air.",
        "laborUnits": 0.0,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563662,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 0,
        "intervalMonth": 6,
        "frequency": 4,
        "action": "Check level",
        "item": "Power steering fluid",
        "itemDescription": "Hydraulic fluid used in a power steering system.",
        "laborUnits": 0.0,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563674,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 0,
        "intervalMonth": 6,
        "frequency": 4,
        "action": "Inspect",
        "item": "Coolant",
        "itemDescription": "Also known as \"antifreeze.\" A mixture of water and ethylene glycol that has both a higher boiling point and a lower freezing point than plain water.",
        "laborUnits": 0.0,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563713,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 60000,
        "frequency": 4,
        "action": "Inspect/replace",
        "item": "Wheel bearings",
        "itemDescription": "The assemblies that permit smooth rotation between the wheel hub and spindle.",
        "laborUnits": 0.5,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563709,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 0,
        "intervalMonth": 1,
        "frequency": 4,
        "action": "Inspect & adjust air pressure",
        "item": "Wheels & tires",
        "itemDescription": "A circular frame of hard material that may be solid or partly solid, is capable of  turning on an axle, and holds the rubber cushion that contains compressed air.",
        "laborUnits": 0.0,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563686,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 0,
        "intervalMonth": 6,
        "frequency": 4,
        "action": "Inspect & lubricate",
        "item": "Weather strip",
        "itemDescription": "The rubber stripping around a vehicle\u0027s doors and hatches or their portals.",
        "laborUnits": 0.0,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563656,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 0,
        "intervalMonth": 1,
        "frequency": 4,
        "action": "Check level",
        "item": "Engine oil",
        "itemDescription": "A substance that lubricates and cools the moving parts of the engine and reduces corrosion and the formation of rust.",
        "laborUnits": 0.0,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563707,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 15000,
        "frequency": 4,
        "action": "Inspect boots & seals",
        "item": "Drive shaft",
        "itemDescription": "A sturdy metal tube with universal joints on either end that connects the engine to a differential on a rear-wheel or four-wheel drive vehicle.",
        "laborUnits": 0.05,
        "partUnits": 0.0,
        "note1": "As equipped.",
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563658,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 0,
        "intervalMonth": 6,
        "frequency": 4,
        "action": "Inspect & adjust fluid level",
        "item": "Coolant",
        "itemDescription": "Also known as \"antifreeze.\" A mixture of water and ethylene glycol that has both a higher boiling point and a lower freezing point than plain water.",
        "laborUnits": 0.0,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563678,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 15000,
        "frequency": 4,
        "action": "Inspect",
        "item": "Brake lines, hoses & connections",
        "itemDescription": "Tubes and their connections that carry brake fluid between the various components in a vehicle\u0027s brake system.",
        "laborUnits": 0.02,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563705,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 150000,
        "frequency": 4,
        "action": "Flush/replace",
        "item": "Coolant",
        "itemDescription": "Also known as \"antifreeze.\" A mixture of water and ethylene glycol that has both a higher boiling point and a lower freezing point than plain water.",
        "laborUnits": 0.7,
        "partUnits": 2.0,
        "partCostPerUnit": 8.0,
        "note1": "Orange coolant only. Do not mix orange with green coolant.",
        "note2": "As equipped.",
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563717,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 30000,
        "frequency": 4,
        "action": "Replace",
        "item": "Fuel filter",
        "itemDescription": "A replaceable metal or plastic canister that prevents particulate matter and most contaminants in the fuel from reaching the engine.",
        "laborUnits": 0.5,
        "partUnits": 1.0,
        "partCostPerUnit": 17.5,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563679,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 100000,
        "frequency": 4,
        "action": "Inspect",
        "item": "Drive belt(s)",
        "itemDescription": "A belt that transfers the rotation of the engine through the crankshaft pulley to drive various devices, such as the alternator, water pump, air conditioning compressor or power steering pump.",
        "laborUnits": 0.03,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563697,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 30000,
        "frequency": 4,
        "action": "Replace",
        "item": "Air filter",
        "itemDescription": "A device that filters incoming air fed to the engine.",
        "laborUnits": 0.2,
        "partUnits": 1.0,
        "partCostPerUnit": 22.6,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563650,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 5000,
        "frequency": 4,
        "action": "Change",
        "item": "Engine oil",
        "itemDescription": "A substance that lubricates and cools the moving parts of the engine and reduces corrosion and the formation of rust.",
        "laborUnits": 0.24,
        "partUnits": 6.0,
        "partCostPerUnit": 5.92,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563668,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 0,
        "intervalMonth": 6,
        "frequency": 4,
        "action": "Check operation",
        "item": "Warning lights",
        "itemDescription": "Lights on a vehicle\u0027s instrument panel that notify the operator of a malfunction or a circumstance needing attention.",
        "laborUnits": 0.0,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563694,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 100000,
        "frequency": 4,
        "action": "Replace",
        "item": "Spark plugs",
        "itemDescription": "Cables that carry a high-voltage electrical charge from the distributor cap or ignition coils to the spark plugs.",
        "laborUnits": 0.8,
        "partUnits": 8.0,
        "partCostPerUnit": 5.4,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563652,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 150000,
        "frequency": 4,
        "action": "Change",
        "item": "Rear differential fluid",
        "itemDescription": "Lubricant that permits quiet and low friction operation of the differential. Can be gear oil, transmission fluid, or a more specialized fluid specified by the manufacturer.",
        "laborUnits": 0.5,
        "partUnits": 3.5,
        "partCostPerUnit": 6.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563692,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 5000,
        "frequency": 4,
        "action": "Replace",
        "item": "Oil filter",
        "itemDescription": "A cartridge-filled canister placed in an engine\u0027s lubricating system to strain dirt and abrasive materials out of the oil.",
        "laborUnits": 0.1,
        "partUnits": 1.0,
        "partCostPerUnit": 5.9,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }, {
        "id": 563654,
        "engineCode": "8VNAG4.6",
        "transmissionCode": "ALL",
        "intervalMileage": 0,
        "intervalMonth": 1,
        "frequency": 4,
        "action": "Check fluid level",
        "item": "Windshield washer",
        "itemDescription": "A small pump and reservoir that can direct a jet of cleaning solution at the windshield or back glass.",
        "laborUnits": 0.0,
        "partUnits": 0.0,
        "driveType": "ALL",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }]
    });
  } else if (endpoint === '/maintenance/reacallrepository/findbymodelyearid/') {
    success({
"recallHolder": [{
        "id": 169008,
        "recallNumber": "02V313000",
        "componentDescription": "POWER TRAIN:AUTOMATIC TRANSMISSION",
        "manufacturerRecallNumber": "02S43",
        "manufacturedTo": "2002-11-10",
        "numberOfVehiclesAffected": "25",
        "influencedBy": "MFR",
        "defectConsequence": "THIS COULD RESULT  RESULTING IN INCORRECT GEAR INDICATION.",
        "defectCorrectiveAction": "DEALERS WILL ADD A STRAP TO THE SHIFT CABLE ADJUSTER TO PREVENT THE SHIFT CABLE FROM BECOMING DISLODGED.   FORD HAS NOT YET PROVIDED AN OWNER NOTIFICATION SCHEDULE FOR THIS CAMPAIGN.   OWNERS WHO DO NOT RECEIVE THE FREE REMEDY  WITHIN A REASONABLE TIME SHOULD CONTACT FORD AT 1-866-436-7332.",
        "defectDescription": "ON CERTAIN SPORT UTILITY VEHICLES, THE TRANSMISSION SHIFT CABLE CAN BECOME DISLODGED FROM THE SHIFT CABLE BRACKET.",
        "modelYear": "/api/vehicle/modelyearrepository/findbyid?id=100502677"
    }]
    });
  } else if (endpoint === '/maintenance/servicebulletinrepository/findbymodelyearid/') {
    success({

    "serviceBulletinHolder": [{
        "id": 190058,
        "bulletinNumber": "TSB-08-19-3",
        "bulletinDateMonth": "905",
        "componentNumber": 106200,
        "componentDescription": "POWER TRAIN:AXLE ASSEMBLY:AXLE SHAFT",
        "nhtsaItemNumber": "10028736",
        "modelYearId": 100502677,
        "summaryText": "FORD: SOME VEHICLES MAY EXHIBIT OIL SEPARATION FROM THE INTERNAL LUBE FOUND IN THE UNITIZED CARTRIDGE SEAL. OIL SEPARATION APPEARS TO BE AND IS OFTEN MISDIAGNOSED, AS AN AXLE LUBE LEAK.   ( NHTSA ITEM NUMBER - 10028736 )"
    }, {
        "id": 190059,
        "bulletinNumber": "TSB-08-19-3",
        "bulletinDateMonth": "905",
        "componentNumber": 106220,
        "componentDescription": "POWER TRAIN:AXLE ASSEMBLY:AXLE SHAFT:SEAL",
        "nhtsaItemNumber": "10028736",
        "modelYearId": 100502677,
        "summaryText": "FORD: SOME VEHICLES MAY EXHIBIT OIL SEPARATION FROM THE INTERNAL LUBE FOUND IN THE UNITIZED CARTRIDGE SEAL. OIL SEPARATION APPEARS TO BE AND IS OFTEN MISDIAGNOSED, AS AN AXLE LUBE LEAK.   ( NHTSA ITEM NUMBER - 10028736 )"
    }, {
        "id": 168231,
        "bulletinNumber": "0706",
        "bulletinDateMonth": "705",
        "componentNumber": 980000,
        "componentDescription": "OTHER",
        "nhtsaItemNumber": "10021944",
        "modelYearId": 100502677,
        "summaryText": "EXTENDED WARRANTY COVERAGE ON IGNITION COIL ASSEMBLIES.   ( NHTSA ITEM NUMBER - 10021944 )"
    }, {
        "id": 158006,
        "bulletinNumber": "05213",
        "bulletinDateMonth": "601",
        "componentNumber": 91200,
        "componentDescription": "FUEL SYSTEM, OTHER:STORAGE:FUEL GAUGE SYSTEM",
        "nhtsaItemNumber": "10019379",
        "modelYearId": 100502677,
        "summaryText": "MALFUNCTION INDICATOR LAMP ON WITH PCM DIAGNOSTIC TROUBLE CODE P0463 AND/OR IC DIAGNOSTIC TROUBLE CODE B1201 - FUEL GAUGE DROPS TO EMPTY OR SLOW TO UPDATE AFTER REFUELING.   ( NHTSA ITEM NUMBER - 10019379 )"
    }, {
        "id": 158257,
        "bulletinNumber": "0637",
        "bulletinDateMonth": "601",
        "componentNumber": 190000,
        "componentDescription": "TIRES",
        "nhtsaItemNumber": "10019384",
        "modelYearId": 100502677,
        "summaryText": "LOW TIRE INDICATOR ON - TPMS SYSTEM SENSOR WAKE UP.   ( NHTSA ITEM NUMBER - 10019384 )"
    }]
    });
  }
    */
};



$(() => {
  // ============================================
  // Define helpful jQuery element selectors

  const $form = $('#car-form');
  const $formErrorAlert = $('#car-form-error-alert');

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

  const $resultElements = {
    wrapper: $('#results-wrapper'),
    maintenanceSchedules: $('#results-maintenance-schedules'),
    recalls: $('#results-recalls'),
    bulletins: $('#results-bulletins'),
  };

  // ============================================
  // Helper functions (could go in another file but I've chosen to leave them in
  // here for simplicity)

  const disableField = ($el) => {
    $el.prop('disabled', true);
  };

  const enableField = ($el) => {
    $el.prop('disabled', false);
  };

  const showResults = () => {
    $resultElements.wrapper.show();
  };

  const hideResults = () => {
    $resultElements.wrapper.hide();
  };

  const showFormError = (html) => {
    $formErrorAlert.html(html);
    $formErrorAlert.show();
  };

  const hideFormError = () => {
    $formErrorAlert.hide()
  };

  const handleInvalidField = ($el) => {
    $el.parent().removeClass('has-success');
    $el.parent().addClass('has-danger');
  };

  const handleValidField = ($el) => {
    $el.parent().removeClass('has-danger');
    $el.parent().addClass('has-success');
  };

  // ============================================
  // Handle all changes in the form

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
              console.log('SUCCESS');
              console.log('data', data);
              const makeOptions = data.makes.map((make) => (
                `<option value="${make.niceName}">${make.name}</option>`
              ))
              makeOptions.unshift('<option value="none">None</option>')

              $formElements.make.html(makeOptions);
              resetFormTo($formElements.make);
            },
          });

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
              modelOptions.unshift('<option value="none">None</option>')

              $formElements.model.html(modelOptions);
              resetFormTo($formElements.model);
            },
          });
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
              view: 'basic',
            },
            success: (data) => {
              const styleOptions = data.styles.map((style) => (
                `<option value="${style.id}">${style.name}</option>`
              ))
              styleOptions.unshift('<option value="none">None</option>')

              $formElements.style.html(styleOptions);
              resetFormTo($formElements.style);
            },
          });
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
          edmundAPIRequest({
            endpoint: `/styles/${style}/engines`,
            parameters: {
              view: 'basic',
            },
            success: (data) => {
              console.log('engine data', data);
              const engineOptions = data.engines.map((engine) => (
                `<option value="${engine.id}">${engine.cylinder} Cyl ${engine.size} Litre</option>`
              ))
              engineOptions.unshift('<option value="none">None</option>')

              $formElements.engine.html(engineOptions);

              // I could enable both the transmission field and the engine field at
              // this point but choose not to for simplicity.
              resetFormTo($formElements.engine);
            },
          });
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

          edmundAPIRequest({
            endpoint: `/styles/${styleId}/transmissions`,
            parameters: {
              view: 'basic',
            },
            success: (data) => {
              const transmissionOptions = data.transmissions.map((transmission) => (
                `<option value="${transmission.id}">${transmission.name} - ${transmission.transmissionType}</option>`
              ))
              transmissionOptions.unshift('<option value="none">None</option>')

              $formElements.transmission.html(transmissionOptions);
              resetFormTo($formElements.transmission);
            },
          });
        },
      });
    },
    transmission: function () {
      fieldChangeHandler({
        val: $(this).val(),
        backtrack: () => {
          resetFormTo($formElements.transmission);
        },
        proceed: () => {},
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

  hideResults();
  hideFormError();
  resetFormTo($formElements.year);

  // ============================================
  // Year

  // Populate the Year field
  const years = range(2017, 1989).map((year) => (
    `<option value="${year}">${year}</option>`
  ));
  years.unshift('<option value="none">None</option>')
  $formElements.year.html(years);

  // ============================================
  // Form

  const validateForm = (onValid) => {
    const nonSelectFormElements = [
      'mileage',
      'zipcode',
    ];

    let errorHtml = '';
    let val;

    // None of the select fields can be 'none'
    for (key in $formElements) {
      if (!nonSelectFormElements.includes(key)) {
        val = $formElements[key].val();
        if (val === 'none' || val === null) {
          // Invalid field state!
          errorHtml += `<p>Please select a ${key}</p>`;
          handleInvalidField($formElements[key]);
        } else {
          handleValidField($formElements[key]);
        }
      }
    }

    // mileage
    const mileage = $formElements.mileage.val();
    if (mileage === '' || (!Number.parseInt(mileage) && Number.parseInt(mileage) !== 0)) {
      // Invalid field state!
      errorHtml += `<p>Please enter your mileage</p>`;
      handleInvalidField($formElements.mileage);
    } else {
      handleValidField($formElements.mileage);
    }

    // zipocde
    const zipcode = $formElements.zipcode.val();
    if (zipcode === '' || !Number.parseInt(zipcode)) {
      // Invalid field state!
      errorHtml += `<p>Please enter your zip code</p>`;
      handleInvalidField($formElements.zipcode);
    } else {
      handleValidField($formElements.zipcode);
    }

    if (errorHtml !== '') {
      showFormError(errorHtml);
    } else {
      onValid();
    }
  };

  $form.on('submit', function (e) {
    e.preventDefault();
    hideResults();

    validateForm(() => {
      // Valid form
      const modelyearid = $formElements.style.val();

      const totalAPIRequests = 3;
      let apiResponsesReceived = 0;

      edmundAPIRequest({
        endpoint: '/maintenance/actionrepository/findbymodelyearid/',
        parameters: {
          modelyearid,
        },
        success: (data) => {
          apiResponsesReceived += 1;

          const maintenanceScheduleList = data.actionHolder.map((action) => (
            `<li>${action.item} - ${action.itemDescription}</li>`
          ));
          $resultElements.maintenanceSchedules.html(`<ul>${maintenanceScheduleList.join('')}</ul>`);

          if (apiResponsesReceived === totalAPIRequests) {
            showResults();
          }
        },
      });

      edmundAPIRequest({
        endpoint: '/maintenance/reacallrepository/findbymodelyearid/',
        parameters: {
          modelyearid,
        },
        success: (data) => {
          apiResponsesReceived += 1;

          const recalls = data.recallHolder.map((recall) => (
            `
            <h5>${recall.recallNumber} - ${recall.componentDescription}</h5>
            <p><strong>${recall.defectConsequence}</strong></p>
            <p>${recall.defectCorrectiveAction}</p>
            `
          ));
          $resultElements.recalls.html(recalls.join(''));

          if (apiResponsesReceived === totalAPIRequests) {
            showResults();
          }
        },
      });

      edmundAPIRequest({
        endpoint: '/maintenance/servicebulletinrepository/findbymodelyearid/',
        parameters: {
          modelyearid,
        },
        success: (data) => {
          apiResponsesReceived += 1;

          const bulletins = data.serviceBulletinHolder.map((bulletin) => (
            `
            <h5>${bulletin.bulletinNumber} - ${bulletin.componentDescription}</h5>
            <p>${bulletin.summaryText}</p>
            `
          ));
          $resultElements.bulletins.html(bulletins.join(''));

          if (apiResponsesReceived === totalAPIRequests) {
            showResults();
          }
        },
      });
    });
  });
});

