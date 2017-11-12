#!/bin/sh
# Author: Martin Vassor
# Description: 
# Creation date: 12-11-2017
# Last modified: dim. 12 nov. 2017 07:35:55 CET
# Known bugs: 

gcc prepare_data.c
./a.out > data.gnuplot
gnuplot gnuplot_script
rm data.gnuplot pain_data a.out
mv plot.png pain_evolution.png

