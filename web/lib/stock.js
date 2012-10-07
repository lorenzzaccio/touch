            
            
var stock = {
            
    index: window.localStorage.getItem("stock:index"),

    init: function() {
        arrec_index=0;
        // initialize the storage index
        if (!stock.index) {
            window.localStorage.setItem("stock:index", stock.index = 1);
        }

        // initialize the form
        

        // initialize the table and populate it with data stored in web storage
        if (window.localStorage.length - 1) {
            var stock_list = [], i, key;
            for (i = 0; i < window.localStorage.length; i++) {
                key = window.localStorage.key(i);
                if (/stock\d+/.test(key)) {
                    stock_list.push(JSON.parse(window.localStorage.getItem(key)));
                }
            }

            if (stock_list.length) {
                stock_list
                    .sort(function(a, b) {
                        return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
                    })
                    .forEach(stock.tableAdd);
            }
        }
        
    },
    storeAdd: function(entry) {
        entry.index = stock.index;
        window.localStorage.setItem("stock"+ entry.index, JSON.stringify(entry));
        window.localStorage.setItem("stock:index", ++stock.index);
        //console.log("new entry ...");
    },
    storeRead:function(entry){
        
    },
    storeEdit: function(entry) {},
    storeUpdate: function(entry) {
        window.localStorage.setItem("stock"+ entry.index, JSON.stringify(entry));
    },
    storeRemoveAll: function(entry) {
        var  key,j,i;
        j=0;
        i=0;
        
        if (window.localStorage.length - 1) {
            var i, key;
            var l=window.localStorage.length;
            for (i = 0; i < l; i++) {
                key = window.localStorage.key(i);
                if (/stock+/.test(key)) {
                    window.localStorage.removeItem(key);
                }
            }
      }
            if (stock.index) 
                window.localStorage.setItem("stock:index", stock.index = 1);

    },
    remove : function(entry){
        j=0;
        i=0;
        
        if (window.localStorage.length - 1) {
            var stock_list = [], i, key;
            var l=window.localStorage.length;
            for (i = 0; i < l; i++) {
                key = window.localStorage.key(i);
                if (/stock\d+/.test(key)) {
                var obj = JSON.parse(window.localStorage.getItem(key));
                var toto = obj.id;
                
        
                //alert(toto);
                if(toto==entry){
                    window.localStorage.removeItem(key);
                    //obj.order = 200;
                    //window.localStorage.setItem(key, stock.order = 200);
                    //window.localStorage.setItem("stock:index", --stock.index);
                }
                
                }
            }
      }
      
      
    },
    getLength:function(){
      var length=0;
      if (window.localStorage.length - 1) {
            var i, key;
            for (i = 0; i < window.localStorage.length; i++) {
                key = window.localStorage.key(i);
                if (/stock+/.test(key)) {
                    length++;
                }
            }
      }
      return length;
    },
    tableAdd: function(entry) {
        var arrow  = [];
        var  key,j;
        j=0;
        for (key in entry) {
            if (entry.hasOwnProperty(key) ){//&& !(key == -1) && !(key =="index")) {
                arrow[j] = entry[key];
                j=j+1;
            }
        }
        //arrec[entry.index-1] = arrow;
        arrec[arrec_index] = arrow;
        arrec_index++;
    },
    tableEdit: function(entry) {},
    tableRemove: function(entry) {}
    
};