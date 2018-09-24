module.exports=function(app){

    var todo =[{title:'milk', note : 'organic'},{title:'kids',note:'school'}];
    app.get('/hello',function(req,res){
       res.json(todo);
    })
}
