#!/bin/bash

cd /var/www

if [ -e dev/code.tar.gz ] ; then
    rm dev/code.tar.gz
fi

tar pzcf code.tar.gz dev/
mv code.tar.gz /var/www/dev/code.tar.gz

if [ -e qa/code.tar.gz ] ; then
    rm qa/code.tar.gz
fi

tar pzcf code.tar.gz qa/
mv code.tar.gz /var/www/qa/code.tar.gz

if [ -e uat/code.tar.gz ] ; then
    rm uat/code.tar.gz
fi
tar pzcf code.tar.gz uat/
mv code.tar.gz /var/www/uat/code.tar.gz
