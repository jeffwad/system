/*
  @name:        site

  @description: site model
                
  @author:      Simon Jefford
  
*/
"use strict";

exports.tree = {
  "uuid"   : "2BB06A26-2074-467B-A446-AB822F506162",
  "client" : {
    "uuid"  : "67092CAC-5035-46B0-9ED5-88E026EFDDFE"
  },
  "root"   : {
    "uuid"    : "BC1F88E6-DB02-466D-A3D2-43D28C73638A",
    "type"    : "layouts",
    "object"  : "split-vertical",
    "children": [
      {
        "uuid"        : "1D25B120-787F-4614-AAEF-417888EEE3DC",
        "type"        : "apps",
        "object"      : "header",
        "bindDataUuid": "A4F8EF8B-1C1A-4624-B175-F20452C9EF48", 
        "children": [
          {
            "uuid"    : "A7E460C3-8EF7-4857-9662-7DFDFBB103C1",
            "type"    : "components",
            "region"  : "logo",
            "object"  : "image",
            "binding" : "logo",
            "children": []
          },
          {
            "uuid"    : "BA68E0B0-BE11-4E22-B3ED-014DB1B17057",
            "type"    : "components",
            "region"  : "header",
            "object"  : "text",
            "binding" : "h1",
            "children": []
          },
          {
            "uuid"    : "6979876D-1626-4C69-B9C5-F51B64F4D2AF",
            "type"    : "components",
            "region"  : "description",
            "object"  : "text",
            "binding" : "h2",
            "children": []
          }
        ]
      },
      {
        "uuid"        : "01B49886-1093-4FCC-A412-6413FDAB841C",
        "type"        : "apps",
        "object"      : "nav",
        "bindDataUuid": "A4F8EF8B-1C1A-4624-B175-F20452C9EF48", 
        "children"    : [
          {
            "uuid"    : "20BB4072-9AAE-486F-9DEC-872A5315767B",
            "type"    : "components",
            "publish" : "/",
            "object"  : "link",
            "binding" : "home",
            "children": [
              {
                "uuid"    : "6979876D-1626-4C69-B9C5-F51B64F4D2AF",
                "type"    : "components",
                "object"  : "text",
                "binding" : "home",
                "children": []
              }
            ]
          },
          {
            "uuid"    : "8EA22A22-37F4-4A78-8406-B9BB9F8BDE45",
            "type"    : "components",
            "publish" : "/about",
            "object"  : "link",
            "binding" : "about",
            "children": [
              {
                "uuid"    : "6979876D-1626-4C69-B9C5-F51B64F4D2AF",
                "type"    : "components",
                "object"  : "text",
                "binding" : "about",
                "children": []
              }
            ]
          },
          {
            "uuid"    : "7CE36D86-63B6-46DD-A645-3EA16D90DB99",
            "type"    : "components",
            "publish" : "/contact",
            "object"  : "link",
            "binding" : "contact",
            "children": [
              {
                "uuid"    : "6979876D-1626-4C69-B9C5-F51B64F4D2AF",
                "type"    : "components",
                "object"  : "text",
                "binding" : "contact",
                "children": []
              }
            ]
          }
        ]
      },
      {
        "uuid"    : "6D6579D7-7B46-402D-92C9-1E97CA4A2D32", 
        "type"    : "layouts",
        "object"  : "stack",
        "children": [
          {
            "uuid"          : "639D8FBC-BC49-4658-84C7-518BC00405E3",
            "type"          : "apps",
            "subscribe"     : "/",
            "object"        : "record",
            "bindDataUuid"  : "5A9580FC-234A-4C65-A066-5129E3827759",
            "children"      : [
              {
                "uuid"    : "BA68E0B0-BE11-4E22-B3ED-014DB1B17057",
                "type"    : "components",
                "object"  : "text",
                "binding" : "h1",
                "children": []
              },
              {
                "uuid"    : "BA68E0B0-BE11-4E22-B3ED-014DB1B17057",
                "type"    : "components",
                "object"  : "text",
                "binding" : "h2",
                "children": []
              }
            ]
          },
          {
            "uuid"      : "2BB59B38-ACF6-4FE1-9A32-234834B87BC7",
            "type"      : "layouts",
            "subscribe" : "/about",
            "object"    : "split-horizontal",
            "children"  : [
              {
                "uuid"           : "29C1403F-9357-446B-AFCC-DE7A3FECC6E6",
                "type"           : "apps",
                "limit"          : "10",
                "object"         : "list",
                "stateDataUuids" : ["DE05D629-72C8-4B81-A24D-A67C7931E9AB"],
                "children"       : [
                  /*{
                    "uuid"    : "",
                    "type"    : "components",
                    "object"  : "list-item",
                    "children": [
                      {
                        "uuid": "",
                        "type": "components",
                        "object": "link"
                      }
                    ]
                  }*/
                ]
              },
              {
                "uuid"    : "542CE94A-7F06-4AEF-9DFE-379B50E2F1FA",
                "type"    : "apps",
                "object"  : "record",
                "children": []
              }
            ]
          },
          {
            "uuid"          : "0BBBAF06-1A31-4074-B240-436AF5A04786",
            "type"          : "apps",
            "subscribe"     : "/contact",
            "object"        : "record",
            "bindDataUuid"  : "507432B8-B100-4B71-92F4-5D77126F6FBB",
            "children"      : [
              {
                "uuid"    : "BA68E0B0-BE11-4E22-B3ED-014DB1B17057",
                "type"    : "components",
                "object"  : "text",
                "binding" : "address",
                "children": []
              },
              {
                "uuid"    : "BA68E0B0-BE11-4E22-B3ED-014DB1B17057",
                "type"    : "components",
                "object"  : "text",
                "binding" : "map",
                "children": []
              }
            ]
          }
        ]
      },
      {
        "uuid"    : "1B83C58F-A9EC-455D-9248-FF27CF3567F5",
        "type"    : "apps",
        "object"  : "footer",
        "children": []
      }
    ]
  }

};