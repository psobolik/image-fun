# Setup:
```shell
pnpm install
```
# Build:
For local installation, build with `canvas-fun` base.
```shell
pnpm build --base=canvas-fun --outDir=dist/pop-os
```
For installation on tilde.team, build with `/~padeso/canvas-fun` base.
```shell
pnpm build --base=/~padeso/canvas-fun --outDir=dist/tilde.team
```
# Deploy:
## Local
### Install
To install locally, copy the dist folder and its contents to the target folder.
```shell
sudo rcp -r ./dist/pop-os /var/www/html/canvas-fun
```
### Update
To update locally, first delete the files in the assets folder. This isn't strictly necessary, but the new files will
have different names so the old ones will remain in the folder.
```shell
sudo rm /var/www/html/canvas-fun/assets/*
```
Then copy the files in the dist folder to the target folder.
```shell
sudo rcp -r ./dist/pop-os/* /var/www/html/canvas-fun
```
## Tilde.team
### Install
To install on tilde.team the first time, copy the dist folder and its contents to the target folder.
```shell
rcp -r ./dist/tilde.team tilde.team:~/public_html/canvas-fun
```
### Update
To update the files on tilde.team, first delete the files in the assets folder. This isn't strictly necessary, but the
new files will have different names so the old ones will remain in the folder.
```shell
ssh tilde.team "rm ~/public_html/canvas-fun/assets/*"
```
Then copy the files in the dist folder to the target folder.
```shell
rcp -r ./dist/tilde.team/* tilde.team:~/public_html/canvas-fun
```
