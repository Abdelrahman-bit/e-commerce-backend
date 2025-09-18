function getAllProducts(req, res){
    res.send('Get all products');
}

function addNewProduct(req, res){
    res.send('Add new procut');
}

function updateProduct(req, res){
    res.send('Update product');
}

function deleteProduct(req, res){
    res.send('delete product');
}

export {getAllProducts, addNewProduct, updateProduct, deleteProduct};