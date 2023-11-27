const multer = require('multer');
const { readContracts } = require('../controllers/contracts');

//Configuración de subida de archivos con multer
//req, file, cb es el metodo que me permite aplicar la configuración
const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/avatars/')
    },
    filename: (req, file, cb) => {
        cb(null, 'avatar-'+Date.now()+'-'+file.originalname)
    }
});

const documentsStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/documents/')
    },
    filename: (req, file, cb) => {
        cb(null, 'document-'+Date.now()+'-'+file.originalname)
    }
});

const contractStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/contracts/')
    },
    filename: (req, file, cb) => {
        cb(null, 'contract-'+Date.now()+'-'+file.originalname)
    }
});

const contractModelStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/contracts_models/')
    },
    filename: (req, file, cb) => {
        cb(null, 'contract_model-'+Date.now()+'-'+file.originalname)
    }
});

const signatureStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/signature/')
    },
    filename: (req, file, cb) => {
        cb(null, 'signature-'+Date.now()+'-'+file.originalname)
    }
});

const fingerprintStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/fingerprint/')
    },
    filename: (req, file, cb) => {
        cb(null, 'fingerprint-'+Date.now()+'-'+file.originalname)
    }
});


const uploads = async(req, res, next) => {
    if (req.params.type == 'contract_model') return multer({contractModelStorage});
    else if (req.params.type == 'contract') return multer({contractStorage});
    else if (req.params.type == 'signature') return multer({signatureStorage});
    else if (req.params.type == 'fingerprint') return multer({fingerprintStorage});
    else if  (req.params.type == 'avatar') return multer({avatarStorage});
    else if  (req.params.type == 'bank_statement' || req.params.type == 'national_id' || req.params.type == 'rut' || req.params.type == 'camara_comercio') return multer({documentsStorage});
};

module.exports = uploads;