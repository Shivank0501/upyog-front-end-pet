export const newConfig =[
        
    {
        "head": "Owner DETAILS",
        "body": [
            {
                "component": "PTROwnerDetails",
                "withoutLabel": true,
                "key": "owners",
                "type": "component"
            }
        ]
    },

    {
        "head": "PET DETAILS",
        "body": [
            {
                "component": "PTRPetdetails",
                "withoutLabel": true,
                "key": "pet",
                "type": "component"
            }
        ]
    },
    {
        "head": "Address DETAILS",
        "body": [
            {
                "component": "PTRSelectAddress",
                "withoutLabel": true,
                "key": "pata",
                "type": "component"
            }
        ]
    },

    // {
    //     "head": "ES_NEW_APPLICATION_LOCATION_DETAILS",
    //     "body": [
    //         {
    //             "route": "map",
    //             "component": "PTSelectGeolocation",
    //             "nextStep": "pincode",
    //             "hideInEmployee": true,
    //             "key": "address",
    //             "texts": {
    //                 "header": "PT_GEOLOCATON_HEADER",
    //                 "cardText": "PT_GEOLOCATION_TEXT",
    //                 "nextText": "PT_COMMON_NEXT",
    //                 "skipAndContinueText": "CORE_COMMON_SKIP_CONTINUE"
    //             }
    //         },
    //         {
    //             "route": "pincode",
    //             "component": "PTSelectPincode",
    //             "texts": {
    //                 "headerCaption": "PT_PROPERTY_LOCATION_CAPTION",
    //                 "header": "PT_PINCODE_LABEL",
    //                 "cardText": "PT_PINCODE_TEXT",
    //                 "submitBarLabel": "PT_COMMON_NEXT",
    //                 "skipText": "CORE_COMMON_SKIP_CONTINUE"
    //             },
    //             "withoutLabel": true,
    //             "key": "address",
    //             "nextStep": "address",
    //             "type": "component"
    //         },
    //         {
    //             "route": "address",
    //             "component": "PTSelectAddress",
    //             "withoutLabel": true,
    //             "texts": {
    //                 "headerCaption": "PT_PROPERTY_LOCATION_CAPTION",
    //                 "header": "CS_FILE_APPLICATION_PROPERTY_LOCATION_ADDRESS_TEXT",
    //                 "cardText": "CS_FILE_APPLICATION_PROPERTY_LOCATION_CITY_MOHALLA_TEXT",
    //                 "submitBarLabel": "PT_COMMON_NEXT"
    //             },
    //             "key": "address",
    //             "nextStep": "street",
    //             "isMandatory": true,
    //             "type": "component"
    //         },
    //         {
    //             "type": "component",
    //             "route": "street",
    //             "component": "PTSelectStreet",
    //             "key": "address",
    //             "withoutLabel": true,
    //             "texts": {
    //                 "headerCaption": "PT_PROPERTY_LOCATION_CAPTION",
    //                 "header": "CS_FILE_APPLICATION_PROPERTY_LOCATION_ADDRESS_TEXT",
    //                 "cardText": "PT_STREET_TEXT",
    //                 "submitBarLabel": "PT_COMMON_NEXT"
    //             },
    //             "nextStep": "landmark"
    //         },
    //         {
    //             "type": "component",
    //             "route": "landmark",
    //             "component": "PTSelectLandmark",
    //             "withoutLabel": true,
    //             "texts": {
    //                 "headerCaption": "PT_PROPERTY_LOCATION_CAPTION",
    //                 "header": "CS_FILE_APPLICATION_PROPERTY_LOCATION_PROVIDE_LANDMARK_TITLE",
    //                 "cardText": "CS_FILE_APPLICATION_PROPERTY_LOCATION_PROVIDE_LANDMARK_TEXT",
    //                 "submitBarLabel": "PT_COMMON_NEXT",
    //                 "skipText": "CORE_COMMON_SKIP_CONTINUE"
    //             },
    //             "key": "address",
    //             "nextStep": "proof",
    //             "hideInEmployee": true
    //         },
    //         {
    //             "type": "component",
    //             "route": "proof",
    //             "component": "Proof",
    //             "withoutLabel": true,
    //             "texts": {
    //                 "headerCaption": "PT_PROPERTY_LOCATION_CAPTION",
    //                 "header": "PT_PROOF_OF_ADDRESS_HEADER",
    //                 "cardText": "",
    //                 "nextText": "PT_COMMONS_NEXT",
    //                 "submitBarLabel": "PT_COMMONS_NEXT"
    //             },
    //             "key": "address",
    //             "nextStep": "owner-ship-details@0",
    //             "hideInEmployee": true
    //         }
    //     ]
    // },
   
    
];