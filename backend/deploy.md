#### vercel.json
{
    "version": 2,
    "builds": [
        {
            "src": "dist/server.js",
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "dist/server.js"
        }
    ]
}



vercel --prod
-
-
-
.....

select env variable 

vercel.com
    -> setting 
        -> environment variables
            -> past all env variable in client_key(if need, change node env development to production)
                -> save 