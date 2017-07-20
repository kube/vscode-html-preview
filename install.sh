
      #########.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##."

# A little install script to
# remember howto install extension
PATH=./node_modules/.bin/:$PATH

npm install
vsce package
code --uninstall-extension kube.html-preview
code --install-extension html-preview*.vsix
rm html-preview*.vsix
