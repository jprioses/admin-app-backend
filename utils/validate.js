const validator = require("validator");

const validateNewUserData = (data) => {
  
    return (
        (data.name1 && !validator.isEmpty(data.name1)) &&
        (data.surename1 && !validator.isEmpty(data.surename1) )&&
        (data.surename2 && !validator.isEmpty(data.surename2) )&&
        (data.national_id && !validator.isEmpty(data.national_id)) &&
        (data.role && !validator.isEmpty(data.role)) 
    );
    
}

module.exports = {
    validateNewUserData,
}