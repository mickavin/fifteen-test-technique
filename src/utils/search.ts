export default (text: string, items: Array<Object>, arrayOfObject: Array<any>) => {
    const isPositioned = (item: any, indexedObject: any) => {
        if(!indexedObject?.[item.key]){
            return false
        } else if(item.type == 'number'){
            return indexedObject?.[item.key].toString().indexOf(text) > -1
        }  
        return indexedObject?.[item.key].toUpperCase().indexOf(text.toUpperCase()) > -1
    }
    if(text.length > 0){
        let filteredElements = []
        for(var i = 0; i < items.length; i++){
            let hasCompatibility = false
            arrayOfObject.forEach((item: any) => {
                if(item?.type && item?.key && isPositioned(item, items[i])) {
                    hasCompatibility = true
                }
            })
            
            if(hasCompatibility){
                filteredElements.push(items[i])
            }
        }
        return filteredElements
    }
    return items
}