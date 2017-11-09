'use strict';

module.exports = function(Response) {
    Response.beforeRemote('create', function(ctx, instance, next) {
        ctx.args.data.submitted = new Date();
        ctx.args.data.ownerId = ctx.req.accessToken.userId;
        next();
    });

    Response.getOwn = function(ctx,cb) {
        Response.find({"where":{"ownerId": ctx.req.accessToken.userId}},(err, responses)=>{
            if(err){
                console.log(err)
                cb(err)
            }
            else{
                cb(null, responses);
            }
        })
      };
      Response.remoteMethod(
        'getOwn', {
        description:"Get user's own submitted forms",
        http: {
            path: '/getOwn',
            verb: 'get'
        },
        accepts: {arg:'ctx',type:'object',http: { source: 'context' }},
        returns: {
            arg: 'data',
            type: 'array'
        }
        }
      );
};
