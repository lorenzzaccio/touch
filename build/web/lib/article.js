            
            
var article = {
            
    index: window.localStorage.getItem("article:index"),

    init: function() {
        // initialize the storage index
        if (!article.index) {
            window.localStorage.setItem("article:index", article.index = 1);
        }

        // initialize the form
        
        // initialize the table and populate it with data stored in web storage
        if (window.localStorage.length - 1) {
            var stock_list = [], i, key;
            for (i = 0; i < window.localStorage.length; i++) {
                key = window.localStorage.key(i);
                if (/article\d+/.test(key)) {
                    stock_list.push(JSON.parse(window.localStorage.getItem(key)));
                }
            }

            if (stock_list.length) {
                stock_list
                    .sort(function(a, b) {
                        return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
                    })
                    .forEach(article.tableAdd);
            }
        }
        
    },
    storeAdd: function(entry) {
        entry.index = article.index;
        window.localStorage.setItem("article"+ entry.index, JSON.stringify(entry));
        window.localStorage.setItem("article:index", ++article.index);
        //console.log("new entry ...");
    },
    storeRead:function(entry){
        
    },
    storeEdit: function(entry) {},
    storeUpdate: function(entry) {
        window.localStorage.setItem("article"+ entry.index, JSON.stringify(entry));
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
                if (/article+/.test(key)) {
                    window.localStorage.removeItem(key);
                }
            }
      }
    
            if (article.index) 
                window.localStorage.setItem("article:index", article.index = 1);            
    },
    storeRemoveAll2: function(entry) {
        var  key,j,i;
        i=0;
        j=0;
        if (localStorage.length - 1) {
            var i, key;
            var length = localStorage.length;
            for (i = 0; i < length; i++) {
                key = localStorage.key(i);
                if (/article+/.test(key)) {
                    localStorage.removeItem(key);//(window.localStorage.getItem(key)));
                }
                //if(i==length-5)
                //    alert("i="+i);
                //i++;
            } 
            if (article.index) 
                localStorage.setItem("article:index", article.index = 1);
        }
            
    },
    getLength:function(entry){
        var length=0;
      if (window.localStorage.length - 1) {
            var i, key;
            for (i = 0; i < window.localStorage.length; i++) {
                key = window.localStorage.key(i);
                if (/article\d+/.test(key)) {
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
            if (entry.hasOwnProperty(key)) {
                arrow[j] = entry[key];
                j=j+1;
            }
        }
        art_array[entry.index-1] = arrow;
    },
    tableEdit: function(entry) {},
    tableRemove: function(entry) {}
    
};