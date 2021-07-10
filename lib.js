// Testing exceptions 
module.exports.registerUser = function(username) { 
    if (!username) throw new Error('Username is required.');
  
    return { id: new Date().getTime(), username: username }
  }