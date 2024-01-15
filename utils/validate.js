const validator = require("validator");

const validateUserData = (data) => {
    return (
        (data.name1 && !validator.isEmpty(data.name1)) &&
        (data.surname1 && !validator.isEmpty(data.surname1) )&&
        (data.surname2 && !validator.isEmpty(data.surname2) )&&
        (data.national_id && !validator.isEmpty(data.national_id)) &&
        (data.role && !validator.isEmpty(data.role)) &&
        (data.status && !validator.isEmpty(data.status)) 
    );
    
};

const validateContractsData = (data) => {
    console.log(data)
    return (
        (data.value && !validator.isEmpty(data.value)) &&
        (data.date_init && !validator.isEmpty(data.date_init) )&&
        (data.date_final && !validator.isEmpty(data.date_final) )&&
        (data.type && !validator.isEmpty(data.type)) &&
        (data.ref_buildings && !validator.isEmpty(data.ref_buildings)) &&
        (data.ref_companies && !validator.isEmpty(data.ref_companies)) && 
        (data.ref_users && !validator.isEmpty(data.ref_users)) &&
        (data.status && !validator.isEmpty(data.status)) 
    );
};

const validateCompaniesData = (data) => {
    return (
        (data.name1 && !validator.isEmpty(data.name1)) &&
        (data.surname1 && !validator.isEmpty(data.surname1) )&&
        (data.surname2 && !validator.isEmpty(data.surname2) )&&
        (data.national_id && !validator.isEmpty(data.national_id)) &&
        (data.nit_id && !validator.isEmpty(data.nit_id)) &&
        (data.commercial_name && !validator.isEmpty(data.commercial_name)) &&
        (data.activity && !validator.isEmpty(data.activity)) 
    );
}

const validateBuildingsData = (data) => {
    return (
        (data.name && !validator.isEmpty(data.name)) &&
        (data.nit_id && !validator.isEmpty(data.nit_id))
    );
}

const validateCredentialsData = (data) => {
    console.log(data)
    return (
        (data.username && !validator.isEmpty(data.username)) &&
        (data.password && !validator.isEmpty(data.password)) && 
        (data.password_confirm && !validator.isEmpty(data.password_confirm)) &&
        (data.type && !validator.isEmpty(data.type))
    );
}

module.exports = {
    validateUserData,
    validateContractsData,
    validateBuildingsData,
    validateCompaniesData,
    validateCredentialsData
};