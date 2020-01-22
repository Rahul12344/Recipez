#!/bin/bash

if [ "$#" -ne 6 ]; then
    echo "USAGE: ./port.sh host username password db collection file"
fi

mongoimport --host $1 --username $2 --password $3 --db $4 --collection $5 --file $6