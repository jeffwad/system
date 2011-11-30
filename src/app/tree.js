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
        "uuid"    : "1D25B120-787F-4614-AAEF-417888EEE3DC",
        "type"    : "apps",
        "object"  : "header",
        "children": [
          {
            "uuid"    : "A7E460C3-8EF7-4857-9662-7DFDFBB103C1",
            "type"    : "components",
            "region"  : "logo",
            "object"  : "image",
            "children": []
          },
          {
            "uuid"    : "BA68E0B0-BE11-4E22-B3ED-014DB1B17057",
            "type"    : "components",
            "region"  : "header",
            "object"  : "text",
            "children": []
          },
          {
            "uuid"    : "6979876D-1626-4C69-B9C5-F51B64F4D2AF",
            "type"    : "components",
            "region"  : "description",
            "object"  : "text",
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
            "publish" : "page.home",
            "binding" : "home",
            "object"  : "link",
            "children": []
          },
          {
            "uuid"    : "8EA22A22-37F4-4A78-8406-B9BB9F8BDE45",
            "type"    : "components",
            "publish" : "page.about",
            "binding" : "about",
            "object"  : "link",
            "children": []
          },
          {
            "uuid"    : "7CE36D86-63B6-46DD-A645-3EA16D90DB99",
            "type"    : "components",
            "publish" : "page.contact",
            "binding" : "contact",
            "object"  : "link",
            "children": []
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
            "subscribe"     : "page.home",
            "object"        : "record",
            "stateDataUuids": ["01234567890"],
            "children"      : [
              {
                "uuid"    : "BA68E0B0-BE11-4E22-B3ED-014DB1B17057",
                "type"    : "components",
                "object"  : "text",
                "binding" : "name",
                "children": []
              },
              {
                "uuid"    : "BA68E0B0-BE11-4E22-B3ED-014DB1B17057",
                "type"    : "components",
                "object"  : "text",
                "binding" : "title",
                "children": []
              },
              {
                "uuid"    : "BA68E0B0-BE11-4E22-B3ED-014DB1B17057",
                "type"    : "components",
                "object"  : "text",
                "binding" : "description",
                "children": []
              }
            ]
          },
          {
            "uuid"      : "2BB59B38-ACF6-4FE1-9A32-234834B87BC7",
            "type"      : "layouts",
            "subscribe" : "page.about",
            "object"    : "split-horizontal",
            "children"  : [
              {
                "uuid"    : "29C1403F-9357-446B-AFCC-DE7A3FECC6E6",
                "type"    : "apps",
                "limit"   : "10",
                "object"  : "list",
                "children": []
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
            "subscribe"     : "page.contact",
            "object"        : "record",
            "stateDataUuids": ["09876543210"],
            "children"      : []
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