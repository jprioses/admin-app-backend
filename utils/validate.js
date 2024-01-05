const validator = require("validator");

const validateNewUserData = (data) => {
  
    return (
        (data.name1 && !validator.isEmpty(data.name1)) &&
        (data.surname1 && !validator.isEmpty(data.surname1) )&&
        (data.surname2 && !validator.isEmpty(data.surname2) )&&
        (data.national_id && !validator.isEmpty(data.national_id)) &&
        (data.role && !validator.isEmpty(data.role)) 
    );
    
};

const validateNewContractsData = (data) => {
    return (
        (data.value && !validator.isEmpty(data.value)) &&
        (data.date_init && !validator.isEmpty(data.date_init) )&&
        (data.date_final && !validator.isEmpty(date_final) )&&
        (data.type && !validator.isEmpty(data.type)) &&
        (data.ref_buildings && !validator.isEmpty(ref_buildings)) &&
        (data.ref_companies && !validator.isEmpty(ref_companies)) && 
        (data.ref_users && !validator.isEmpty(ref_users))
    );
};

module.exports = {
    validateNewUserData,
    validateNewContractsData
};