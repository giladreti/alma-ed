'use strict';

module.exports = function(Form) {
    Form.beforeRemote('create', function(ctx, instance, next) {
        ctx.args.data.ownerId = ctx.req.accessToken.userId;
        next();
    });
    Form.getOwn = function(ctx,cb) {
        Form.find({"where":{"ownerId": ctx.req.accessToken.userId}},(err, forms)=>{
            if(err){
                console.log(err)
                cb(err)
            }
            else{
                cb(null, forms);
            }
        })
      };
      Form.remoteMethod(
        'getOwn', {
        description:"Get user's own created forms",
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
