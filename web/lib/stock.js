/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var stock = {
    index: window.localStorage.getItem("stock:index"),
    //$table: document.getElementById("stock-table"),
    //$form: document.getElementById("contacts-form"),
    //$button_save: document.getElementById("stock-op-save"),
    //$button_discard: document.getElementById("stock-op-discard"),

    init: function() {
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
                if (/stock:\d+/.test(key)) {
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
        window.localStorage.setItem("stock:"+ entry.index, JSON.stringify(entry));
        window.localStorage.setItem("stock:index", ++stock.index);
        console.log("new entry ...");
    },
    storeRead:function(entry){
        
    },
    storeEdit: function(entry) {},
    storeRemove: function(entry) {},

    tableAdd: function(entry) {
        arrec[entry.index]=entry;
        var  key,j;
        j=0;
        for (key in entry) {
            if (entry.hasOwnProperty(key)) {
                arrec[j] = entry[key];
                j=j+1;
            }
        }
    },
    tableEdit: function(entry) {},
    tableRemove: function(entry) {}
    
};