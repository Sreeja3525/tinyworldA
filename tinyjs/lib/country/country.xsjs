async function saveCountry(country) {
   var conn = await $.hdb.getConnection();
   var output = JSON.stringify(country);
   var fnCreateCountry = await conn.loadProcedure("tinyworldA.tinydb::createCountry");
   var result = await fnCreateCountry({IM_COUNTRY: country.name, IM_CONTINENT: country.partof});
   
   await conn.commit();
   conn.close();
   if (result && result.EX_ERROR !== null) { return result.EX_ERROR;} 
   else { return output; }
}

var country = {
   name: $.request.parameters.get("name"),
   partof: $.request.parameters.get("continent")
};
// validate the inputs here!

var output = await saveCountry(country);

$.response.contentType = "application/json";
$.response.setBody(output);