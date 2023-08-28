#!/usr/bin/env bash
for file in $(ls /usr/share/nginx/html/assets/*.js); do
    cat $file | sed "s|THIS_IS_THE_API_URL_WILL_BE_REPACED_HIRE|$API_URL|g" > /tmp/$(basename $file)
    cat /tmp/$(basename $file) > $file
done
exec nginx -g 'daemon off;'