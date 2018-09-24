module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var widgetSchema = require('./widget.schema.server')();

    var widgetModel = mongoose.model('widgetModel', widgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget:updateWidget,
        deleteWidget:deleteWidget,
        reorderWidget:reorderWidget
    };
    return api;

    function createWidget(pageId, newWidget) {
        var deffered = q.defer();
        newWidget._page=pageId;
        widgetModel
               .find({_page:pageId})
               .then(function(widgets, err){
                   if(err)
                       deferred.abort(err);
                   else
                   {
                       var order = widgets.length;
                       newWidget.order=order;
                       widgetModel
                           .create(newWidget, function (err, newWidget) {
                               if(err) {
                                   deffered.abort(err);
                               } else {
                                   deffered.resolve(newWidget);
                               }
                           });
                   }});
        return deffered.promise;
    }

    function deleteWidget(widgetId) {
        var deferred = q.defer();
        widgetModel
            .remove({_id: widgetId}, function (err, widget) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(widget);
                }
            });
        return deferred.promise;
    }

    function updateWidget(widgetId,newwidget) {
        var deferred = q.defer();
        if (newwidget.type=="HEADING"){
        widgetModel
            .update(
            {
                _id:widgetId
            },
            {
                name: newwidget.name,
                type: newwidget.type,
                text:newwidget.text,
                order:newwidget.order,
                __page: newwidget._page,
                size:newwidget.size,
                dateCreated:newwidget.dateCreated
            })
            .then(function (widget, err) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(widget);
                }
            });}
            else if(newwidget.type == "HTML"){
            widgetModel
                .update(
                    {
                        _id:widgetId
                    },
                    {
                        type: newwidget.type,
                        text:newwidget.text,
                        __page: newwidget._page,
                        dateCreated:newwidget.dateCreated
                    })
                .then(function (widget, err) {
                    if(err) {
                        deferred.abort(err);
                    } else {
                        deferred.resolve(widget);
                    }
                });}
                else if(newwidget.type == "IMAGE"){
            widgetModel
                .update(
                    {
                        _id:widgetId
                    },
                    {
                        name: newwidget.name,
                        type: newwidget.type,
                        text:newwidget.text,
                        __page: newwidget._page,
                        url:newwidget.url,
                        width:newwidget.width,
                        dateCreated:newwidget.dateCreated
                    })
                .then(function (widget, err) {
                    if(err) {
                        deferred.abort(err);
                    } else {
                        deferred.resolve(widget);
                    }
                });}
            else if(newwidget.type == "YOUTUBE"){
            widgetModel
                .update(
                    {
                        _id:widgetId
                    },
                    {
                        name: newwidget.name,
                        type: newwidget.type,
                        text:newwidget.text,
                        url:newwidget.url,
                        width:newwidget.width,
                        dateCreated:newwidget.dateCreated
                    })
                .then(function (widget, err) {
                    if(err) {
                        deferred.abort(err);
                    } else {
                        deferred.resolve(widget);
                    }
                });}
        else if(newwidget.type == "TEXT"){
            widgetModel
                .update(
                    {
                        _id:widgetId
                    },
                    {
                        text: newwidget.text,
                        type: newwidget.type,
                        rows:newwidget.rows,
                        placeholder:newwidget.placeholder,
                        formatted:newwidget.formatted,
                        dateCreated:newwidget.dateCreated
                    })
                .then(function (widget, err) {
                    if(err) {
                        deferred.abort(err);
                    } else {
                        deferred.resolve(widget);
                    }
                });}
         return deferred.promise;
        }


    function findAllWidgetsForPage(pageId) {
        var deferred = q.defer();
        widgetModel
            .find({_page:pageId})
            .then(function (widgets, err) {
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(widgets);
            });
        return deferred.promise;
    }

    function findWidgetById(widgetId) {
        var deferred = q.defer();
        widgetModel
            .findById({_id:widgetId})
            .then(function (widget, err) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(widget);
                }
            });
        return deferred.promise;
    }

    function reorderWidget(start, end ,pageId) {
        var deferred = q.defer();
        widgetModel
            .find({_page:pageId})
            .then(function (widgets, err) {
                if(err) {
                    deferred.abort(err);
                } else {
                    widgets.forEach(function(widgt){
                       var starting = parseInt(start);
                       var ending = parseInt(end);
                        if(starting < ending) {
                            if (widgt.order === starting) {
                                widgt.order = ending;
                                widgt.save();
                            }
                            else if (widgt.order > starting && widgt.order <= ending) {
                                widgt.order--;
                                widgt.save();
                            }
                        }
                        else {
                            if (widgt.order === starting) {
                                widgt.order = ending;
                                widgt.save();
                            }
                            else if (widgt.order < starting && widgt.order >= ending) {
                                widgt.order++;
                                widgt.save();
                            }
                        }
                    });
                    deferred.resolve(widgets);
                }
            });
        return deferred.promise;
    }
};