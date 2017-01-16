global.modulePath = function(module, part){
    var rootPath = require('path').resolve(__dirname);
    var filePath = {
        '$root': `${module}`,
        'controller': `controllers/${module}`,
        'helper': `helpers/${module}`,
        'middleware': `middlewares/${module}`,
        'model:structured': `models/structured/${module}`,
        'model:unstructured': `models/unstructured/${module}`,
        'repo:structured': `models/structured/${module}/${module}.repository`,
        'repo:unstructured': `models/unstructured/${module}/${module}.repository`,
        'route': `routes/${module}`
    };

    if(!part){ part = '$root'; }

    return `${rootPath}/${filePath[part]}`;
};
