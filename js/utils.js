module.exports = {
    nicename: function(str){
        str = str.replace(/-/,' ').toLowerCase();
        return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
            function(s){
            return s.toUpperCase();
        });
    }
}