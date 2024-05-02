/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3wlfwwwk15kwxax")

  collection.name = "history"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uojxnoc5",
    "name": "Driver",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3wlfwwwk15kwxax")

  collection.name = "History"

  // remove
  collection.schema.removeField("uojxnoc5")

  return dao.saveCollection(collection)
})
