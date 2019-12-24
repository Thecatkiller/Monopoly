// Manejo de Errores
function BFPException(message, object, page) {
    var err = new Error(message);
    Object.setPrototypeOf(err, BFPException.prototype);

    err.object = object;
    err.page = page;

    return err;
}

BFPException.prototype = Object.create(
    Error.prototype,
    { name: { value: 'BFP.jextension.Error', enumerable: false } }
);


