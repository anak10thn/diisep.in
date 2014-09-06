module.exports = function(app,port,superagent,fs,google){
    
    app.get('/',function(req, res){
        return res.render('index',{"title":"Search engine"});
    });
    
    app.post('/search',function(req, res){
        var q = req.body.q,
            aq = req.body.aq,
            ftype = req.body.ftype,
            page = req.body.page;
        console.log(q);
        google.resultsPerPage = 25;
        var nextCounter = 0;
        var linkData = [];
        function finish(){
            res.send(linkData);
        }
        google(aq+' '+q+' filetype:'+ftype, function(err, next, links){
            if (err) console.error(err);

            for (var i = 0; i < links.length; ++i) {
                linkData.push(links[i]);
                //console.log(links[i].title + ' - ' + links[i].link); //link.href is an alias for link.link
                //console.log(links[i].description + "\n");
            }
            
            if (nextCounter < page) {
                if (next) {
                  nextCounter += 1;
                  next();
                }
            }
            else{
                finish();
            }
        });
    });
};