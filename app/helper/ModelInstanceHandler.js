const instances = {};

export function addInstance(instanceName, instance)
{
    instances[instanceName]= instance;
}

export function getInstance(instanceName){
    return instances[instanceName]
}