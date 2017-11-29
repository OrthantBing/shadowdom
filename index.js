var metadata = {
        'id': arguments[0],
        'className': arguments[1],
        'tagName': arguments[2]
};
(function(metadata){
    //console.log(arguments[0]);
    // var metadata = {
    //     'id': arguments[0],
    //     'className': arguments[1],
    //     'tagName': arguments[2]
    // }
    var ShadowRoots = function(dom) {
        this.rootdom = dom;
        this.shadowRoots;
        this.shadowRootParents;
        this.allShadowRoots(dom);
        
    };

    ShadowRoots.prototype = function(){
        var _getNodeListUsingIterator = function(dom){
            let nodeIterator = document.createNodeIterator( dom, NodeFilter.SHOW_ALL, function(node){ 
                if (node.shadowRoot) {
                    return true;
                } 
            });
            var nodelist = [];
            var currentNode;
            while (currentNode = nodeIterator.nextNode()){
                nodelist.push(currentNode);
            }
            return nodelist;
        }

        return {
            allShadowRoots: function(dom){
                var nodelist = _getNodeListUsingIterator(document.body);
                for (var i = 0; i < nodelist.length; i+=1){
                    var insideShadow = nodelist[i].shadowRoot;
                    Array.prototype.push.apply(nodelist, _getNodeListUsingIterator(insideShadow))
                }
                this.shadowRootParents = nodelist;
                var returnnodes = nodelist.map(function(node){
                    return node.shadowRoot;
                })
                this.shadowRoots = returnnodes;
                return returnnodes;
            },
            getShadowRootUsingMetadata: function(metadata) {
                /* metadatainfo will be of the form
                 * {
                 *  id: '',
                 *  tagName: '',
                 *  className: '',
                 * }
                 * 
                 */
                 var metadatanames = Object.getOwnPropertyNames(metadata);
                 metadatanames = metadatanames.filter(function(val){
                     if(metadata[val]){
                         return true;
                     }
                 })
                 console.log(metadata);
                 var returnvalue = this.shadowRootParents.filter(function(node){
                     var bool = metadatanames.every(function(val){

                        return node[val] === metadata[val];
                     });
                     return bool;
                 })
                 return returnvalue;
            }
        }
    }();

    var shadowrootobj = new ShadowRoots(document.body);
    
    return shadowrootobj.getShadowRootUsingMetadata(metadata);
    //return shadowrootobj.shadowRoots;
})();

