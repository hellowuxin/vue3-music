#!/bin/bash
npm run build
ssh -i '/Users/wuxin/wuxin.dms' root@134.175.72.196 rm -rf vue3-music/*
scp -i '/Users/wuxin/wuxin.dms' -r dist/* root@134.175.72.196:/root/vue3-music