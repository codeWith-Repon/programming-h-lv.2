### create vercel.json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}


##### project only have one look file 

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